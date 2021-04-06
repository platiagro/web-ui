// REACT LIBS
import React, { useState } from 'react';
import PropTypes from 'prop-types';

// COMPONENTS
import ColumnsTable from 'components/ColumnsTable/_';

/**
 * Component to display dataset columns in a ant design table.
 *
 * @component
 *
 * @param {object} props Component props
 *
 * @returns {DatasetColumnsTable} Component
 */
const DatasetColumnsTable = (props) => {
  // PROPS / CONSTANTS
  // destructuring component props
  const {
    columns,
    selectedRows,
    handleSetColumnType,
    handleRowSelection,
    setParameterLoading,
  } = props;

  // table is disabled
  const disabled = false;

  // HOOKS
  // table page state hook
  const [currentPage, setCurrentPage] = useState(1);

  // HANDLERS / FUNCTIONS
  // handler to set dataset column type
  const handleChangeColumnType = (e, row) => {
    // get header id, column id and column position on array
    const { name: columnId } = row;

    // set column type const
    const columnType = e;

    // setting column type
    handleSetColumnType(columnId, columnType);
  };

  const handleRow = (e, projectId, experimentId) => {
    const featuretype = e;
    handleRowSelection(featuretype, projectId, experimentId);
  };

  // RENDER
  return (
    /* dataset columns table */
    <ColumnsTable
      columns={columns}
      handleChangeType={handleChangeColumnType}
      disabled={disabled}
      currentPage={currentPage}
      setCurrentPage={setCurrentPage}
      handleRowSelection={handleRow}
      selectedRows={selectedRows}
      loading={setParameterLoading}
    />
  );
};

// PROP TYPES
DatasetColumnsTable.propTypes = {
  /** Dataset columns*/
  columns: PropTypes.array.isRequired,

  /** Change column data type handler */
  handleSetColumnType: PropTypes.func.isRequired,

  /** featuretype*/
  handleRowSelection: PropTypes.func.isRequired,
};

// EXPORT DEFAULT
export default DatasetColumnsTable;
