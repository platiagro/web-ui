import React from 'react';

import { Empty } from 'antd';

import sad from '../../assets/sad.svg';

const E404 = () => (
  <Empty
    image={sad}
    imageStyle={{
      height: 60,
    }}
    description={<span>Erro 404</span>}
  />
);

export default E404;
