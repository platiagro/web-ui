// CORE LIBS
import React from 'react';

// UI LIBS
import { UserOutlined } from '@ant-design/icons';

// STYLES
import './style.less';

const icon = <UserOutlined />;

const name = 'Usuario anônimo';

/**
 * Account Info.
 * This component is responsible for displaying the account information.
 *
 * @returns {object} account info object
 */
const AccountInfo = () => (
  <div className='accountInfo'>
    {icon}
    {name}
  </div>
);

// PROP TYPES
AccountInfo.propTypes = {};

// EXPORT
export default AccountInfo;
