/**
 * Component responsible for:
 * - Structuring the component detail page layout
 * - Fetch the component detail
 * - Fetch the jupyter namespaces
 */
import './style.scss';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Col, Row, Spin } from 'antd';
import ContentHeader from '../../components/ContentHeader';
import ComponentsParametersTable from '../../components/Component/ParametersTable';
import ComponentsUpload from '../../components/Component/ComponentsUpload';
import NewParameterForm from '../../components/Component/NewParameterForm';
import EditableTitle from '../../components/EditableTitle';
import E404 from '../E404'; // 404 error
import {
  getComponentDetail,
  getNamespaces,
  updateComponentName,
} from '../../store/actions/componentActions';

const ComponentDetail = (props) => {
  const { details, history, loading, match } = props;
  const {
    onGetComponentDetail,
    onGetNamespaces,
    onUpdateComponentName,
  } = props;

  useEffect(() => {
    onGetComponentDetail(match.params.componentId);
    onGetNamespaces();
  }, []);

  const getErrorPage = () => {
    return loading ? <Spin /> : <E404 />;
  };

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
          <Row className='row'>
            <Col span={14} className='col'>
              <h2>Definição de parâmetros</h2>
              <h1>
                Adicione os parâmetros que serão configurados no experimento.
              </h1>
              <NewParameterForm />
            </Col>
            <Col span={10} className='col'>
              <ComponentsUpload />
            </Col>
          </Row>
          <br />
          <ComponentsParametersTable />
        </div>
      </div>
    </div>
  ) : (
    getErrorPage()
  );
};

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
    onUpdateComponentName: (editableDetails, name, resultCallback) => {
      dispatch(updateComponentName(editableDetails, name, resultCallback));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ComponentDetail);
