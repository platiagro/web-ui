/* eslint-disable */
// CORE LIBS
import PropTypes from "prop-types";
import React, { useState } from "react";
import {CopyToClipboard} from 'react-copy-to-clipboard';

// UI LIBS
import { Modal, Button, Input, notification } from "antd";
import { CopyOutlined } from "@ant-design/icons";
import "./style.less";

const PromoteDeploymentModal = ({
  props,
  visible,
  onClose,
  onConfirm,
  urlPrefix,
  urlSuffix,
}) => {

  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  }

  const selectBefore = (
    <div className="modal-text-color" disabled>
      {urlPrefix}
    </div>
  );
  const selectAfter = (
    <div className="modal-text-color" disabled>
      {urlSuffix}
    </div>
  );


  return (
    <Modal
      visible={visible}
      title={<strong>Implantar fluxo</strong>}
      onCancel={onClose}
      onCk={onConfirm}
      okText="Implantar"
      cancelText="Cancelar"
      width="600px"
      destroyOnClose
    >
      <p>URL de implantação</p>
      <div className="modal-components-configuration">
        <Input
          id="implantation-input"
          addonBefore={selectBefore}
          addonAfter={selectAfter}
          onChange = {handleInputChange}
        ></Input>
        <CopyToClipboard text={`${urlPrefix}${inputValue}${urlSuffix}`}>
        <Button
          className="ant-button"
          type="default"
          icon={<CopyOutlined />}
        >
          Copiar
        </Button>
        </CopyToClipboard>
      </div>
    </Modal>
  );
};

// PROP TYPES
PromoteDeploymentModal.propTypes = {
  /** modal visible */
  visible: PropTypes.bool.isRequired,
  /** is loading */
  loading: PropTypes.string,
  /** modal close handler */
  onClose: PropTypes.func.isRequired,
  /** modal confirm handler */
  onConfirm: PropTypes.func.isRequired,
};

export default PromoteDeploymentModal;
