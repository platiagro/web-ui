// CORE LIBS
import React from 'react';

// CONTAINERS
import { DatasetUploadInputBlockContainer } from 'containers';

/**
 * Dataset Drawer.
 * This component is responsible for displaying dataset content in drawer.
 *
 */
const DatasetDrawer = () => {
  // RENDER
  return (
    // div container
    <div>
      {/* dataset upload input block container */}
      <DatasetUploadInputBlockContainer />
    </div>
  );
};

// EXPORT
export default DatasetDrawer;
