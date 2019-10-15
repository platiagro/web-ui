import React, { useState } from 'react';
import { Layout, Icon, Row, Col } from 'antd';
import { useHistory } from 'react-router-dom';
import NewProjectModal from '../../components/NewProjectModal';
import logoBody from '../../assets/logo-colorido.svg';
import './style.scss';
import * as projectsServices from '../../services/projectsApi';

const { Content } = Layout;

const Root = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const history = useHistory();
  function handleClick() {
    history.push('/projects');
  }

  const handleCreate = (e) => {
    // form.validateFields(async (err, values) => {
    //   if (err) {
    //     return;
    //   }

    //   const response = await projectsServices.createProject(values.name);
    //   if (!!response) {
    //     form.resetFields();
    //     this.setState({ modalIsVisible: false });
    //   }
    //   this.projectsFetch();
    // });
    setModalVisible(false);
  };

  // const saveFormRef = (formRef) => {
  //   this.formRef = formRef;
  // };

  return (
    <Layout className='rootPage'>
      <NewProjectModal
        visible={modalVisible}
        onCancel={() => {
          setModalVisible(false);
        }}
        onCreate={handleCreate}
      />
      <Content className='rootPageBody'>
        <Row className='body'>
          <Col className='home-columns' span={12}>
            <p className='home-title'>
              Demonstração da PlatIAgro para o ForAGRI 2019
            </p>
            <div className='card-content'>
              <p className='home-subtitle'>Você pode:</p>
              <div className='home-cards'>
                <div role='presentation' onClick={handleClick}>
                  <Icon type='experiment' />
                  <span>Criar um novo projeto</span>
                </div>
                <a
                  rel='noopener noreferrer'
                  target='_blank'
                  href='https://forms.gle/6g7pyZ3N7seuSxxm8'
                >
                  <div>
                    <Icon type='file-text' />
                    <span>Ver tutorial para o ForAGRI</span>
                  </div>
                </a>
                <a
                  rel='noopener noreferrer'
                  target='_blank'
                  href='https://forms.gle/6g7pyZ3N7seuSxxm8'
                >
                  <div>
                    <Icon type='wechat' />
                    <span>Avaliar a plataforma</span>
                  </div>
                </a>
              </div>
            </div>
          </Col>
          <Col className='logo-content home-columns' span={12}>
            <img className='logo-color' alt='foragri logo' src={logoBody} />
            <p className='home-text'>
              A PlatIAgro é uma plataforma de IA voltada para os temas
              relacionados ao agronegócio. Sua missão é oferecer um ambiente
              facilitador do desenvolvimento e implantação de modelos
              estatísticos ou matemáticos que introduzam inteligência nos
              processos.
            </p>
          </Col>
        </Row>
      </Content>
    </Layout>
  );
};

export default Root;
