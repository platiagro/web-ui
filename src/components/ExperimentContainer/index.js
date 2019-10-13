import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
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
      if (!response) {
        setNewVal(name);
      } else {
        await fetch();
      }
    } else {
      setNewVal(name);
    }

    setEditMode(false);
    setLoading(false);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.currentTarget.blur();
    } else if (e.key === 'Escape') {
      setNewVal(name);
    }
  };

  return (
    <>
      <AutosizeInput
        onBlur={handleSubmit}
        onClick={() => {
          setEditMode(true);
        }}
        onKeyUp={handleKeyPress}
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

const ExperimentContainer = ({ details, fetch }) => {
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
  const [flowDetails, setFlowDetails] = useState();
  const history = useHistory();
  function handleClick() {
    history.push('/projects');
  }

  // console.log(
  //   'Details',
  //   details,
  //   'Flow',
  //   flowDetails,
  //   'Params',
  //   params.experimentId
  // );
  // console.log(details);

  return (
    <>
      <ContentHeader
        title={<EditableTitle details={details} fetch={fetch} />}
        subTitle={details.uuid}
        onBack={handleClick}
      />
      {/* <div style={{ margin: '40px' }}> */}
      <Layout className='experiment-container'>
        {/* <Layout className='experiment-content'> */}
        <LeftSideMenu fetch={fetch} setFlowDetails={setFlowDetails} />
        <Content className='experiment-wraper'>
          <ExperimentsTabs
            fetch={fetch}
            details={details}
            flowDetails={flowDetails}
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
    uuid: PropTypes.string,
  }).isRequired,
};

EditableTitle.propTypes = {
  details: PropTypes.shape({
    uuid: PropTypes.string,
    name: PropTypes.string,
  }).isRequired,
};

export default ExperimentContainer;
