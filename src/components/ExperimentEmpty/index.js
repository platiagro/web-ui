// CORE LIBS
import React from 'react';

// UI LIBS
import { Empty } from 'antd';

// IMAGES
import emptyImage from 'assets/emptyPlaceholder.png';

/**
 * Experiment Empty.
 * This component is responsible for displaying a experiment empty message.
 */
const ExperimentEmpty = () => (
  // empty component
  <Empty
    image={emptyImage}
    imageStyle={{
      height: 136,
    }}
    description={
      <span>
        <span>
          <strong>Nenhum experimento selecionado</strong>
        </span>
        <br />
        <span>Crie ou selecione um experimento para começar</span>
      </span>
    }
  />
);

// EXPORT
export default ExperimentEmpty;
