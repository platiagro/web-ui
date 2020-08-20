// CORE LIBS
import React from 'react';

// UI LIBS
import { Layout } from 'antd';

// COMPONENTS
import MainSider from '../MainSider/_';
import Content from '../Content/_';

import './style.less';

/**
 * Main component of the application.
 *
 * This component is responsible for structuring the main layout of the
 * application.
 *
 * This component is also responsible for routing the main content of the
 * application.
 */
const App = () => (
  // layout container
  <Layout className='main-layout'>
    {/* main sider */}
    <MainSider />
    {/* content */}
    <Content />
  </Layout>
);

// EXPORT
export default App;
