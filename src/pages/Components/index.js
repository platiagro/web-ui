import './style.scss';
import React from 'react';
import { Button, Empty, Spin } from 'antd';
import NewComponentModal from '../../components/Component/NewComponentModal';
import ComponentsTable from '../../components/Component/ComponentsTable';
import ContentHeader from '../../components/ContentHeader';
import emptyPlaceholder from '../../assets/emptyPlaceholder.png';
import * as componentsServices from '../../services/componentsApi';

class Components extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      componentList: [],
      modalIsVisible: false,
    };

    this.renderBody = this.renderBody.bind(this);
    this.showModal = this.showModal.bind(this);
    this.hideModal = this.hideModal.bind(this);
  }

  componentDidMount() {
    this.componentsFetch();
  }

  handleCreate = () => {
    const { form } = this.formRef.props;
    const { history } = this.props;
    form.validateFields(async (err, values) => {
      if (err) {
        return;
      }

      const response = await componentsServices.createComponent(values.name);
      if (response) {
        form.resetFields();
        this.setState({ modalIsVisible: false }, () => {
          history.push(`/components/${response.data.payload.uuid}`);
        });
      }
    });
  };

  componentsFetch = async () => {
    this.setState({ loading: true });

    const response = await componentsServices.getAllComponents();

    this.setState({ loading: false });

    if (response) this.setState({ componentList: response.data.payload });
  };

  saveFormRef = (formRef) => {
    this.formRef = formRef;
  };

  showModal() {
    this.setState({ modalIsVisible: true });
  }

  hideModal() {
    const { form } = this.formRef.props;

    this.setState({ modalIsVisible: false });

    form.resetFields();
  }

  renderBody() {
    const { loading, componentList } = this.state;

    if (loading) return <Spin />;

    const handleDelete = async (component) => {
      this.setState({ loading: true });

      await componentsServices.deleteComponent(component.uuid);

      this.setState({ loading: false });

      this.componentsFetch();
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
    const { loading, modalIsVisible } = this.state;

    return (
      <div className='componentsPage'>
        <NewComponentModal
          wrappedComponentRef={this.saveFormRef}
          visible={modalIsVisible}
          onCancel={this.hideModal}
          onCreate={this.handleCreate}
        />

        <ContentHeader title='Componentes' />

        <div className='componentsPageBody'>
          <div className='header'>
            <Button
              disabled={loading}
              onClick={this.showModal}
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

export default Components;
