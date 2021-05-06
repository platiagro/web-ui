// CORE LIBS
import React from 'react';
import PropTypes from 'prop-types';

// CONTAINERS
import {
  DatasetUploadInputBlockContainer,
  DataViewButtonContainer,
} from 'containers';

// COMPONENTS
import { PropertyBlock } from 'components';

/**
 * Dataset Drawer.
 * This component is responsible for displaying dataset content in drawer.
 *
 * @param props
 */
const DatasetDrawer = (props) => {
  // PROPS / CONSTANTS
  // destructuring props
  const { columns } = props;

  // show data view button
  const showDataViewButton = columns !== undefined && columns.length > 0;

  // RENDERS
  // render data view button
  const renderDataViewButton = () => {
    // rendering table
    return columns.length === 0 ? null : (
      // input container
      <PropertyBlock>
        <DataViewButtonContainer />
      </PropertyBlock>
    );
  };

  // render component
  return (
    // div container
    <div>
      {/* dataset upload input block container */}
      <DatasetUploadInputBlockContainer />

      {/* data view button */}
      {showDataViewButton && renderDataViewButton()}
    </div>
  );
};

// PROP TYPES
DatasetDrawer.propTypes = {
  /** dataset drawer dataset columns */
  columns: PropTypes.arrayOf(PropTypes.object).isRequired,
};

// EXPORT
export default DatasetDrawer;
