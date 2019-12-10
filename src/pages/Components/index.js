/**
 * Component responsible for:
 * - Structuring the components page layout
 * - Fetch the components list
 */
import './style.scss';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Button, Empty, Spin } from 'antd';
import ComponentsTable from '../../components/Component/ComponentsTable';
import ContentHeader from '../../components/ContentHeader';
import NewComponentModal from '../../components/Component/NewComponentModal';
import emptyPlaceholder from '../../assets/emptyPlaceholder.png';
import {
  fetchComponents,
  toggleModal,
} from '../../store/actions/componentsActions';

const Components = (props) => {
  const { componentList, loading } = props;
  const { onFetchComponents, onToggleModal } = props;

  // Fetch components on component did mount
  useEffect(() => {
    onFetchComponents();
  }, []);

  // Function to render body
  const renderBody = () => {
    if (loading) return <Spin />;

    return componentList.length === 0 ? (
      <Empty
        image={emptyPlaceholder}
        imageStyle={{
          height: 136,
        }}
        description={
          <span>
            <span>
              <strong>Nenhum componente foi criado</strong>
            </span>
            <br />
            <span>
              Clique no botão &quot;Novo Componente&quot; para começar
            </span>
          </span>
        }
      />
    ) : (
      <ComponentsTable />
    );
  };

  return (
    <div className='componentsPage'>
      <ContentHeader title='Componentes' />

      <NewComponentModal />

      <div className='componentsPageBody'>
        <div className='header'>
          <Button
            disabled={loading}
            onClick={onToggleModal}
            type='primary'
            icon='plus'
          >
            Novo Compomente
          </Button>
        </div>
        <div className='body'>{renderBody()}</div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    ...state.components,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onFetchComponents: () => {
      dispatch(fetchComponents());
    },
    onToggleModal: () => {
      dispatch(toggleModal());
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Components);
