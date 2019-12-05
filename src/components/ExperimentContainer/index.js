import './style.scss';
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { Layout } from 'antd';
import ExperimentsTabs from '../ExperimentsTabs';
import LeftSideMenu from '../LeftSideMenu';
import ContentHeader from '../ContentHeader';
import EditableTitle from '../EditableTitle';

import * as projectsServices from '../../services/projectsApi';

const { Content } = Layout;

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

  const updateProjectName = async (
    editableDetails,
    newName,
    resultCallback
  ) => {
    const { uuid } = editableDetails;
    const response = await projectsServices.updateProject(uuid, newName);
    if (!response) {
      resultCallback(false);
    }
  };

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
        title={<EditableTitle details={details} onUpdate={updateProjectName} />}
        subTitle={details.uuid}
        onBack={handleClick}
      />
      {/* <div style={{ margin: '40px' }}> */}
      <Layout className='experiment-container'>
        {/* <Layout className='experiment-content'> */}
        <LeftSideMenu
          fetch={fetch}
          setFlowDetails={setFlowDetails}
          details={details}
        />
        <Content className='experiment-wraper'>
          <ExperimentsTabs
            fetch={fetch}
            details={details}
            flowDetails={flowDetails}
            setFlowDetails={setFlowDetails}
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
