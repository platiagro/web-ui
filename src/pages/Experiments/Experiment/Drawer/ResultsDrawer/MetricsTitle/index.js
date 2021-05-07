// CORE LIBS
import React from 'react';

// UI LIBS
import { LoadingOutlined } from '@ant-design/icons';

const MetricsTitle = ({ loading }) => {
  return loading ? (
    <span>
      Métricas <LoadingOutlined />
    </span>
  ) : (
    <span>Métricas</span>
  );
};

export default MetricsTitle;
