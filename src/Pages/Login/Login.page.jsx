import React, { useRef } from 'react';
import { Button, Input } from 'antd';
import { Link } from 'react-router-dom';
import { UserOutlined, LockOutlined } from '@ant-design/icons';

import Logo from 'assets/logo-icon-name-below.png';

import './Login.style.less';

const Login = () => {
  const userNameRef = useRef(null);
  const passwordRef = useRef(null);

  const getValues = () => {
    const userName = userNameRef.current?.state.value || '';
    const password = passwordRef.current?.state.value || '';

    return {
      userName,
      password,
    };
  };

  const handleValidation = () => {
    const { userName, password } = getValues();

    if (!userName.trim()) {
      if (userNameRef.current) userNameRef.current.focus();
      return false;
    }

    if (!password.trim()) {
      if (passwordRef.current) passwordRef.current.focus();
      return false;
    }

    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (handleValidation()) {
      const { userName, password } = getValues();
      console.log(userName, password);
    }
  };

  return (
    <div className='login'>
      <div className='login-panel'>
        <div className='login-panel-left-side'>
          <img className='login-panel-logo' src={Logo} alt='PlatIAgro Logo' />
          <div className='login-panel-app-description'>
            A Plataforma de Inteligência Artificial para o Agronegócio -
            PlatIAgro - visa facilitar a construção de aplicações baseadas em
            IA, como <i>machine learning</i> em geral, visão computacional e
            processamento de linguagem natural no contexto do agronegócio
            brasileiro.
          </div>
        </div>

        <div className='login-panel-right-side'>
          <form className='login-panel-form' onSubmit={handleSubmit} noValidate>
            <div className='login-panel-title'>Login</div>

            <div className='login-panel-input-container'>
              <label htmlFor='userName'>Usuário</label>

              <Input
                ref={userNameRef}
                id='userName'
                type='text'
                placeholder='Digite seu usuário'
                prefix={<UserOutlined />}
                size='large'
              />
            </div>

            <div className='login-panel-input-container'>
              <label htmlFor='password'>Senha</label>

              <Input
                ref={passwordRef}
                id='password'
                type='password'
                placeholder='Digite sua Senha'
                prefix={<LockOutlined />}
                size='large'
              />
            </div>

            <div className='login-panel-actions-container'>
              <Button htmlType='submit' type='primary' size='large'>
                Entrar
              </Button>

              <Link to='/' className='login-panel-forgot-password'>
                Esqueci Minha Senha
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
