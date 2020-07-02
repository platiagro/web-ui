// CORE LIBS
import React from 'react';
import { Switch, Route } from 'react-router-dom';

// UI LIBS
import { Layout } from 'antd';

// CONTENTS
import ProjectsContent from '../ProjectsContent/_';
import ProjectContent from '../ProjectContent/_';
import TaskContent from '../TasksContent/_';
import ImplantedExperimentsContent from '../ImplantedExperimentsContent/_';
import HomeContent from '../HomeContent/Container';
import Error404Content from '../Error404Content';

// STYLES
import './style.scss';

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
        {/* home content */}
        <Route exact path='/'>
          <HomeContent />
        </Route>
        {/* task content */}
        <Route exact path='/tarefas'>
          <TaskContent />
        </Route>
        {/* projects content */}
        <Route exact path='/projetos'>
          <ProjectsContent />
        </Route>
        {/* project content */}
        <Route exact path='/projetos/:projectId'>
          <ProjectContent />
        </Route>
        {/* experiment content */}
        <Route exact path='/projetos/:projectId/:experimentId'>
          <ProjectContent />
        </Route>
        {/* implanted experiments content */}
        <Route exact path='/experimentos-implantados'>
          <ImplantedExperimentsContent />
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
