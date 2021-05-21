import React from 'react';
import PropTypes from 'prop-types';
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

MetricsTitle.propTypes = {
  loading: PropTypes.boolean,
};

MetricsTitle.defaultProps = {
  loading: false,
};

export default MetricsTitle;
