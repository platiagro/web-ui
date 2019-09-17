import React from 'react';

import { Redirect } from 'react-router-dom';

import Projects from '../pages/Projects';
import E404 from '../pages/E404'; // erro 404

const mainRoutes = [
  {
    path: '/',
    exact: true,
    title: 'Início',
    subTitle: 'Esse é o subtítulo da página de ínicio (ALTERAR)',
    component: () => <Redirect to='/projects' />,
  },
  {
    path: '/projects',
    title: 'Projetos',
    subTitle: 'Crie, experimente e implante modelos de forma rápida e fácil.',
    component: Projects,
  },
  {
    path: '/implanted-models',
    title: 'Modelos Implantados',
    subTitle: 'Esse é o subtítulo da página de modelos implantados (ALTERAR)',
    component: E404,
  },
  {
    path: '*',
    notInMenu: true,
    title: 'Erro 404',
    subTitle: 'Não foi possível localizar a página.',
    component: E404,
  },
];

export default mainRoutes;
