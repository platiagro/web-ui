import './style.scss';
import React from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Layout } from 'antd';
import ExperimentsTabs from '../../ExperimentsTabs';
import LeftSideMenu from '../LeftSideMenu';
import ContentHeader from '../../ContentHeader';
import EditableTitle from '../../EditableTitle';
import { updateProjectName } from '../../../store/actions/projectActions';

const { Content } = Layout;

/**
 *    {
 *      name: 'Auto Featuring Com Auto Machine Learning',
 *      databaseName: 'AutoFeaturing + AutoML',
 *      pipelineTrainId: null,
 *      pipelineDeployId: null,
 *      disabled: false,
 *      default: true,
 *    },
 */
const ExperimentContainer = (props) => {
  const { details, fetch, flowDetail, onUpdateProjectName } = props;
  const history = useHistory();
  const handleClick = () => {
    history.push('/projects');
  };

  return (
    <>
      <ContentHeader
        title={
          <EditableTitle details={details} onUpdate={onUpdateProjectName} />
        }
        subTitle={details.uuid}
        onBack={handleClick}
      />
      <Layout className='experiment-container'>
        <LeftSideMenu />
        <Content className='experiment-wraper'>
          <ExperimentsTabs
            fetch={fetch}
            details={details}
            flowDetails={flowDetail}
          />
        </Content>
      </Layout>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    details: state.project.details,
    flowDetail: state.project.flowDetail,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onUpdateProjectName: (editableDetails, name, resultCallback) => {
      dispatch(updateProjectName(editableDetails, name, resultCallback));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ExperimentContainer);
