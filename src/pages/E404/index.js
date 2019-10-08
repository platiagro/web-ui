import React from 'react';
import { Result } from 'antd';
// import { Empty } from 'antd';

// import sad from '../../assets/sad.svg';

// const E404 = () => (
//   <Empty
//     image={sad}
//     imageStyle={{
//       height: 60,
//     }}
//     description={<span>Erro 404</span>}
//   />
// );

const E404 = () => (
  <Result
    status='404'
    title='404'
    subTitle='Desculpe, a página que você visitou não existe.'
  />
);

export default E404;
