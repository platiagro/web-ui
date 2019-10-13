/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import { Spin } from 'antd';
import ExperimentContainer from '../../components/ExperimentContainer';
import E404 from '../E404'; // 404 error
import * as projectsServices from '../../services/projectsApi';

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
    const project = await projectsServices.getProject(match.params.projectId);
    const experiments = await projectsServices.getExperimentList(
      match.params.projectId
    );

    if (project) auxDetails.name = project.data.payload.name;
    if (project) auxDetails.uuid = project.data.payload.uuid;
    if (experiments) auxDetails.experimentList = experiments.data.payload;

    this.setState({ details: auxDetails, loading: false });
  };

  getErrorPage = () => {
    const { loading } = this.state;
    return loading ? <Spin /> : <E404 />;
  };

  render() {
    const {
      state: { details },
      props: { match },
    } = this;

    return details.uuid ? (
      <ExperimentContainer
        params={match.params}
        fetch={this.fetchDetails}
        details={details}
      />
    ) : (
      this.getErrorPage()
    );
  }
}
