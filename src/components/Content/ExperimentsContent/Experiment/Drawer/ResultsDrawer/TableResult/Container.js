// CORE LIBS
import React from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';

// COMPONENTS
import TableResult from './index';

// ACTIONS
import { getOperatorResultDataset } from 'store/operator/actions';

// DISPATCHS
const mapDispatchToProps = (dispatch) => {
  return {
    handleGetOperatorResultDataset: (
      projectId,
      experimentId,
      operator,
      page,
      pageSize
    ) =>
      dispatch(
        getOperatorResultDataset(
          projectId,
          experimentId,
          operator,
          page,
          pageSize
        )
      ),
  };
};

// STATES
const mapStateToProps = (state) => {
  return {
    operator: state.operatorReducer.uuid,
  };
};

const TableResultContainer = (props) => {
  const { handleGetOperatorResultDataset, operator, resultTable } = props;
  const { projectId, experimentId } = useParams();
  const handleOnPageChange = (page, size) => {
    handleGetOperatorResultDataset(
      projectId,
      experimentId,
      operator,
      page,
      size
    );
  };
  return (
    <TableResult
      columns={resultTable.columns}
      currentPage={resultTable.currentPage}
      onPageChange={handleOnPageChange}
      pageSize={resultTable.pageSize}
      rows={resultTable.rows}
      total={resultTable.total}
    />
  );
};

// EXPORT
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TableResultContainer);
