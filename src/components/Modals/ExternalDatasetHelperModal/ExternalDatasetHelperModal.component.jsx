import React from 'react';
import PropTypes from 'prop-types';
import { CopyOutlined } from '@ant-design/icons';
import { Modal, Button, Input } from 'antd';

import { CopyToClipboard } from 'components';

import './style.less';

const ExternalDatasetHelperModal = ({
  url,
  onClose,
  visible,
  disabled,
  exampleBody,
}) => {
  const disabledButton = !url;

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
        Quando você implanta seu fluxo, a PlatIAgro cria um Serviço REST do{' '}
        <a
          href='https://docs.seldon.io/projects/seldon-core/en/stable/index.html'
          target='_blank'
          rel='noreferrer'
        >
          Seldon Core
        </a>
        . Para testar o serviço, siga os seguintes passos:
      </p>
      <p>
        <ol>
          <li>
            <CopyToClipboard text={url}>
              <Button
                type='primary-inverse'
                icon={<CopyOutlined />}
                shape='round'
                disabled={disabledButton}
              >
                Copiar URL
              </Button>
            </CopyToClipboard>
          </li>
          <li>Escolha o método POST.</li>
          <li>Preencha o Header Content-Type: application/json</li>
          <li>Preencha o corpo da requisição:</li>
        </ol>
      </p>
      <Input.TextArea
        className='input-settings'
        size='large'
        disabled={disabled}
        value={exampleBody}
        rows={12}
      />
      <p>
        Envie a requisição. Em caso de sucesso, o corpo da resposta terá o mesmo
        formato do corpo da requisição. Consulte a{' '}
        <a
          href='https://docs.seldon.io/projects/seldon-core/en/stable/workflow/github-readme.html#send-api-requests-to-your-deployed-model'
          target='_blank'
          rel='noreferrer'
        >
          documentação do Seldon Core
        </a>{' '}
        para mais detalhes.
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
  exampleBody: `
  {
    "data": {
          "ndarray": [
              [...]
          ]
    }
  }`,
  disabled: true,
};

export default ExternalDatasetHelperModal;
