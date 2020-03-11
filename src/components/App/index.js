// CORE LIBS
import React from 'react';

// UI LIBS
import { Layout } from 'antd';

// COMPONENTS
import MainHeader from '../MainHeader/_';
import MainFooter from '../MainFooter';
import Content from '../Content/_';

// LAYOUT COMPONENTS
const { Footer } = Layout;

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
  <Layout>
    {/* main header */}
    <MainHeader />
    {/* content */}
    <Content />
    {/* footer */}
    <Footer>
      {/* main footer */}
      <MainFooter />
    </Footer>
  </Layout>
);

// EXPORT
export default App;
