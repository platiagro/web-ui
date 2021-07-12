import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { Input, Radio } from 'antd';
import { isEqual } from 'lodash';

import { DockerIconComponent } from 'assets';

const FIELD_IDS = {
  IMAGE_URL: 'IMAGE_URL',
  COMMANDS: 'COMMANDS',
  ARGUMENTS: 'ARGUMENTS',
};

const FIELD_ID_TO_FIELD_NAME = {
  IMAGE_URL: 'image',
  COMMANDS: 'commands',
  ARGUMENTS: 'arguments',
};

const URLS = {
  ENTRYPOINT: 'https://docs.docker.com/engine/reference/builder/#entrypoint',
  CMD: 'https://docs.docker.com/engine/reference/builder/#cmd',
};

const INPUT_TYPES = {
  SHELL: 'SHELL',
  EXEC: 'EXEC',
};

const TaskDetailsDocker = ({ taskData, handleUpdateTaskData }) => {
  const isFirstRender = useRef(true);

  const [commandsInputType, setCommandsInputType] = useState(INPUT_TYPES.SHELL);
  const [argsInputType, setArgsInputType] = useState(INPUT_TYPES.SHELL);

  const [imageUrl, setImageUrl] = useState('');
  const [commands, setCommands] = useState('');
  const [args, setArgs] = useState('');

  const getNewValueByFieldId = (fieldId) => {
    switch (fieldId) {
      case FIELD_IDS.IMAGE_URL:
        return imageUrl.trim();

      case FIELD_IDS.COMMANDS:
        return commands.trim();

      case FIELD_IDS.ARGUMENTS:
        return args.trim();

      default:
        return undefined;
    }
  };

  const getOldValueByFieldId = (fieldId) => {
    switch (fieldId) {
      case FIELD_IDS.IMAGE_URL:
        return taskData.image;

      case FIELD_IDS.COMMANDS:
        return commandsInputType === INPUT_TYPES.SHELL
          ? transformExecIntoShell(taskData.commands || [], false)
          : JSON.stringify(taskData.commands);

      case FIELD_IDS.ARGUMENTS:
        return argsInputType === INPUT_TYPES.SHELL
          ? transformExecIntoShell(taskData.arguments || [], false)
          : JSON.stringify(taskData.arguments);

      default:
        return undefined;
    }
  };

  const handleFormatValueToSave = (fieldId, value) => {
    switch (fieldId) {
      case FIELD_IDS.COMMANDS: {
        if (commandsInputType === INPUT_TYPES.SHELL) {
          return JSON.parse(transformShellIntoExec(value));
        }
        return JSON.parse(value);
      }

      case FIELD_IDS.ARGUMENTS: {
        if (argsInputType === INPUT_TYPES.SHELL) {
          return JSON.parse(transformShellIntoExec(value));
        }
        return JSON.parse(value);
      }

      default:
        return value;
    }
  };

  const handleSaveDataWhenLooseFocus = (fieldId) => () => {
    const newValue = getNewValueByFieldId(fieldId);
    const oldValue = getOldValueByFieldId(fieldId);
    const isOldValueEqualsNewValue = isEqual(newValue, oldValue);

    if (isOldValueEqualsNewValue) return;
    const fieldName = FIELD_ID_TO_FIELD_NAME[fieldId];
    const formattedNewValue = handleFormatValueToSave(fieldId, newValue);
    handleUpdateTaskData(fieldName, formattedNewValue);
  };

  const transformShellIntoExec = (shellText) => {
    if (!shellText) return '';

    const numberOfSingleQuotes = shellText.split("'").length - 1;
    const numberOfDoubleQuotes = shellText.split('"').length - 1;
    // Return default split if number of single or double quotes is odd
    if (numberOfSingleQuotes % 2 !== 0 || numberOfDoubleQuotes % 2 !== 0) {
      const shellTextParts = shellText.split(' ');
      return JSON.stringify(shellTextParts);
    }

    let shellTextClone = `${shellText}`;

    // Get substrings inside single or double quotes
    const textsWithQuotes = shellTextClone.match(
      /"(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*'/g
    );

    if (textsWithQuotes) {
      // Replace text inside quotes to preserve its white spaces
      textsWithQuotes.forEach((text, index) => {
        shellTextClone = shellTextClone.replace(text, `@@_@@${index}`);
      });
    }

    // Split in white spaces
    const shellTextParts = shellTextClone.split(' ');

    if (textsWithQuotes) {
      // Put texts with quotes in the array again
      textsWithQuotes.forEach((textWithQuotes, index) => {
        const indexToReplace = shellTextParts.indexOf(`@@_@@${index}`);
        shellTextParts[indexToReplace] = textWithQuotes;
      });
    }

    return JSON.stringify(shellTextParts);
  };

  const transformExecIntoShell = (exec, isInJSONFormat = true) => {
    if (!exec || (Array.isArray(exec) && exec.length === 0)) return '';
    const execArray = isInJSONFormat ? JSON.parse(exec) : exec;
    return execArray.join(' ');
  };

  const handleChangeCommandsInputType = (e) => {
    setCommandsInputType(e.target.value);
    setCommands(
      e.target.value === INPUT_TYPES.SHELL
        ? transformExecIntoShell(commands)
        : transformShellIntoExec(commands)
    );
  };

  const handleChangeArgumentsInputType = (e) => {
    setArgsInputType(e.target.value);
    setArgs(
      e.target.value === INPUT_TYPES.SHELL
        ? transformExecIntoShell(args)
        : transformShellIntoExec(args)
    );
  };

  useEffect(() => {
    if (taskData && isFirstRender.current) {
      isFirstRender.current = false;
      setImageUrl(taskData.image || '');
      setCommands(transformExecIntoShell(taskData.commands || [], false));
      setArgs(transformExecIntoShell(taskData.arguments || [], false));
    }
  }, [taskData]);

  return (
    <div className='task-details-page-content-info-docker'>
      <div className='task-details-page-content-info-docker-form'>
        <div className='task-details-page-content-info-docker-form-icon'>
          <DockerIconComponent />
        </div>

        <div className='task-details-page-content-info-docker-field'>
          <label
            className='task-details-page-content-info-docker-field-label'
            htmlFor={FIELD_IDS.IMAGE_URL}
          >
            <span>Imagem</span>
            <span className='optional-label'>(Opcional)</span>
          </label>

          <Input
            className='task-details-page-content-info-docker-field-input'
            type='text'
            size='middle'
            value={imageUrl}
            id={FIELD_IDS.IMAGE_URL}
            onChange={(e) => setImageUrl(e.target.value)}
            onBlur={handleSaveDataWhenLooseFocus(FIELD_IDS.IMAGE_URL)}
            placeholder='Adicionar Imagem'
          />
        </div>

        <Radio.Group
          className='task-details-page-content-info-docker-radio-group'
          name='CommandsInputTypes'
          value={commandsInputType}
          onChange={handleChangeCommandsInputType}
        >
          <Radio value={INPUT_TYPES.SHELL}>Formato Shell</Radio>
          <Radio value={INPUT_TYPES.EXEC}>Formato Exec</Radio>
        </Radio.Group>

        <div className='task-details-page-content-info-docker-field'>
          <label
            className='task-details-page-content-info-docker-field-label'
            htmlFor={FIELD_IDS.COMMANDS}
          >
            <span>Comandos</span>
            <span className='optional-label'>(Opcional)</span>
          </label>

          <Input
            className='task-details-page-content-info-docker-field-input'
            type='text'
            size='middle'
            value={commands}
            id={FIELD_IDS.COMMANDS}
            onChange={(e) => setCommands(e.target.value)}
            onBlur={handleSaveDataWhenLooseFocus(FIELD_IDS.COMMANDS)}
            placeholder='Adicionar Comandos'
          />
        </div>

        <Radio.Group
          className='task-details-page-content-info-docker-radio-group'
          name='ArgumentsInputTypes'
          value={argsInputType}
          onChange={handleChangeArgumentsInputType}
        >
          <Radio value={INPUT_TYPES.SHELL}>Formato Shell</Radio>
          <Radio value={INPUT_TYPES.EXEC}>Formato Exec</Radio>
        </Radio.Group>

        <div className='task-details-page-content-info-docker-field'>
          <label
            className='task-details-page-content-info-docker-field-label'
            htmlFor={FIELD_IDS.ARGUMENTS}
          >
            <span>Argumentos</span>
            <span className='optional-label'>(Opcional)</span>
          </label>

          <Input
            className='task-details-page-content-info-docker-field-input'
            type='text'
            size='middle'
            value={args}
            id={FIELD_IDS.ARGUMENTS}
            onChange={(e) => setArgs(e.target.value)}
            onBlur={handleSaveDataWhenLooseFocus(FIELD_IDS.ARGUMENTS)}
            placeholder='Adicionar Argumentos'
          />
        </div>
      </div>

      <div className='task-details-page-content-info-docker-explanation'>
        <span>Os comandos estão associados à instrução </span>
        <a
          href={URLS.ENTRYPOINT}
          target='_blank'
          rel='noreferrer'
          referrerPolicy='no-referrer'
        >
          ENTRYPOINT
        </a>
        <span> e os argumentos à instrução </span>
        <a
          href={URLS.CMD}
          target='_blank'
          rel='noreferrer'
          referrerPolicy='no-referrer'
        >
          CMD
        </a>
        <span> do Docker.</span>
      </div>
    </div>
  );
};

TaskDetailsDocker.propTypes = {
  taskData: PropTypes.object.isRequired,
  handleUpdateTaskData: PropTypes.func.isRequired,
};

export default TaskDetailsDocker;
