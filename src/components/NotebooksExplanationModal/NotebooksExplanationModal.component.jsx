import React from 'react';
import { Modal } from 'antd';
import PropTypes from 'prop-types';

const NotebooksExplanationModal = ({ isShowingModal, handleHideModal }) => {
  return (
    <Modal
      bodyStyle={{ padding: '24px', textAlign: 'justify' }}
      wrapClassName='notebooks-explanation-modal'
      okText='Ok'
      footer={null}
      onOk={handleHideModal}
      visible={isShowingModal}
      onCancel={handleHideModal}
      title={<strong>Saiba Mais Sobre Notebooks</strong>}
      centered
    >
      <h2>O que são Notebooks</h2>

      <p>
        Um Notebook é um documento virtual que permite a execução de códigos de
        uma linguagem de programação com ferramentas para edição de textos. Com
        ele, o usuário também pode documentar todo o processo de produção do
        código. Com tudo isso, o Notebook oferece uma maneira interativa e
        dinâmica de se programar, possibilitando que o usuário visualize o
        output imediato do código que acabou de escrever, não havendo, assim, a
        necessidade de compilar ou executar todo o documento.
      </p>

      <h2>Jupyter</h2>

      <p>
        O Jupyter Notebook é um interface gráfica que permite a edição de
        Notebooks em um navegador web, como Google Chrome ou Firefox. O nome
        Jupyter é um acrônimo criado a partir das linguagens de programação que
        inicialmente foram aceitas pelo Projeto Jupyter: Julia, Python e R. O
        Projeto Jupyter suporta também C++, Ruby, Fortran e outras.
      </p>
    </Modal>
  );
};

NotebooksExplanationModal.propTypes = {
  isShowingModal: PropTypes.bool.isRequired,
  handleHideModal: PropTypes.func.isRequired,
};

export default NotebooksExplanationModal;
