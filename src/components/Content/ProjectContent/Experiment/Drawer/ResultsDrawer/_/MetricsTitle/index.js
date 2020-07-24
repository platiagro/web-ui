// CORE LIBS
import React from 'react';

// UI LIBS
import { Icon as LegacyIcon } from '@ant-design/compatible';

const MetricsTitle = ({ loading }) => {
  return loading ? (
    <span>
      Métricas <LegacyIcon type='loading' />
    </span>
  ) : (
    <span>Métricas</span>
  );
};

export default MetricsTitle;
