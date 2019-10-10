import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router';
import './style.scss';
import { Layout, Icon } from 'antd';
import AutosizeInput from 'react-input-autosize';
import ExperimentsTabs from '../ExperimentsTabs';
import LeftSideMenu from '../LeftSideMenu';
import ContentHeader from '../ContentHeader';
import * as projectsServices from '../../services/projectsApi';

const { Content } = Layout;

const EditableTitle = (props) => {
  const {
    details: { name, uuid },
    fetch,
  } = props;
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(false);
  const [newVal, setNewVal] = useState(name);

  const handleChange = (e) => {
    setNewVal(e.currentTarget.value);
  };

  const handleSubmit = async (e) => {
    setLoading(true);
    if (!!e.currentTarget.value.trim() && e.currentTarget.value !== name) {
      const response = await projectsServices.updateProject(
        uuid,
        e.currentTarget.value
      );
      if (response) {
        fetch();
      }
    } else {
      console.log('NÃO MUDOU');
      setNewVal(name);
    }

    setEditMode(false);
    setLoading(false);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.currentTarget.blur();
      // handleSubmit(e);
    }
  };

  return (
    // <Input
    //   onBlur={handleSubmit}
    //   onDoubleClick={() => {
    //     setEditMode(true);
    //   }}
    //   onPressEnter={handleSubmit}
    //   onChange={handleChange}
    //   className={
    //     editMode
    //       ? 'ant-page-header-heading-title project-title'
    //       : 'ant-page-header-heading-title project-title edit-mode'
    //   }
    //   value={newVal}
    //   readOnly={!editMode}
    // />
    <>
      <AutosizeInput
        onBlur={handleSubmit}
        onClick={() => {
          setEditMode(true);
        }}
        onKeyPress={handleKeyPress}
        onChange={handleChange}
        className={
          editMode
            ? 'ant-page-header-heading-title autosize-input-custom'
            : 'ant-page-header-heading-title autosize-input-custom edit-mode'
        }
        value={newVal}
        readOnly={!editMode}
        disabled={loading}
      />
      {loading && <Icon type='loading' />}
    </>
  );
};

const ExperimentContainer = (props) => {
  const { details, fetch, params } = props;
  const history = useHistory();
  function handleClick() {
    history.push('/projects');
  }

  return (
    <>
      <ContentHeader
        title={<EditableTitle fetch={fetch} details={details} />}
        subTitle={details.uuid}
        onBack={handleClick}
      />
      {/* <div style={{ margin: '40px' }}> */}
      <Layout className='experiment-container'>
        {/* <Layout className='experiment-content'> */}
        <LeftSideMenu />
        <Content className='experiment-wraper'>
          <ExperimentsTabs
            params={params}
            history={history}
            fetch={fetch}
            details={details}
          />
        </Content>
        {/* </Layout> */}
      </Layout>
      {/* </div> */}
    </>
  );
};

ExperimentContainer.propTypes = {
  details: PropTypes.shape({
    experimentsList: PropTypes.array,
    projectName: PropTypes.string,
  }).isRequired,
};

export default ExperimentContainer;
