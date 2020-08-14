// CORE LIBS
import React from 'react';
import { useParams } from 'react-router-dom';
import { connect } from 'react-redux';

// COMPONENTS
import ContentHeaderProjectContainer from '../../ContentHeader/ContentHeaderProjectContainer';
import ComponentsMenuBlock from '../ComponentsMenuBlock/_/Container';
import ExperimentsTabs from '../ExperimentsTabs/_/Container';
import NewExperimentButton from '../NewExperimentButton/Container';
import NewExperimentModal from '../NewExperimentModal/Container';
import ExperimentEmpty from '../Experiment/ExperimentEmpty';
import ExperimentHeader from '../Experiment/ExperimentHeader/_/Container';
import ExperimentFlow from '../Experiment/ExperimentFlow/_/Container';
import {
  OperatorResizableSectionContainer,
  OperatorResultsModalContainer,
} from 'containers';

import { ProjectEmptyPlaceholder } from 'components/Placeholders';
import { Layout } from 'antd';
import './style.scss';

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

  const FlowContent = (
    <Layout style={{ overflow: 'hidden' }}>
      <Sider width={250}>
        <ComponentsMenuBlock disabled={!experimentId} />
      </Sider>
      <Content>
        <Layout style={{ height: '100%' }}>
          <Content style={{ display: 'flex' }}>
            <div className='custom-flow'>
              <ExperimentHeader />
              {experimentId ? <ExperimentFlow /> : <ExperimentEmpty />}
            </div>
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
      {/* operator results modal */}
      <OperatorResultsModalContainer />
      {/* Header from project (name and rename) */}
      <ContentHeaderProjectContainer />
      {experiments && experiments.length > 0 ? (
        FlowContent
      ) : (
        <ProjectEmptyPlaceholder />
      )}
    </>
  );
};

// EXPORT
export default connect(mapStateToProps, null)(ProjectContent);
