import React from 'react';
import PropTypes from 'prop-types';
import { Card, Button } from 'antd';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';

const MonitoringDrawerAddCard = ({ isAdding, handleAddMonitoringTask }) => {
  return (
    <Card className='monitoring-drawer-content-add-card'>
      <Button
        shape='round'
        // eslint-disable-next-line sonarjs/no-redundant-boolean
        disabled={true || isAdding} // TODO: Verificar se o MonitoringDrawerAddCard será utilizado
        type='primary-inverse'
        onClick={handleAddMonitoringTask}
        icon={isAdding ? <LoadingOutlined /> : <PlusOutlined />}
      >
        <span>Adicionar Tarefa</span>
      </Button>
    </Card>
  );
};

MonitoringDrawerAddCard.propTypes = {
  isAdding: PropTypes.bool,
  handleAddMonitoringTask: PropTypes.func,
};

MonitoringDrawerAddCard.defaultProps = {
  isAdding: false,
  handleAddMonitoringTask: undefined,
};

export default MonitoringDrawerAddCard;
