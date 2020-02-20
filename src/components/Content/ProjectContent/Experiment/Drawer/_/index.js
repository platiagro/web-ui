// CORE LIBS
import React, { useState } from 'react';
import PropTypes from 'prop-types';

// UI LIBS
import { Drawer as AntDrawer } from 'antd';

// COMPONENTS
import DatasetDrawer from '../DatasetDrawer/_';
import GenericDrawer from '../GenericDrawer/_';
// import ResultsDrawer from '../ResultsDrawer';
// import ResultsButtonBar from '../ResultsButtonBar';

// MOCKS
import columnsMock from '../DatasetDrawer/ColumnsTable/_columnsMock';

/**
 * Drawer.
 * This component is responsible for displaying drawer.
 */
const Drawer = ({ title, visible, handleClose }) => (
  <AntDrawer
    width={350}
    title={title}
    visible={visible}
    closable
    onClose={handleClose}
  >
    {/* <DatasetDrawer
      handleSetColumnType={(headerId, columnId, columnType, columnPosition) =>
        alert(
          `headerId: ${headerId}, columnId: ${columnId}, columnType: ${columnType}, columnPosition: ${columnPosition}`
          // eslint-disable-next-line
        )}
      projectId='01'
      parameters={{ parametro: { subparametro: 'parametro-sub' } }}
      handleSetTarget={(projectId, experimentId, targetId, parameters) =>
        alert(
          `projectId: ${projectId}, experimentId: ${experimentId}, targetId: ${targetId}, parameters: ${parameters}`
          // eslint-disable-next-line
        )}
      experimentId='01'
      handleUploadFiles={(projectId, experimentId, formData) =>
        alert(
          `projectId: ${projectId}, experimentId: ${experimentId}, formData: ${formData}`
          // eslint-disable-next-line
        )}
      targetColumnId='01'
      loading={false}
      columns={columnsMock}
    /> */}
    <GenericDrawer />
  </AntDrawer>
);

// EXPORT
export default Drawer;
