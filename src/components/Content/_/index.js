// CORE LIBS
import React from 'react';
import { Switch, Route } from 'react-router-dom';

// UI LIBS
import { Layout } from 'antd';

// CONTENTS
import Error404Content from '../Error404Content';
import ExperimentsContent from '../ExperimentsContent/_';
import ProjectsContent from '../ProjectsContent/_';
import ProjectsDetailsContent from '../ProjectDetailsContent/_';
import TaskContent from '../TasksContent/_';

// STYLES
import './style.less';

/**
 * Content.
 * This component is responsible for displaying the content.
 */
const Content = () => {
  // RENDER
  return (
    // layout component
    <Layout>
      <Switch>
        {/* projects content */}
        <Route exact path='/'>
          <ProjectsContent />
        </Route>
        {/* projects content */}
        <Route exact path='/projetos'>
          <ProjectsContent />
        </Route>
        {/* project content */}
        <Route exact strict path='/projetos/:projectId'>
          <ProjectsDetailsContent />
        </Route>
        {/* experiment content */}
        <Route exact path='/projetos/:projectId/experimentos/:experimentId?'>
          <ExperimentsContent />
        </Route>
        <Route exact path='/projetos/:projectId/pre-implantacao/:deploymentId?'>
          <span>Pré-implantação placeholder</span>
        </Route>
        {/* task content */}
        <Route exact path='/tarefas'>
          <TaskContent />
        </Route>
        {/* error 404 content */}
        <Route path='*'>
          <Error404Content />
        </Route>
      </Switch>
    </Layout>
  );
};

// EXPORT
export default Content;
