import React from 'react';
import {
  AppstoreOutlined,
  BuildOutlined,
  DeploymentUnitOutlined,
  SettingOutlined,
  ShoppingOutlined,
} from '@ant-design/icons';

const itemsMenu = [
  {
    icon: <AppstoreOutlined />,
    title: 'Meus projetos',
    path: '/projetos',
  },
  {
    icon: <DeploymentUnitOutlined />,
    title: 'Fluxos implantados',
    path: '/fluxos-implantados',
  },
  {
    icon: <BuildOutlined />,
    title: 'Tarefas',
    path: '/tarefas',
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

// EXPORT
export default itemsMenu;
