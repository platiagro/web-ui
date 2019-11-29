/* eslint-disable react/prop-types */
import './style.scss';

import React, { Component } from 'react';

import { Col, message, Row, Spin } from 'antd';

import ContentHeader from '../../components/ContentHeader';
import ComponentsParametersTable from '../../components/Component/ParametersTable';
import ComponentsUpload from '../../components/Component/ComponentsUpload';
import NewParameterForm from '../../components/Component/NewParameterForm';

import EditableTitle from '../../components/EditableTitle';

import E404 from '../E404'; // 404 error

import uuidv4 from 'uuid/v4';

import * as componentsServices from '../../services/componentsApi';
import * as jupyterServices from '../../services/jupyterApi';

export default class ComponentDetail extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      details: { name: null, uuid: null, file: null, parameters: [] },
      namespaces: null,
    };
    this.renderBody = this.renderBody.bind(this);
  }

  componentDidMount() {
    this.fetchDetails();
  }

  fetchDetails = async () => {
    this.setState({ loading: true });
    const { match } = this.props;
    const auxDetails = { name: null, uuid: null, file: null, parameters: [] };
    const fileDetails = { uid: uuidv4(), status: 'done' };
    const component = await componentsServices.getComponent(
      match.params.componentId
    );

    if (component) {
      auxDetails.uuid = component.data.payload.uuid;
      auxDetails.name = component.data.payload.name;

      if (component.data.payload.parameters) {
        auxDetails.parameters = component.data.payload.parameters;
      }

      if (component.data.payload.file) {
        fileDetails.name = component.data.payload.file.split('/').pop();
        fileDetails.path = `components/${auxDetails.uuid}/${fileDetails.name}`;
        fileDetails.url = `${componentsServices.downloadUrl}/${auxDetails.uuid}/${fileDetails.name}`;
        auxDetails.file = fileDetails;
      }
    }

    const namespacesResponse = await jupyterServices.getNamespaces();
    let jupyterNamespaces;
    if (namespacesResponse) {
      jupyterNamespaces = namespacesResponse.data.namespaces;
    }

    this.setState({
      loading: false,
      details: auxDetails,
      namespaces: jupyterNamespaces,
    });
  };

  getErrorPage = () => {
    const { loading } = this.state;
    return loading ? <Spin /> : <E404 />;
  };

  setDetails = (detailsChanged) => {
    this.setState({ details: detailsChanged });
  };

  renderBody() {
    const { loading, details, namespaces } = this.state;

    if (loading) return <Spin />;

    const onSubmit = async (values) => {
      const newParameter = {
        name: null,
        type: null,
        required: null,
        default: null,
        details: null,
      };
      newParameter.name = values.name;
      newParameter.type = values.type;
      newParameter.required = values.required;
      newParameter.default = values.defaultValue;
      newParameter.details = values.details;

      const { uuid, parameters } = details;
      let checkParameters = true;
      parameters.forEach((parameter) => {
        if (parameter.name === newParameter.name) {
          checkParameters = false;
        }
      });

      if (checkParameters) {
        parameters.push(newParameter);
        const response = await componentsServices.updateParameters(
          uuid,
          parameters
        );
        if (response) {
          this.setState(details);
          message.success(
            `Parâmetro ${newParameter.name} adicionado com sucesso`
          );
          return true;
        }
        return false;
      }
      message.error('Já existe parâmetro com esse nome adicionado');
      return false;
    };

    return (
      <Row className='row'>
        <Col span={14} className='col'>
          <h2>Definição de parâmetros</h2>
          <h1>Adicione os parâmetros que serão configurados no experimento.</h1>
          <NewParameterForm onSubmit={onSubmit} />
        </Col>
        <Col span={10} className='col'>
          <ComponentsUpload
            details={details}
            namespaces={namespaces}
            changeDetails={this.setDetails}
          />
        </Col>
      </Row>
    );
  }

  renderParametersTable() {
    const { loading, details } = this.state;

    if (loading) return <Spin />;

    const handleDelete = async (removedParameter) => {
      const { uuid, parameters } = details;
      const index = parameters.indexOf(removedParameter, 0);
      if (index > -1) {
        parameters.splice(index, 1);
        await componentsServices.updateParameters(uuid, parameters);
        this.setState(details);
        message.success(
          `Parâmetro ${removedParameter.name} removido com sucesso`
        );
      } else {
        message.error(`Erro ao remover parâmetro ${removedParameter.name}`);
      }
    };

    return (
      <ComponentsParametersTable
        parameterList={details.parameters}
        onDelete={handleDelete}
      />
    );
  }

  render() {
    const { details } = this.state;

    const { history } = this.props;
    function handleClick() {
      history.push('/components');
    }

    return details.uuid ? (
      <div className='componentPage'>
        <ContentHeader
          title={<EditableTitle details={details} fetch={this.fetchDetails} />}
          subTitle={details.uuid}
          onBack={handleClick}
        />

        <div className='componentPageBody'>
          <div className='body'>
            {this.renderBody()}
            <br />
            {this.renderParametersTable()}
          </div>
        </div>
      </div>
    ) : (
      this.getErrorPage()
    );
  }
}
