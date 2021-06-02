import React from 'react';
import { UserOutlined } from '@ant-design/icons';

import './style.less';

const AccountInfo = () => (
  <div className='accountInfo'>
    <UserOutlined />
    <span>Usuário Anônimo</span>
  </div>
);

export default AccountInfo;
