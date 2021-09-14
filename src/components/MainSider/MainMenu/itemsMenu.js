import React from 'react';
import {
  AppstoreOutlined,
  BuildOutlined,
  ExperimentOutlined,
  PartitionOutlined,
  ShoppingOutlined,
} from '@ant-design/icons';

const itemsMenu = [
  {
    icon: <AppstoreOutlined />,
    title: 'Meus projetos',
    path: '/projetos',
    visible: true,
  },
  {
    icon: <BuildOutlined />,
    title: 'Tarefas',
    path: '/tarefas',
    visible: true,
  },
  {
    icon: <PartitionOutlined />,
    title: 'Fluxo de Tarefas',
    path: '/fluxo-tarefas',
    visible: true,
  },
  {
    icon: <ExperimentOutlined />,
    title: 'JupyterLab',
    path: '/jupyterlab',
    visible: true,
  },
  {
    icon: <ShoppingOutlined />,
    title: 'Marketplace',
    path: '/marketplace',
    visible: false,
  },
];

export default itemsMenu;
