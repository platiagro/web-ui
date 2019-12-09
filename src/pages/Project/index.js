import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Spin } from 'antd';
import ExperimentContainer from '../../components/ExperimentContainer';
import E404 from '../E404';
import { getProjectDetail } from '../../store/actions/projectActions';

const Project = (props) => {
  const { details, loading, match } = props;
  const { onGetProjectDetaill } = props;

  const fetchDetails = () => {
    onGetProjectDetaill(match.params.projectId);
  };

  useEffect(() => {
    fetchDetails();
  }, []);

  const getErrorPage = () => {
    return loading ? <Spin /> : <E404 />;
  };

  return details.uuid ? (
    <ExperimentContainer
      params={match.params}
      fetch={fetchDetails}
      details={details}
    />
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
