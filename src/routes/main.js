/* istanbul ignore file */
import Root from '../pages/Root';
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
