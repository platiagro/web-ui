import React, { useState } from 'react';
import { Button } from 'antd';
import { deleteExperimentComponent } from '../../services/projectsApi';

const CustomDrawerContent = ({
  details,
  fetch,
  experimentComponentId,
  handleClose,
}) => {
  const [removing, setRemoving] = useState(false);

  const removeComponent = async () => {
    setRemoving(true);
    await deleteExperimentComponent(
      details.projectId,
      details.experimentId,
      experimentComponentId
    );

    await fetch();
    await handleClose();
  };

  return (
    <div style={{ position: 'absolute', bottom: '3vh', right: '1vw' }}>
      <Button type='danger' ghost onClick={removeComponent} loading={removing}>
        Remover Componente
      </Button>
    </div>
  );
};

export default CustomDrawerContent;
