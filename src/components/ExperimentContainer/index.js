import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router';
import './style.scss';
import { Layout, Input, Icon } from 'antd';
import ExperimentsTabs from '../ExperimentsTabs';
import LeftSideMenu from '../LeftSideMenu';
import ContentHeader from '../ContentHeader';
import * as services from '../../services/api';

const { Content } = Layout;

const updateName = async () => {
  this.setState({ loading: true });
  const { match } = this.props;
  const auxDetails = { name: null, uuid: null, experimentList: [] };
  const project = await services.getProject(match.params.projectId);
  const experiments = await services.getExperimentList(match.params.projectId);

  if (!!project) auxDetails.name = project.data.payload.name;
  if (!!project) auxDetails.uuid = project.data.payload.uuid;
  if (!!experiments) auxDetails.experimentList = experiments.data.payload;

  console.log(auxDetails);

  this.setState({ details: auxDetails, loading: false });
};

const EditableTitle = (props) => {
  const { name, uuid } = props.details;
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(false);
  const [newVal, setNewVal] = useState(name);

  let handleChange = (e) => {
    setNewVal(e.currentTarget.value);
  };

  let handleSubmit = async (e) => {
    if (!!e.currentTarget.value && e.currentTarget.value !== name) {
      const response = await services.updateProject(
        uuid,
        e.currentTarget.value
      );
      if (!!response) {
        console.log(response);
      } else {
      }
    } else {
      console.log('NÃO MUDOU');
      setNewVal(name);
    }

    setEditMode(false);
  };

  return (
    <Input
      onBlur={handleSubmit}
      onDoubleClick={() => {
        setEditMode(true);
      }}
      onPressEnter={handleSubmit}
      onChange={handleChange}
      className={
        editMode
          ? 'ant-page-header-heading-title project-title'
          : 'ant-page-header-heading-title project-title edit-mode'
      }
      value={newVal}
      readOnly={!editMode}
    />
  );
};

const ExperimentContainer = (props) => {
  const { details } = props;
  const history = useHistory();
  function handleClick() {
    history.push('/projects');
  }

  return (
    <>
      <ContentHeader
        title={<EditableTitle details={details} />}
        subTitle={details.uuid}
        onBack={handleClick}
      />
      {/* <div style={{ margin: '40px' }}> */}
      <Layout className='experiment-container'>
        {/* <Layout className='experiment-content'> */}
        <LeftSideMenu />
        <Content className='experiment-wraper'>
          <ExperimentsTabs details={details} />
        </Content>
        {/* </Layout> */}
      </Layout>
      {/* </div> */}
    </>
  );
};

ExperimentContainer.propTypes = {
  experimentsList: PropTypes.array.isRequired,
  projectName: PropTypes.string.isRequired,
};

export default ExperimentContainer;
