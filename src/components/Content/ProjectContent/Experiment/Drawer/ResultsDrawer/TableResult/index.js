// CORE LIBS
import React from 'react';
import PropTypes from 'prop-types';

// UI LIBS
import { Table } from 'antd';

/**
 * Table Result.
 * This component is responsible for displaying table result.
 */
const TableResult = ({ title, resultTable }) => {
  // RENDER
  return (
    // div container
    <div>
      {/* rendering title */}
      <p>
        <strong>{title}</strong>
      </p>
      {/* rendering result table */}
      <Table
        dataSource={resultTable.rows}
        columns={resultTable.columns}
        size='middle'
        pagination={true}
      />
    </div>
  );
};

// PROP TYPES
TableResult.propTypes = {
  /** table result title string */
  title: PropTypes.string.isRequired,
  /** table result result table object */
  resultTable: PropTypes.objectOf(PropTypes.array).isRequired,
};

// EXPORT
export default TableResult;
