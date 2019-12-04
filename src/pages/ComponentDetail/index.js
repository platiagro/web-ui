/* eslint-disable react/prop-types */
import './style.scss';

import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Col, message, Row, Spin } from 'antd';

import ContentHeader from '../../components/ContentHeader';
import ComponentsParametersTable from '../../components/Component/ParametersTable';
import ComponentsUpload from '../../components/Component/ComponentsUpload';
import NewParameterForm from '../../components/Component/NewParameterForm';

import EditableTitle from '../../components/EditableTitle';

import E404 from '../E404'; // 404 error

import {
  getComponentDetail,
  getNamespaces,
  updateComponentFile,
  updateComponentParams,
  updateComponentParamsReset,
  updateComponentName,
} from '../../actions/componentActions';

class ComponentDetail extends Component {
  constructor(props) {
    super(props);
    this.renderBody = this.renderBody.bind(this);
  }

  componentDidMount() {
    this.fetchDetails();
  }

  fetchDetails = () => {
    const { match, onGetComponentDetail, onGetNamespaces } = this.props;
    onGetComponentDetail(match.params.componentId);
    onGetNamespaces();
  };

  getErrorPage = () => {
    const { loading } = this.props;
    return loading ? <Spin /> : <E404 />;
  };

  renderBody() {
    const { details, namespaces, updateParamsResult } = this.props;
    const {
      onUpdateComponentFile,
      onUpdateComponentParams,
      onUpdateComponentParamsReset,
    } = this.props;

    const handleSubmit = async (values) => {
      const newParameter = {
        name: values.name,
        type: values.type,
        required: values.required,
        default: values.defaultValue,
        details: values.details,
      };

      const { uuid, parameters } = details;
      let checkParameters = true;
      parameters.forEach((parameter) => {
        if (parameter.name === newParameter.name) {
          checkParameters = false;
        }
      });

      if (checkParameters) {
        parameters.push(newParameter);
        parameters.sort((a, b) => {
          if (a.name < b.name) {
            return -1;
          }
          if (a.name > b.name) {
            return 1;
          }
          return 0;
        });
        onUpdateComponentParams(uuid, parameters, newParameter.name, true);
        return true;
      }
      message.error('Já existe parâmetro com esse nome adicionado');
      return false;
    };

    return (
      <Row className='row'>
        <Col span={14} className='col'>
          <h2>Definição de parâmetros</h2>
          <h1>Adicione os parâmetros que serão configurados no experimento.</h1>
          <NewParameterForm
            result={updateParamsResult}
            onSubmit={handleSubmit}
            onUpdateComponentParamsReset={onUpdateComponentParamsReset}
          />
        </Col>
        <Col span={10} className='col'>
          <ComponentsUpload
            details={details}
            namespaces={namespaces}
            updateComponentFile={onUpdateComponentFile}
          />
        </Col>
      </Row>
    );
  }

  renderParametersTable() {
    const { details, onUpdateComponentParams } = this.props;
    const handleDelete = (removedParameter) => {
      const { uuid, parameters } = details;
      const index = parameters.indexOf(removedParameter, 0);
      if (index > -1) {
        parameters.splice(index, 1);
        onUpdateComponentParams(uuid, parameters, removedParameter.name, false);
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
    const { loading, details, history, onUpdateComponentName } = this.props;

    const handleClick = () => {
      history.push('/components');
    };

    if (loading) return <Spin />;

    return details.uuid ? (
      <div className='componentPage'>
        <ContentHeader
          title={
            <EditableTitle details={details} onUpdate={onUpdateComponentName} />
          }
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

const mapStateToProps = (state) => {
  return {
    ...state.component,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onGetComponentDetail: (id) => {
      dispatch(getComponentDetail(id));
    },
    onGetNamespaces: () => {
      dispatch(getNamespaces());
    },
    onUpdateComponentFile: (file) => {
      dispatch(updateComponentFile(file));
    },
    onUpdateComponentParams: (id, parameters, parameterName, isAdd) => {
      dispatch(updateComponentParams(id, parameters, parameterName, isAdd));
    },
    onUpdateComponentParamsReset: () => {
      dispatch(updateComponentParamsReset());
    },
    onUpdateComponentName: (id, name) => {
      dispatch(updateComponentName(id, name));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ComponentDetail);
