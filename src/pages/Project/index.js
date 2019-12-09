import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Spin } from 'antd';
import ExperimentContainer from '../../components/Project/ExperimentContainer';
import E404 from '../E404';
import { getProjectDetail } from '../../store/actions/projectActions';

const Project = (props) => {
  const { details, flowDetail, loading, match } = props;
  const { onGetProjectDetaill } = props;

  const fetchDetails = () => {
    onGetProjectDetaill(match.params.projectId);
  };

  useEffect(() => {
    fetchDetails();
  }, []);

  useEffect(() => {
    fetchDetails();
  }, [flowDetail]);

  const getErrorPage = () => {
    return loading ? <Spin /> : <E404 />;
  };

  return details.uuid ? (
    <ExperimentContainer fetch={fetchDetails} />
  ) : (
    getErrorPage()
  );
};

const mapStateToProps = (state) => {
  return {
    ...state.project,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onGetProjectDetaill: (id) => {
      dispatch(getProjectDetail(id));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Project);
