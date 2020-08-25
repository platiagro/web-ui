// REACT LIBS
import React from 'react';

// IMAGES
// experimentation icon
import experimentationIcon from 'assets/experimentationIcon.svg';
// pre implantation icon
import preImplantationIcon from 'assets/preImplantationIcon.svg';

// STYLES
import './ProjectEmptyPlaceholder.less';

/**
 * Project empty placeholder.
 *
 * @returns {ProjectEmptyPlaceholder} Component
 * @component
 * @example
 * return <ProjectEmptyPlaceholder />;
 */
const ProjectEmptyPlaceholder = () => {
  // rendering component
  return (
    <div className='projectEmptyPlaceholderContainer'>
      <div className='projectEmptyPlaceholder'>
        {/* title */}
        <h3>Projeto vazio</h3>
        {/* description */}
        <p>
          Para começar, clique em <strong>Novo Fluxo</strong> e escolha um dos
          tipos:
        </p>
        {/* experimentation description block */}
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
        {/* pre implantation description block */}
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

// EXPORT DEFAULT
export default ProjectEmptyPlaceholder;
