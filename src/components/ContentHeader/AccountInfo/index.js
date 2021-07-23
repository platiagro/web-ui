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
    }
  };

  const menu = (
    <Menu onClick={handleMenuClick}>
      <Menu.Item key='exit'>Sair</Menu.Item>
    </Menu>
  );

  return (
    <Dropdown
      overlayClassName='accountInfo-menu'
      overlay={menu}
      // trigger={['click']}
      // visible={true}
      placement='bottomCenter'
    >
      <div className='accountInfo'>
        <UserInfo name='Usuário Anônimo' />
      </div>
    </Dropdown>
  );
};
export default AccountInfo;
