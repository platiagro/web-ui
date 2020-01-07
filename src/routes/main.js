// FIXME: Rotas não estão funcionando como deveriam
/**
 * FIXME: Quando acessamos um projeto e um experimento, e depois voltamos e
 * selecionamos outro projeto, o sistema está tentando acessar o experiment
 * acessado no outro projeto
 */

/**
 * List of the possible routes
 */
import Root from '../pages/Root';
import Components from '../pages/Components';
import Component from '../pages/ComponentDetail';
import Projects from '../pages/Projects';
import Project from '../pages/Project';
import ImplantedFlows from '../pages/ImplantedFlows';
import E404 from '../pages/E404'; // 404 error

const mainRoutes = [
  {
    path: '/',
    exact: true,
    icon: 'home',
    title: 'Início',
    component: Root,
  },
  {
    path: '/components',
    exact: true,
    icon: 'code',
    title: 'Componentes',
    component: Components,
  },
  {
    path: '/components/:componentId',
    notInMenu: true,
    title: 'Componente',
    component: Component,
  },
  {
    path: '/projects',
    exact: true,
    icon: 'experiment',
    title: 'Projetos',
    component: Projects,
  },
  {
    path: '/projects/:projectId/:experimentId?',
    notInMenu: true,
    title: 'Projeto',
    component: Project,
  },
  {
    path: '/implanted-flows',
    icon: 'apartment',
    title: 'Fluxos Implantados',
    component: ImplantedFlows,
  },
  {
    path: '*',
    notInMenu: true,
    component: E404,
  },
];

export default mainRoutes;
