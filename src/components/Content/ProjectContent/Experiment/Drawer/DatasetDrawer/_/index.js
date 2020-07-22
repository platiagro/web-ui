// CORE LIBS
import React from 'react';
import PropTypes from 'prop-types';

// UI LIBS
import { Icon } from 'antd';

// CONTAINERS
import { DatasetUploadInputBlockContainer } from 'containers';

// COMPONENTS
import ColumnsTable from '../ColumnsTable/_';

/**
 * Dataset Drawer.
 * This component is responsible for displaying dataset content in drawer.
 *
 * @param props
 */
const DatasetDrawer = (props) => {
  const {
    loading,
    trainingLoading,
    columns,
    handleSetColumnType,
    trainingSucceeded,
  } = props;
  // CONSTANTS
  // show dataset columns
  const showColumns = columns !== undefined && columns.length > 0;

  // handler to set dataset column type
  const handleChangeColumnType = (e, row) => {
    // get header id, column id and column position on array
    const { name: columnId } = row;
    // set column type const
    const columnType = e;
    // setting column type
    handleSetColumnType(columnId, columnType);
  };

  // render dataset columns table
  const renderColumnsTable = () => {
    // rendering loading
    if (loading)
      return (
        // div container
        <div style={{ padding: '10px' }}>
          {/* divider component */}
          {/* loading icon */}
          <Icon type='loading' />
        </div>
      );

    // rendering table
    return columns.length === 0 ? null : (
      // div container
      <div style={{ padding: '10px' }}>
        {/* dataset columns table */}
        Tipos de atributos
        <br />
        <ColumnsTable
          columns={columns}
          handleChangeType={handleChangeColumnType}
          disabled={trainingSucceeded || trainingLoading}
        />
      </div>
    );
  };

  // RENDER
  return (
    // div container
    <div>
      {/* dataset upload input block container */}
      <DatasetUploadInputBlockContainer />

      {/* columns table */}
      {showColumns && renderColumnsTable()}
    </div>
  );
};

// PROP TYPES
DatasetDrawer.propTypes = {
  /** dataset drawer is loading dataset */
  loading: PropTypes.bool.isRequired,
  /** dataset drawer dataset columns */
  columns: PropTypes.arrayOf(PropTypes.object).isRequired,
  /** dataset drawer set column type handler */
  handleSetColumnType: PropTypes.func.isRequired,
  /** experiment training is succeeded */
  trainingSucceeded: PropTypes.bool.isRequired,
  /** experiment is training */
  trainingLoading: PropTypes.bool.isRequired,
};

// EXPORT
export default DatasetDrawer;
