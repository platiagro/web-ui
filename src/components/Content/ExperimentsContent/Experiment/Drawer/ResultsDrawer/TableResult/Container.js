// CORE LIBS
import React from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';

// COMPONENTS
import TableResult from './index';

// ACTIONS
import { fetchPageDataSetRequest } from 'store/operator/actions';

// DISPATCHS
const mapDispatchToProps = (dispatch) => {
  return {
    // show operator details action
    handleFetchPage: (projectId, experimentId, operator, page) =>
      dispatch(fetchPageDataSetRequest(projectId, experimentId, operator, page)),
  };
};

// STATES
const mapStateToProps = (state) => {
  return {
    operator: state.operatorReducer.uuid,
  };
};

const TableResultContainer = ({ handleFetchPage, operator, ...props }) => {
  const { projectId, experimentId } = useParams();
  const handlePageChange = (page) => {
    handleFetchPage(projectId, experimentId, operator, page);
  };
  return <TableResult pageChange={handlePageChange} {...props} />;
};

// EXPORT
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TableResultContainer);
