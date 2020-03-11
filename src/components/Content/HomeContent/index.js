// CORE LIBS
import React from 'react';

// UI LIBS
import { Layout, Row, Col } from 'antd';

// COMPONENTS
import NewProjectModal from '../ProjectsContent/NewProjectModal';

// STYLES
import './style.scss';

// IMAGES
import logoBody from '../../../assets/logo-colorido.svg';
import ic_projeto from '../../../assets/ic_projeto.svg';
import ic_avaliacao from '../../../assets/ic_avaliacao.svg';
import ic_programacao from '../../../assets/ic_programacao.svg';

// LAYOUT COMPONENTS
const { Content } = Layout;

/**
 * Home Content.
 * This component is responsible for displaying the home content.
 */
const HomeContent = () => {
  // RENDER
  return (
    // layout container
    <Layout className='rootPage'>
      {/* new project modal */}
      <NewProjectModal />

      {/* content container */}
      <Content className='rootPageBody'>
        {/* row container */}
        <Row className='body'>
          {/* column container */}
          <Col className='home-columns' span={12}>
            {/* title */}
            <p className='home-title'>
              Demonstração da PlatIAgro para o ForAGRI 2019
            </p>
            {/* cards container */}
            <div className='card-content'>
              {/* cards title */}
              <p className='home-subtitle'>Você pode:</p>
              {/* cards */}
              <div className='home-cards'>
                {/* new project card */}
                <div role='presentation' onClick={() => alert()}>
                  <img src={ic_projeto} alt='Icone de experimento' />
                  <span>Criar um novo projeto</span>
                </div>
                {/* rating card */}
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
                {/* foragri schedule card */}
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
          {/* column container */}
          <Col className='logo-content home-columns' span={12}>
            {/* platiagro logo */}
            <img className='logo-color' alt='foragri logo' src={logoBody} />
            {/* platiagro description */}
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

// EXPORT
export default HomeContent;
