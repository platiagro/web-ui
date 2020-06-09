import React from 'react';
import { Icon } from 'antd';

const MetricsTitle = ({ loading }) => {
  return loading ? (
    <span>
      Métricas <Icon type='loading' />
    </span>
  ) : (
    <span>Métricas</span>
  );
};

export default MetricsTitle;
