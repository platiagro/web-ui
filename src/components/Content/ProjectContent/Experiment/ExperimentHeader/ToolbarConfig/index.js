// CORE LIBS
import React from 'react';
import PropTypes from 'prop-types';

// ANTD LIBS
import {
  RedoOutlined,
  UndoOutlined,
  DeleteOutlined,
  ZoomInOutlined,
  ZoomOutOutlined,
} from '@ant-design/icons';

import { Button, Popconfirm } from 'antd';

const ToolbarConfig = ({ handleDeleteClick, operator }) => {
  return (
    <>
      <Button icon={<UndoOutlined />} type='text' disabled />
      <Button icon={<RedoOutlined />} type='text' disabled />
      <Button icon={<ZoomInOutlined />} type='text' disabled />
      <Button icon={<ZoomOutOutlined />} type='text' disabled />
      <Popconfirm
        title='Você tem certeza que deseja excluir esta tarefa?'
        onConfirm={handleDeleteClick}
        okText='Sim'
        cancelText='Não'
        disabled={!operator?.uuid}
      >
        <Button
          icon={<DeleteOutlined />}
          type='text'
          disabled={!operator?.uuid}
        />
      </Popconfirm>
    </>
  );
};

// PROP TYPES
ToolbarConfig.propTypes = {
  /** remove operator button is disabled */
  disabled: PropTypes.bool.isRequired,
  /** remove operator button click function */
  handleClick: PropTypes.func.isRequired,
  /** is loading */
  loading: PropTypes.bool.isRequired,
};

// EXPORT
export default ToolbarConfig;
