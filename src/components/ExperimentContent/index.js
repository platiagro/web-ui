/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import PropTypes from 'prop-types';
import './style.scss';
import { Button, Divider, Tooltip, Input, Icon, message } from 'antd';
import AutosizeInput from 'react-input-autosize';
import ExperimentFlow from '../ExperimentFlow';
import * as projectsServices from '../../services/projectsApi';
// const { Content } = Layout;
const EditableTitle = (props) => {
  const {
    details: { uuid, name, projectId },
    fetch,
  } = props;
  // const { value } = props;
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(false);
  const [newVal, setNewVal] = useState(name);

  const handleChange = (e) => {
    setNewVal(e.currentTarget.value);
  };

  const handleSubmit = async (e) => {
    console.log(e.currentTarget.value.trim(), name, uuid, projectId);
    setLoading(true);
    if (!!e.currentTarget.value && e.currentTarget.value !== name) {
      const response = await projectsServices.updateExperiment(
        projectId,
        uuid,
        e.currentTarget.value
      );
      if (!!response) {
        fetch();
      }
    } else {
      console.log('NÃO MUDOU');
      setNewVal(name);
    }

    setEditMode(false);
    setLoading(false);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.currentTarget.blur();
      // handleSubmit(e);
    }
  };

  return (
    <div>
      <AutosizeInput
        onBlur={handleSubmit}
        onClick={() => {
          setEditMode(true);
        }}
        onKeyPress={handleKeyPress}
        onChange={handleChange}
        className={
          editMode
            ? 'experiment-title autosize-input-custom'
            : 'experiment-title autosize-input-custom edit-mode'
        }
        value={newVal}
        readOnly={!editMode}
        disabled={loading}
      />
      {loading && <Icon type='loading' />}
    </div>
  );
};

const ExperimentContent = (props) => {
  const { details, fetch } = props;
  const url = '.../modelo_workshop.foragri.com/api/';
  const info = () => {
    message.info('URL Copiada', 1);
  };

  return (
    <div className='experiment-content'>
      <div className='experiment-content-header'>
        <EditableTitle fetch={fetch} details={details} />

        <div style={{ display: 'none' }} className='experiment-deployed'>
          <Input className='experiment-url' value={url} />
          <CopyToClipboard onCopy={info} text={url}>
            <Button type='primary'>Copiar URL</Button>
          </CopyToClipboard>
          <Tooltip placement='bottomLeft' title='Download do modelo'>
            <Button type='primary' icon='download' />
          </Tooltip>
        </div>
        <div className='experiment-actions'>
          <Button icon='play-circle' type='primary'>
            Executar
          </Button>
          <Divider type='vertical' />
          <Button icon='tool' type='primary'>
            Implantar
          </Button>
        </div>
      </div>
      <ExperimentFlow />
    </div>
  );
};

ExperimentContent.propTypes = {
  details: PropTypes.shape({
    title: PropTypes.string,
  }).isRequired,
};

EditableTitle.propTypes = {
  value: PropTypes.string.isRequired,
};

export default ExperimentContent;
