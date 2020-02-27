// CORE LIBS
import React from 'react';
import PropTypes from 'prop-types';

// UI LIBS
import { Icon, Table } from 'antd';

/**
 * Table Result.
 * This component is responsible for displaying table result.
 */
const TableResult = ({
  title,
  creationCounter,
  exhibitionCounter,
  resultTable,
}) => {
  // is increased
  const isIncreased = creationCounter.after > creationCounter.before;
  // report word
  const reportWord = isIncreased ? 'Mais' : 'Menos';
  // report symbol
  const reportSymbol = isIncreased ? '+' : '-';

  return (
    // div container
    <div>
      {/* rendering title */}
      <p>
        <strong>{title}</strong>
      </p>
      {/* rendering creation counter */}
      <span>{creationCounter.before}</span>
      <Icon type='arrow-right' />
      <span>{creationCounter.after}</span>
      {isIncreased ? <Icon type='arrow-up' /> : <Icon type='arrow-down' />}
      <span>
        {`${reportWord} ${creationCounter.difference} atributos (${reportSymbol} ${creationCounter.percent}%)`}
      </span>
      {/* breaking lines */}
      <br />
      <br />
      {/* rendering exhibition counter */}
      <p>
        <small>
          {`Exibindo ${exhibitionCounter.current} de ${exhibitionCounter.total} observações`}
        </small>
      </p>
      {/* rendering result table */}
      <Table
        dataSource={resultTable.rows}
        columns={resultTable.columns}
        size='middle'
        pagination={false}
      />
    </div>
  );
};

// PROP TYPES
TableResult.propTypes = {
  /** table result title string */
  title: PropTypes.string.isRequired,
  /** table result creation counter object */
  creationCounter: PropTypes.objectOf(PropTypes.number).isRequired,
  /** table result exhibition counter object */
  exhibitionCounter: PropTypes.objectOf(PropTypes.number).isRequired,
  /** table result result table object */
  resultTable: PropTypes.objectOf(PropTypes.array).isRequired,
};

// EXPORT
export default TableResult;
