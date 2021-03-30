// REACT LIBS
import React from 'react';
import PropTypes from 'prop-types';

import './styles.less';

// UI LIBS
import { Result } from 'antd';

import loadingImage from 'assets/loading_jupyter.gif';

/**
 * Renders an animation while some content is loading.
 */
const PreloadAnimation = (props) => {
  const { remainingSeconds } = props;
  let message = '';
  if (remainingSeconds === 0) {
    message = 'Verificando se já está pronto...';
  } else {
    message = 'Aguarde, o JupyterLab está sendo preparado...';
  }
  return (
    <div className='contentPage'>
      <Result
        icon={
          <img
            src={loadingImage}
            alt='Animação de carregamento. Um desenho de trator passando pelo campo, enquanto ao fundo aparecem estrelas e nuvens'
          />
        }
        title={
          <>
            {message}
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

// PROP TYPES
PreloadAnimation.propTypes = {
  remainingSeconds: PropTypes.number.isRequired,
};

// EXPORT DEFAULT
export default PreloadAnimation;
