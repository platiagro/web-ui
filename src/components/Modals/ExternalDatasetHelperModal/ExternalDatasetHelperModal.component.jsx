import React from "react";

import { CopyToClipboard } from "react-copy-to-clipboard";

import { Modal, Button, Input, Typography } from "antd";
import { CopyOutlined } from "@ant-design/icons";

import "./style.less";

const ExternalDatasetHelperModal = (props) => {
  const { Link } = Typography;

  const { TextArea } = Input;

  const { url, onClose, visible, disabled } = props;

  return (
    <Modal
      visible={visible}
      title={<strong>Como usar uma aplicação como fonte de dados</strong>}
      destroyOnClose
      width={605}
      footer={[
        <Button type="primary" key="back" onClick={onClose}>
          Fechar
        </Button>,
      ]}
    >
      <p>
        Instruções sobre como usar uma aplicação externa como fonte de dados.
      </p>
      <p>
        A ideia é explicar de forma breve como os dados de uma aplicação podem
        ser usados para testes utilizando uma URL antes mesmo de implantar o
        fluxo em questão.
      </p>
      <CopyToClipboard text={url}>
        <Button
          style={{ color: "#0050B3" }}
          icon={<CopyOutlined />}
          shape="round"
        >
          Copiar URL
        </Button>
      </CopyToClipboard>
      <TextArea
        className="input-settings"
        size="large"
        disabled={disabled}
        value={url}
        rows={12}
      />
      <p>
        Caso o usuário queira saber mais detalhes, poderia
        <Link href=""> ver a documentação do projeto</Link>.
      </p>
    </Modal>
  );
};

export default ExternalDatasetHelperModal;
