import React from 'react';
import { Result } from 'antd';
import PropTypes from 'prop-types';

import { LoadingJupyter } from 'assets';

import './styles.less';

const PreloadAnimation = ({ remainingSeconds }) => {
  return (
    <div className='contentPage'>
      <Result
        icon={
          <img
            src={LoadingJupyter}
            alt='Animação de carregamento. Um desenho de trator passando pelo campo, enquanto ao fundo aparecem estrelas e nuvens'
          />
        }
        title={
          <>
            {remainingSeconds === 0
              ? 'Verificando se já está pronto...'
              : 'Aguarde, o JupyterLab está sendo preparado...'}
            <br />
            {remainingSeconds > 0 && (
              <span className='preload-description'>
                Próxima verificação em {remainingSeconds} segundos
              </span>
            )}
          </>
        }
      />
    </div>
  );
};

PreloadAnimation.propTypes = {
  remainingSeconds: PropTypes.number.isRequired,
};

export default PreloadAnimation;
