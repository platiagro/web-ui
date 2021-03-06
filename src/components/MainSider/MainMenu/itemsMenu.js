import React from 'react';
import {
  AppstoreOutlined,
  BuildOutlined,
  ExperimentOutlined,
  ShoppingOutlined,
  SettingOutlined,
  PartitionOutlined,
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
  {
    icon: <SettingOutlined />,
    title: 'Configurações',
    path: '/configuracoes',
  },
];

export default itemsMenu;
