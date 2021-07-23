import React from 'react';
import { Menu, Dropdown } from 'antd';
import { UserInfo } from 'components';
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
    }
  };

  const menu = (
    <Menu onClick={handleMenuClick}>
      <Menu.Item key='exit'>Sair</Menu.Item>
    </Menu>
  );

  return (
    <Dropdown overlay={menu} trigger={['click']}>
      <div className='accountInfo'>
        <UserInfo name='Usuário Anônimo' />
      </div>
    </Dropdown>
  );
};
export default AccountInfo;
