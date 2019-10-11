import React from 'react';
import { Layout, Icon, Row, Col } from 'antd';
import logoBody from '../../assets/logo-colorido.svg';
import './style.scss';

const { Content } = Layout;

const Root = () => (
  <Layout className='rootPage'>
    <Content className='rootPageBody'>
      <Row className='body'>
        <Col className='home-columns' span={12}>
          <p className='home-title'>
            Demonstração da PlatIAgro para o ForAGRI 2019
          </p>
          <div className='card-content'>
            <p className='home-subtitle'>Você pode:</p>
            <div className='home-cards'>
              <div>
                <Icon type='experiment' />
                <span>Criar um novo projeto</span>
              </div>
              <div>
                <Icon type='file-text' />
                <span>Ver tutorial para o ForAGRI</span>
              </div>
              <div>
                <Icon type='wechat' />
                <span>Avaliar a plataforma</span>
              </div>
            </div>
          </div>
        </Col>
        <Col className='logo-content home-columns' span={12}>
          <img className='logo-color' alt='foragri logo' src={logoBody} />
          <p className='home-text'>
            A PlatIAgro é uma plataforma aberta de IA para o agronegócio lorem
            ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
            tempor incididunt ut labore et dolore magna aliqua. Elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
        </Col>
      </Row>
    </Content>
  </Layout>
);

export default Root;
