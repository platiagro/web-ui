import React from 'react';
import PropTypes from 'prop-types';

import { InputNumber } from 'antd';

const AutoMLDrawerContent = ({ parameter, setAutoML }) => (
  <div>
    <p>Por quanto tempo você quer treinar o seu modelo?</p>
    <InputNumber onChange={setAutoML} value={parameter.time} min={1} max={10} />
    <small> minutos</small>
  </div>
);
AutoMLDrawerContent.propTypes = {
  // dataSets: PropTypes.arrayOf(PropTypes.any).isRequired,
  parameter: PropTypes.objectOf(PropTypes.number).isRequired,
  setAutoML: PropTypes.func.isRequired,
};
export default AutoMLDrawerContent;
