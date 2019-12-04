import './style.scss';
import React from 'react';
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
} from '../../actions/componentsActions';

class Components extends React.Component {
  constructor(props) {
    super(props);

    this.renderBody = this.renderBody.bind(this);
  }

  componentDidMount() {
    this.componentsFetch();
  }

  componentsFetch = async () => {
    const { onFetchComponents } = this.props;
    onFetchComponents();
  };

  renderBody() {
    const { loading, componentList, onDeleteComponent } = this.props;

    if (loading) return <Spin />;

    const handleDelete = async (component) => {
      onDeleteComponent(component.uuid);
    };

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
  }

  render() {
    const { loading, modalIsVisible, history } = this.props;
    const { onAddComponent, onToggleModal } = this.props;

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
          <div className='body'>{this.renderBody()}</div>
        </div>
      </div>
    );
  }
}

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
