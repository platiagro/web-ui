/* eslint-disable react/prop-types */
import React from 'react';
import { Icon, Tooltip } from 'antd';

export default function CardTask({
  icon = 'control',
  iconTheme = 'filled',
  title,
  pos = [0, 0],
  selected,
  taskClick,
  task,
  params,
  condition,
}) {
  const getIcon = () => {
    switch (condition) {
      case 'Running':
        return (
          <Tooltip placement='right' title='Tarefa sendo executada'>
            <Icon
              style={{ fontSize: '18px', color: '#666666' }}
              type='setting'
              spin
            />
          </Tooltip>
        );
      case 'wait':
        return (
          <Tooltip placement='right' title='Tarefa aguardando execução'>
            <Icon
              style={{ fontSize: '18px', color: '#666666' }}
              type='clock-circle'
              theme='filled'
            />
          </Tooltip>
        );
      case 'Succeeded':
        return (
          <Tooltip placement='right' title='Tarefa executada com sucesso'>
            <Icon
              style={{ fontSize: '18px', color: '#389E0D' }}
              theme='filled'
              type='check-circle'
            />
          </Tooltip>
        );
      case 'Failed':
        return (
          <Tooltip placement='right' title='Tarefa executada com falha'>
            <Icon
              style={{ fontSize: '18px', color: '#CF1322' }}
              theme='filled'
              type='exclamation-circle'
            />
          </Tooltip>
        );
      default:
        return null;
    }
  };

  return (
    <div
      style={{ left: pos[0], top: pos[1] }}
      className={`card ${params ? ' setted-up ' : ''}${condition}${
        selected ? ' selected' : ''
      }`}
      onClick={(e) => {
        e.stopPropagation();
        taskClick(task);
      }}
      role='presentation'
    >
      <div className='title-icon'>
        <Icon style={{ fontSize: '18px' }} theme={iconTheme} type={icon} />
        <span>{title}</span>
      </div>
      {getIcon()}
    </div>
  );
}
