import React from 'react';
import {
  ApartmentOutlined,
  CodeOutlined,
  ExperimentOutlined,
  HomeOutlined,
} from '@ant-design/icons';

const itemsMenu = [
  {
    icon: <HomeOutlined />,
    title: 'Início',
    path: '/',
  },
  {
    icon: <CodeOutlined />,
    title: 'Tarefas',
    path: '/tarefas',
  },
  {
    icon: <ExperimentOutlined />,
    title: 'Projetos',
    path: '/projetos',
  },
  {
    icon: <ApartmentOutlined />,
    title: 'Experimentos Implantados',
    path: '/experimentos-implantados',
  },
];

// EXPORT
export default itemsMenu;
