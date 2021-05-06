import React from 'react';
import { Switch, Route } from 'react-router-dom';

import {
  Deployment,
  JupyterLab,
  Projects,
  ProjectsDetails,
  Experiments,
  Tasks,
  Error404,
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

      <Route path='/tarefas' component={Tasks} />
      <Route path='/jupyterlab/:path*' component={JupyterLab} />
      <Route component={Error404} />
    </Switch>
  );
};
