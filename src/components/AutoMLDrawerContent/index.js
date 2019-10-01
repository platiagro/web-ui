import React from 'react';

import { InputNumber } from 'antd';

const AutoMLDrawerContent = () => (
  <div>
    <p>Por quanto tempo você quer treinar o seu modelo?</p>
    <InputNumber min={1} max={10} />
    <small> minutos</small>
  </div>
);

export default AutoMLDrawerContent;
