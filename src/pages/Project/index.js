/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import { Spin } from 'antd';
import ExperimentContainer from '../../components/ExperimentContainer';
import E404 from '../E404'; // 404 error
import * as services from '../../services/api';

export default class Project extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      details: { name: null, uuid: null, experimentList: [] },
    };
  }

  componentDidMount() {
    this.fetchDetails();
  }

  fetchDetails = async () => {
    this.setState({ loading: true });
    const { match } = this.props;
    const auxDetails = { name: null, uuid: null, experimentList: [] };
    const project = await services.getProject(match.params.projectId);
    const experiments = await services.getExperimentList(
      match.params.projectId
    );

    if (project) auxDetails.name = project.data.payload.name;
    if (project) auxDetails.uuid = project.data.payload.uuid;
    if (experiments) auxDetails.experimentList = experiments.data.payload;

    console.log(auxDetails);

    this.setState({ details: auxDetails, loading: false });
  };

  getErrorPage = () => {
    const { loading } = this.state;
    return loading ? <Spin /> : <E404 />;
  };

  render() {
    const { details } = this.state;

    return details.uuid ? (
      <ExperimentContainer details={details} />
    ) : (
      this.getErrorPage()
    );
  }
}
