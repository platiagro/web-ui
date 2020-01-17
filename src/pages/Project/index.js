/**
 * Component responsible for:
 * - Structuring the project detail layout
 * - Fetch project details with the experiments created
 */
import './style.scss';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Layout, Spin } from 'antd';
import E404 from '../E404';
import ContentHeader from '../../components/Content/ContentHeader';
import EditableTitle from '../../components/EditableTitle';
import ExperimentsTabs from '../../components/ExperimentsTabs';
import LeftSideMenu from '../../components/Project/LeftSideMenu';
import {
  getProject,
  resetProject,
  updateProjectName,
} from '../../store/actions/projectActions';

const { Content } = Layout;

const Project = (props) => {
  const { uuid, name, loading, match } = props;
  const { onGetProject, onResetProject, onUpdateProjectName } = props;
  const history = useHistory();

  // Handle click on back button
  const handleClick = () => {
    history.push('/projects');
  };

  // Fetch details on component did mount
  useEffect(() => {
    onGetProject(match.params.projectId);
    return () => {
      onResetProject();
    };
  }, []);

  // Funtion to get the error page
  const getErrorPage = () => {
    return loading ? <Spin /> : <E404 />;
  };

  return uuid ? (
    <>
      <ContentHeader
        title={
          <EditableTitle
            details={{ uuid, name }}
            onUpdate={onUpdateProjectName}
          />
        }
        subTitle={uuid}
        onBack={handleClick}
      />
      <Layout className='experiment-container'>
        <LeftSideMenu />
        <Content className='experiment-wraper'>
          <ExperimentsTabs />
        </Content>
      </Layout>
    </>
  ) : (
    getErrorPage()
  );
};

const mapStateToProps = (state) => {
  return {
    ...state.project,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onGetProject: (id) => {
      dispatch(getProject(id));
    },
    onResetProject: () => {
      dispatch(resetProject());
    },
    onUpdateProjectName: (editableDetails, name) => {
      return dispatch(updateProjectName(editableDetails, name));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Project);
