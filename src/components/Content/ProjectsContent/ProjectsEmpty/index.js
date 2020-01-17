// CORE LIBS
import React from 'react';

// UI LIBS
import { Empty } from 'antd';

// IMAGES
import emptyImage from '../../../../assets/emptyPlaceholder.png';

/**
 * Projects Empty.
 * This component is responsible for displaying a projects empty message.
 */
const ProjectsEmpty = () => (
  // empty component
  <Empty
    image={emptyImage}
    imageStyle={{
      height: 136,
    }}
    description={
      <span>
        <span>
          <strong>Nenhum projeto foi criado</strong>
        </span>
        <br />
        <span>Clique no botão &quot;Novo Projeto&quot; para começar</span>
      </span>
    }
  />
);

// EXPORT
export default ProjectsEmpty;
