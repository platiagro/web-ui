import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { PropertiesPanel, ExternalDatasetDrawer } from 'components';
import { ExternalDatasetHelperModal } from 'components/Modals';

const selectedOperatorNameSelector = ({ operatorReducer }) => {
  return operatorReducer.name;
};

const selectedOperatorTagsSelector = ({ operatorReducer }) => {
  return operatorReducer?.tags?.includes('DATASETS');
};

export const deploymentsUrlSelector = (currentDeploymentId) => ({
  deploymentsReducer,
}) => {
  return deploymentsReducer.find(({ uuid }) => uuid === currentDeploymentId)
    ?.url;
};

const PropertiesResizableContainer = () => {
  const { deploymentId } = useParams();
  const [isOpenHelperModal, setIsOpenHelperModal] = useState(false);

  const operatorName = useSelector(selectedOperatorNameSelector);
  const deploymentUrl = useSelector(deploymentsUrlSelector(deploymentId));
  const operatorIsDataset = useSelector(selectedOperatorTagsSelector);

  const handleHideHelperModal = () => {
    setIsOpenHelperModal(false);
  };

  const handleShowHelperModal = () => {
    setIsOpenHelperModal(true);
  };

  return (
    <PropertiesPanel title={operatorName}>
      {operatorIsDataset && (
        <ExternalDatasetDrawer
          propertyTitle='Tipo da fonte de dados'
          propertyTip='Dica'
          urlText={deploymentUrl}
          onClickLearnMore={handleShowHelperModal}
          description='Um texto falando sobre como uma aplicação pode enviar dados para o fluxo (através de uma URL) a fim de testá-lo antes da implantação.'
        />
      )}

      <ExternalDatasetHelperModal
        onClose={handleHideHelperModal}
        visible={isOpenHelperModal}
        url={deploymentUrl}
      />
    </PropertiesPanel>
  );
};

export default PropertiesResizableContainer;
