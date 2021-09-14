import React from 'react';
import { Menu, Dropdown } from 'antd';
import { UserInfoContainer } from 'containers';
import { useHistory } from 'react-router';
import utils from 'utils';
import './style.less';

const AccountInfo = () => {
  const history = useHistory();

  const handleMenuClick = (e) => {
    if (e.key === 'exit') {
      utils.deleteCookie('authservice_session');
      history.push('/');
      window.location.reload();
    } else if (e.key === 'userPerfil') {
      history.push('/user-perfil');
    }
  };

  const menu = (
    <Menu onClick={handleMenuClick}>
      <Menu.Item key='userPerfil'>Minha conta</Menu.Item>
      <Menu.Item key='exit'>Sair</Menu.Item>
    </Menu>
  );

  return (
    <Dropdown overlay={menu} trigger={['click']}>
      <div className='accountInfo'>
        <UserInfoContainer />
      </div>
    </Dropdown>
  );
};
export default AccountInfo;
