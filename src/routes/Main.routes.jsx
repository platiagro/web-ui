import React from 'react';
import { Switch, Route } from 'react-router-dom';

import {
  Tasks,
  NewTask,
  Error404,
  Projects,
  TasksFlow,
  Deployment,
  JupyterLab,
  Experiments,
  TaskDetails,
  Marketplace,
  ProjectsDetails,
  MarketplaceSearch,
} from 'pages';

export const Main = () => {
  return (
    <Switch>
      <Route path='/' component={Projects} exact />
      <Route path='/projetos' component={Projects} exact />
      <Route path='/projetos/:projectId' component={ProjectsDetails} exact />

      <Route
        path='/projetos/:projectId/experimentos/:experimentId?'
        component={Experiments}
      />

      <Route
        path='/projetos/:projectId/pre-implantacao/:deploymentId?'
        component={Deployment}
      />

      <Route
        path='/pesquisar-marketplace'
        component={MarketplaceSearch}
        exact
      />

      <Route path='/marketplace' component={Marketplace} exact />

      <Route path='/tarefas' component={Tasks} exact />
      <Route path='/fluxo-tarefas' component={TasksFlow} exact />
      <Route path='/nova-tarefa' component={NewTask} />
      <Route path='/tarefas/:taskId' component={TaskDetails} />
      <Route path='/jupyterlab/:path*' component={JupyterLab} />

      <Route component={Error404} />
    </Switch>
  );
};
