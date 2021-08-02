import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import { Modal, Button, Input } from 'antd';
import { CopyToClipboard } from 'components';
import { CopyOutlined } from '@ant-design/icons';
import './style.less';

const PromoteDeploymentModal = ({
  visible,
  onClose,
  onConfirm,
  urlPrefix,
  urlSuffix,
  isInputDisabled,
  initialInputValue,
  confirmButtonIsLoading,
}) => {
  const [inputValue, setInputValue] = useState(initialInputValue);

  useEffect(() => {
    setInputValue(initialInputValue);
  }, [initialInputValue]);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleConfirm = () => {
    onConfirm(inputValue);
  };

  const selectBefore = (
    <div className='modal-text-color' disabled>
      {urlPrefix}
    </div>
  );

  const selectAfter = (
    <div className='modal-text-color' disabled>
      {urlSuffix}
    </div>
  );

  return (
    <Modal
      width='875px'
      visible={visible}
      okText='Implantar'
      cancelText='Cancelar'
      onCancel={onClose}
      onOk={handleConfirm}
      title={<strong>Implantar fluxo</strong>}
      okButtonProps={{ loading: confirmButtonIsLoading }}
      destroyOnClose
    >
      <p>URL de implantação</p>

      <div className='modal-components-configuration'>
        <Input
          id='implantation-input'
          value={inputValue}
          addonAfter={selectAfter}
          addonBefore={selectBefore}
          disabled={isInputDisabled}
          onChange={handleInputChange}
        />

        <CopyToClipboard text={`${urlPrefix}${inputValue}${urlSuffix}`}>
          <Button
            className='ant-btn-primary-inverse'
            icon={<CopyOutlined />}
            type='default'
          >
            Copiar
          </Button>
        </CopyToClipboard>
      </div>
    </Modal>
  );
};

PromoteDeploymentModal.propTypes = {
  visible: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
  urlPrefix: PropTypes.string.isRequired,
  urlSuffix: PropTypes.string.isRequired,
  isInputDisabled: PropTypes.bool,
  initialInputValue: PropTypes.string,
  confirmButtonIsLoading: PropTypes.bool,
};

PromoteDeploymentModal.defaultProps = {
  loading: false,
  isInputDisabled: false,
  initialInputValue: 'initial value',
};

export default PromoteDeploymentModal;
