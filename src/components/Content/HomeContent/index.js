// CORE LIBS
import React from 'react';

import { Link } from 'react-router-dom';

// UI LIBS
import { Layout, Row, Col } from 'antd';

// COMPONENTS
import NewProjectModal from '../ProjectsContent/NewProjectModal/Container';

// STYLES
import './style.scss';

// IMAGES
import logoBody from '../../../assets/logo-colorido.svg';
import ic_projeto from '../../../assets/ic_projeto.svg';
import ic_tarefa from '../../../assets/ic_tarefa.svg';
import ic_documentacao from '../../../assets/ic_documentacao.svg';

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
          <Col className='home-columns' span={13}>
            {/* title */}
            <p className='home-title'>
              Plataforma de Inteligência Artificial para o Agronegócio
            </p>
            {/* cards container */}
            <div className='card-content'>
              {/* cards title */}
              <p className='home-subtitle'>Você pode:</p>
              {/* cards */}
              <div className='home-cards'>
                {/* new project card */}
                <Link to='/projetos'>
                  <div>
                    <img
                      src={ic_projeto}
                      alt='Desenho de um frasco utilizado na preparação de experimentos'
                    />
                    <span>
                      Criar um projeto e experimentar diferentes fluxos de
                      tarefas
                    </span>
                  </div>
                </Link>
                {/* rating card */}
                <Link to='/tarefas'>
                  <div>
                    <img
                      src={ic_tarefa}
                      alt='Desenho de uma tela de execução de um interpretador de comandos de computador'
                    />
                    <span>
                      Construir uma tarefa e conhecer as tarefas disponíveis
                    </span>
                  </div>
                </Link>
                {/* documentation card */}
                <a
                  rel='noopener noreferrer'
                  target='_blank'
                  href='https://platiagro.github.io/'
                >
                  <div>
                    <img src={ic_documentacao} alt='Ponto de interrogação' />
                    <span>
                      Tirar suas dúvidas com a documentação da PlatIAgro
                    </span>
                  </div>
                </a>
              </div>
            </div>
          </Col>
          {/* column container */}
          <Col className='logo-content home-columns' span={11}>
            {/* platiagro logo */}
            <img
              className='logo-color'
              alt={`Logotipo da PlatIAgro: possui o desenho de duas folhas verdes,
                    uma delas é formada por linhas e pontos, como um gráfico estatístico.
                    O texto PlatIAgro está à direita do logotipo.`}
              src={logoBody}
            />
            {/* platiagro description */}
            <p className='home-text'>
              A Plataforma de Inteligência Artificial para o agronegócio –
              PlatIAgro – é uma plataforma de IA voltada para os temas
              relacionados ao agronegócio.
              <br />
              Sua missão é oferecer um ambiente facilitador do desenvolvimento
              de aplicações para diferentes atores da cadeia do agronegócio,
              como produtores, indústria e órgãos fiscalizadores.
            </p>
          </Col>
        </Row>
      </Content>
    </Layout>
  );
};

// EXPORT
export default HomeContent;
