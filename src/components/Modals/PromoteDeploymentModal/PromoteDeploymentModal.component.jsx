// CORE LIBS
import PropTypes from "prop-types";
import React from "react";

// UI LIBS
import { Modal, Button, Input, notification } from "antd";
import { CopyOutlined } from "@ant-design/icons";
import "./style.less";

const PromoteDeploymentModal = ({
  props,
  visible,
  onClose,
  onConfirm,
  textToCopy,
  urlPrefix,
  urlSuffix,
}) => {
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

  // const toRawText = (strEncoded) => {
  //   const { binData, names, ndarray, strData } = strEncoded;
  //   if (names && ndarray) {
  //     const columns = names.join(",");
  //     return columns + "\n" + ndarray.join("\n");
  //   } else if (binData) {
  //     return binData;
  //   } else {
  //     return strData;
  //   }
  // };

  // const copyToClipboard = (text) => {
  //   navigator.clipboard
  //     .writeText(text)
  //     .then(() =>
  //       notification['success']({
  //         message: 'Texto Copiado',
  //         description:
  //           'O resultado do modelo foi copiado para sua área de transferência!',
  //       })
  //     )
  //     .catch(() =>
  //       notification['error']({
  //         message: 'Erro ao Copiar Texto',
  //         description: 'Pode ser que o retorno do modelo esteja corrompido.',
  //       })
  //     );
  // };


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
        ></Input>
        <Button
          className="ant-button"
          type="default"
          icon={<CopyOutlined />}
        >
          Copiar
        </Button>
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
