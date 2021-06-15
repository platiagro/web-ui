import React from 'react';
import PropTypes from 'prop-types';
import { CopyOutlined } from '@ant-design/icons';
import { Modal, Button, Input, Typography } from 'antd';

import { CopyToClipboard } from 'components';

import './style.less';

const ExternalDatasetHelperModal = ({
  url,
  onClose,
  visible,
  disabled,
  exampleBody,
}) => {
  return (
    <Modal
      visible={visible}
      title={<strong>Como usar uma aplicação como fonte de dados</strong>}
      destroyOnClose
      width={605}
      onCancel={onClose}
      footer={[
        <Button type='primary' key='back' onClick={onClose}>
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
          style={{ color: '#0050B3' }}
          icon={<CopyOutlined />}
          shape='round'
        >
          Copiar URL
        </Button>
      </CopyToClipboard>

      <Input.TextArea
        className='input-settings'
        size='large'
        disabled={disabled}
        value={exampleBody}
        rows={12}
      />

      <p>
        Caso o usuário queira saber mais detalhes, poderia
        <Typography.Link href=''>
          {' '}
          ver a documentação do projeto
        </Typography.Link>
        .
      </p>
    </Modal>
  );
};

ExternalDatasetHelperModal.propTypes = {
  url: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
  visible: PropTypes.bool.isRequired,
  disabled: PropTypes.bool,
  exampleBody: PropTypes.any,
};

ExternalDatasetHelperModal.defaultProps = {
  exampleBody: `{
  	"meta":{
  		"puid": "pqvaab0ej28n89sr4ffjni1ie7",
  		"tags":{},
  		"routing":{},
  		"requestPath":{
  			"e65e85-a056-40b7-9e4b-4db49ee3b915": "platiagro/platiagro-deployment-image:0.1.0"
  		},
  	}
  }`,
  disabled: true,
};

export default ExternalDatasetHelperModal;
