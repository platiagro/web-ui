import React from 'react';

import experimentationIcon from 'assets/experimentationIcon.svg';
import preImplantationIcon from 'assets/preImplantationIcon.svg';

import './styles.less';

const ProjectEmptyPlaceholder = () => {
  return (
    <div className='projectEmptyPlaceholderContainer'>
      <div className='projectEmptyPlaceholder'>
        <h3>Projeto vazio</h3>

        <p>
          Para começar, clique em <strong>Novo Fluxo</strong> e escolha um dos
          tipos:
        </p>

        <div className='infoBlock'>
          <div className='imgBlock experimentationIcon'>
            <img src={experimentationIcon} alt='experimentação' />
          </div>
          <h4>
            <strong>Experimentação</strong>
          </h4>
          <p>
            Experimente fluxos de tarefas, seja para o treinamento de modelos ou
            visualização de resultados. Após experimentar diferentes fluxos é
            possível decidir quais deles seguirão para o módulo de
            pré-implantação.
          </p>
        </div>

        <div className='infoBlock'>
          <div className='imgBlock'>
            <img src={preImplantationIcon} alt='pré-implantação' />
          </div>
          <h4>
            <strong>Pré-implantação</strong>
          </h4>

          <p>
            Crie fluxos com tarefas previamente preparadas e disponibilizadas no
            “armazém de tarefas”. Implante o fluxo escolhido.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProjectEmptyPlaceholder;
