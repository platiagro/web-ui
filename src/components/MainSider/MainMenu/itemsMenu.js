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
  },
  {
    icon: <BuildOutlined />,
    title: 'Tarefas',
    path: '/tarefas',
  },
  {
    icon: <PartitionOutlined />,
    title: 'Fluxo de Tarefas',
    path: '/fluxo-tarefas',
  },
  {
    icon: <ExperimentOutlined />,
    title: 'JupyterLab',
    path: '/jupyterlab',
  },
  {
    icon: <ShoppingOutlined />,
    title: 'Marketplace',
    path: '/marketplace',
  },
];

export default itemsMenu;
