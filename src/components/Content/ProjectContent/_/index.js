// CORE LIBS
import React from 'react';
import { useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

// COMPONENTS
import ContentHeaderProjectContainer from '../../ContentHeader/_/ContentHeaderProjectContainer';
import TasksMenuBlock from '../TasksMenuBlock/_/Container';
import ExperimentsTabs from '../ExperimentsTabs/_/Container';
import NewExperimentButton from '../NewExperimentButton/Container';
import NewExperimentModal from '../NewExperimentModal/Container';

import {
  OperatorResizableSectionContainer,
  OperatorResultsModalContainer,
  DataViewModalContainer,
} from 'containers';

import FlowDrop from './FlowDrop';

import { Layout } from 'antd';
import './style.less';

const { Footer, Sider, Content } = Layout;

// STATES
const mapStateToProps = (state) => {
  return {
    experiments: state.projectReducer.experiments,
  };
};

/**
 * Project Content.
 * This component is responsible for displaying the project content.
 *
 * @param props
 */
const ProjectContent = (props) => {
  // destructuring props
  const { experiments } = props;
  // CONSTANTS
  const { experimentId } = useParams();

  const renderFlowContent = () => (
    <Layout style={{ overflow: 'hidden' }}>
      <Sider width={250}>
        <TasksMenuBlock disabled={!experimentId} />
      </Sider>
      <Content>
        <Layout style={{ height: '100%' }}>
          <Content style={{ display: 'flex' }}>
            <FlowDrop />
            <OperatorResizableSectionContainer />
          </Content>
          <Footer style={{ padding: 0 }}>
            <div className='custom-experiment-tabs'>
              <ExperimentsTabs />
              <NewExperimentButton />
              <NewExperimentModal />
            </div>
          </Footer>
        </Layout>
      </Content>
    </Layout>
  );

  // RENDER
  return (
    <>
      <DndProvider backend={HTML5Backend}>
        {/* data view modal container */}
        <DataViewModalContainer />
        {/* operator results modal */}
        <OperatorResultsModalContainer />
        {/* Header from project (name and rename) */}
        <ContentHeaderProjectContainer />
        {renderFlowContent()}
      </DndProvider>
    </>
  );
};

// EXPORT
export default connect(mapStateToProps, null)(ProjectContent);
