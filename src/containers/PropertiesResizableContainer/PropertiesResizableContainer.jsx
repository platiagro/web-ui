import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

import { useDeepEqualSelector } from 'hooks';
import { ExternalDatasetHelperModal } from 'components/Modals';
import { PropertiesPanel, ExternalDatasetDrawer } from 'components';

const selectedOperatorNameSelector = ({ operatorReducer }) => {
  return operatorReducer.name;
};

const selectedOperatorTagsSelector = ({ operatorReducer }) => {
  return operatorReducer?.tags?.includes('DATASETS');
};

export const deploymentsUrlSelector =
  (currentDeploymentId) =>
  ({ deploymentsReducer }) => {
    return deploymentsReducer.find(({ uuid }) => uuid === currentDeploymentId)
      ?.url;
  };

const PropertiesResizableContainer = () => {
  const { deploymentId } = useParams();
  const [isOpenHelperModal, setIsOpenHelperModal] = useState(false);

  const operatorName = useDeepEqualSelector(selectedOperatorNameSelector);
  const operatorIsDataset = useDeepEqualSelector(selectedOperatorTagsSelector);
  const deploymentUrl = useDeepEqualSelector(
    deploymentsUrlSelector(deploymentId)
  );

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
          description="Você pode testar o fluxo com um cliente HTTP, por exemplo o <a target='_blank' rel='noreferrer' href='https://www.postman.com' >Postman.</a>"
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
