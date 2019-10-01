/* istanbul ignore file */
import React from 'react';

import { Redirect } from 'react-router-dom';

import Projects from '../pages/Projects';
import E404 from '../pages/E404'; // 404 error

const mainRoutes = [
  {
    path: '/',
    exact: true,
    icon: 'home',
    title: 'Início',
    subTitle: 'Esse é o subtítulo da página de ínicio (ALTERAR)',
    component: () => <Redirect to='/projects' />,
  },
  {
    path: '/projects',
    icon: 'experiment',
    title: 'Projetos',
    subTitle: 'Crie, experimente e implante modelos de forma rápida e fácil.',
    component: Projects,
  },
  {
    path: '/implanted-models',
    icon: 'apartment',
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
