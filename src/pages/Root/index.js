/**
 * Component responsible for:
 * - Structuring the root page layout
 */
import './style.scss';
import React, { useState, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import { Layout, Row, Col } from 'antd';
import NewProjectModal from '../../components/NewProjectModal';
import logoBody from '../../assets/logo-colorido.svg';
import ic_projeto from '../../assets/ic_projeto.svg';
import ic_avaliacao from '../../assets/ic_avaliacao.svg';
import ic_programacao from '../../assets/ic_programacao.svg';
import * as projectsServices from '../../services/projectsApi';

const { Content } = Layout;

const Root = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const history = useHistory();
  const [formRef, setFormRef] = useState(null);

  // Function to change modal visibility
  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };

  // Function to save form reference
  const saveFormRef = useCallback((node) => {
    if (node !== null) {
      setFormRef(node);
    }
  }, []);

  // Function to handle project creation
  const handleCreate = () => {
    formRef.validateFields(async (err, values) => {
      if (err) {
        return;
      }

      const response = await projectsServices.createProject(values.name);
      if (response) {
        setModalVisible(false);
        formRef.resetFields();
        history.push(`/projects/${response.data.payload.uuid}`);
      }
    });
  };

  return (
    <Layout className='rootPage'>
      <NewProjectModal
        ref={saveFormRef}
        visible={modalVisible}
        onCancel={toggleModal}
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
                <div role='presentation' onClick={toggleModal}>
                  <img src={ic_projeto} alt='Icone de experimento' />
                  <span>Criar um novo projeto</span>
                </div>

                <a
                  rel='noopener noreferrer'
                  target='_blank'
                  href='https://forms.gle/6g7pyZ3N7seuSxxm8'
                >
                  <div>
                    <img src={ic_avaliacao} alt='Icone de chat' />
                    <span>Avaliar a plataforma</span>
                  </div>
                </a>
                <a
                  rel='noopener noreferrer'
                  target='_blank'
                  href='https://joinups.cpqd.com.br/foragri/#programacao'
                >
                  <div>
                    <img src={ic_programacao} alt='Icone de calendario' />
                    <span>Ver programação do ForAGRI</span>
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
