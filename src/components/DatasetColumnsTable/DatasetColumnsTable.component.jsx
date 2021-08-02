import React, { useState } from 'react';
import PropTypes from 'prop-types';

import ColumnsTable from 'components/ColumnsTable';

const DatasetColumnsTable = ({
  columns,
  selectedRows,
  handleSetColumnType,
  handleRowSelection,
  setParameterLoading,
}) => {
  const [currentPage, setCurrentPage] = useState(1);

  const handleChangeColumnType = (columnType, row) => {
    const { name: columnId } = row;
    handleSetColumnType(columnId, columnType);
  };

  const handleRow = (featuretype, projectId, experimentId) => {
    handleRowSelection(featuretype, projectId, experimentId);
  };

  return (
    <ColumnsTable
      disabled={false}
      columns={columns}
      currentPage={currentPage}
      selectedRows={selectedRows}
      loading={setParameterLoading}
      handleRowSelection={handleRow}
      setCurrentPage={setCurrentPage}
      handleChangeType={handleChangeColumnType}
    />
  );
};

DatasetColumnsTable.propTypes = {
  columns: PropTypes.array.isRequired,
  selectedRows: PropTypes.array.isRequired,
  handleSetColumnType: PropTypes.func.isRequired,
  handleRowSelection: PropTypes.func.isRequired,
  setParameterLoading: PropTypes.bool.isRequired,
};

export default DatasetColumnsTable;
