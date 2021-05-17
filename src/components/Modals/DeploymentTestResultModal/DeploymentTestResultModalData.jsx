import React, { useMemo } from 'react';
import { Input } from 'antd';
import PropTypes from 'prop-types';

import utils from 'utils';

const DeploymentTestResultModalData = ({ testResult }) => {
  const isBinaryDataSupported = useMemo(() => {
    return utils.isSupportedBinaryData(testResult);
  }, [testResult]);

  const isImage = useMemo(() => {
    return utils.isImage(testResult);
  }, [testResult]);

  if (isBinaryDataSupported) {
    return isImage ? (
      <img
        className='image-difference'
        style={{ maxWidth: '100%' }}
        alt='predict-response'
        src={utils.formatBase64(testResult)}
      />
    ) : (
      <video src={testResult.binData} controls>
        <track default kind='captions' />
      </video>
    );
  }

  return (
    <div className='iterative-prediction'>
      <h3>Resposta do Modelo</h3>

      <Input.TextArea
        disabled={true}
        defaultValue={testResult.binData ?? testResult.strData}
      />
    </div>
  );
};

DeploymentTestResultModalData.propTypes = {
  testResult: PropTypes.object.isRequired,
};

export default DeploymentTestResultModalData;
