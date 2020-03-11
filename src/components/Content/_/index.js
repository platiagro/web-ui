// CORE LIBS
import React from 'react';
import PropTypes from 'prop-types';

// UI LIBS
import { Layout } from 'antd';

// CONTENTS
import ProjectsContent from '../ProjectsContent/_';
import ProjectContent from '../ProjectContent/_';
import TaskContent from '../TasksContent/_';
import ImplantedExperimentsContent from '../ImplantedExperimentsContent/_';
import HomeContent from '../HomeContent';
import Error404Content from '../Error404Content';

// STYLES
import './style.scss';

// MOCKS
import projectsMock from '../ProjectsContent/_/_projectsMock';
import tasksMock from '../TasksContent/_/_tasksMock';
import implantedExperimentsMock from '../ImplantedExperimentsContent/_/_implantedExperimentsMock';

/**
 * Content.
 * This component is responsible for displaying the content.
 */
const Content = () => {
  // RENDER
  return (
    // layout component
    <Layout>
      {/* projects content */}
      <ProjectsContent projects={projectsMock} />
      {/* project content */}
      {/* <ProjectContent /> */}
      {/* task content */}
      {/* <TaskContent tasks={tasksMock} /> */}
      {/* implanted experiments content */}
      {/* <ImplantedExperimentsContent
        implantedExperiments={implantedExperimentsMock}
      /> */}
      {/* home content */}
      {/* <HomeContent /> */}
      {/* error 404 content */}
      {/* <Error404Content /> */}
    </Layout>
  );
};

// EXPORT
export default Content;
