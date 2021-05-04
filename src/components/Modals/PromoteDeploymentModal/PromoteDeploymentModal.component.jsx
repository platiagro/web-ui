import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import { Modal, Button, Input } from 'antd';
import { CopyToClipboard } from 'components';
import { CopyOutlined } from '@ant-design/icons';
import './style.less';

const PromoteDeploymentModal = (props) => {
  const {
    visible,
    onClose,
    onConfirm,
    urlPrefix,
    urlSuffix,
    isInputDisabled,
    confirmButtonIsLoading,
    initialInputValue,
  } = props;

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
      visible={visible}
      title={<strong>Implantar fluxo</strong>}
      onCancel={onClose}
      onOk={handleConfirm}
      okText='Implantar'
      cancelText='Cancelar'
      width='875px'
      destroyOnClose
      okButtonProps={{ loading: confirmButtonIsLoading }}
    >
      <p>URL de implantação</p>
      <div className='modal-components-configuration'>
        <Input
          id='implantation-input'
          addonBefore={selectBefore}
          addonAfter={selectAfter}
          onChange={handleInputChange}
          value={inputValue}
          disabled={isInputDisabled}
        ></Input>
        <CopyToClipboard text={`${urlPrefix}${inputValue}${urlSuffix}`}>
          <Button
            className='ant-btn-primary-inverse'
            type='default'
            icon={<CopyOutlined />}
          >
            Copiar
          </Button>
        </CopyToClipboard>
      </div>
    </Modal>
  );
};

PromoteDeploymentModal.propTypes = {
  /** modal visible */
  visible: PropTypes.bool.isRequired,
  /** is loading */
  confirmButtonIsLoading: PropTypes.string,
  /** modal close handler */
  onClose: PropTypes.func.isRequired,
  /** modal confirm handler */
  onConfirm: PropTypes.func.isRequired,
  /** boolean to disable input */
  isInputDisabled: PropTypes.bool,
  /** Prefix for url input */
  urlPrefix: PropTypes.string.isRequired,
  /** Suffix for url input */
  urlSuffix: PropTypes.string.isRequired,
  /** Initial value on input */
  initialInputValue: PropTypes.string,
};

PromoteDeploymentModal.defaultProps = {
  loading: false,
  isInputDisabled: false,
  initialInputValue: 'initial value',
};

export default PromoteDeploymentModal;
