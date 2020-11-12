import React from 'react';
import {
  AppstoreOutlined,
  BuildOutlined,
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
