import React, { useState } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import PropTypes from 'prop-types';
import './style.scss';
import { Button, Divider, Tooltip, Input, message } from 'antd';
import ExperimentFlow from '../ExperimentFlow';

// const { Content } = Layout;
const EditableTitle = (props) => {
  const { value } = props;
  const [editMode, setEditMode] = useState(false);
  return (
    <Input
      onBlur={() => {
        setEditMode(false);
      }}
      onDoubleClick={() => {
        setEditMode(true);
      }}
      className={editMode ? 'experiment-title' : 'experiment-title edit-mode'}
      value={value}
      readOnly={!editMode}
    />
  );
};

const ExperimentContent = (props) => {
  const { details } = props;
  const url = '.../modelo_workshop.foragri.com/api/';
  const info = () => {
    message.info('URL Copiada', 1);
  };
  return (
    <div className='experiment-content'>
      <div className='experiment-content-header'>
        <EditableTitle value={details.title} />

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
