import './style.scss';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Button, Empty, Spin } from 'antd';
import ComponentsTable from '../../components/Component/ComponentsTable';
import ContentHeader from '../../components/ContentHeader';
import NewComponentModal from '../../components/Component/NewComponentModal';
import emptyPlaceholder from '../../assets/emptyPlaceholder.png';
import {
  addComponent,
  deleteComponent,
  fetchComponents,
  toggleModal,
} from '../../store/actions/componentsActions';

const Components = (props) => {
  const { componentList, loading, modalIsVisible, history } = props;
  const {
    onAddComponent,
    onDeleteComponent,
    onFetchComponents,
    onToggleModal,
  } = props;

  useEffect(() => {
    onFetchComponents();
  }, []);

  const handleDelete = async (component) => {
    onDeleteComponent(component.uuid);
  };

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
      <ComponentsTable componentList={componentList} onDelete={handleDelete} />
    );
  };

  const handleCreate = (name) => {
    onAddComponent(name, history);
  };

  return (
    <div className='componentsPage'>
      <NewComponentModal
        visible={modalIsVisible}
        onCreate={handleCreate}
        onCancel={onToggleModal}
      />

      <ContentHeader title='Componentes' />

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
    onAddComponent: (post, history) => {
      dispatch(addComponent(post, history));
    },
    onDeleteComponent: (id) => {
      dispatch(deleteComponent(id));
    },
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
