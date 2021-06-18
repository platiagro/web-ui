import React from 'react';
import { Empty } from 'antd';

import emptyImage from 'assets/emptyPlaceholder.png';

const ExperimentEmpty = () => (
  <Empty
    imageStyle={{ height: 136 }}
    image={emptyImage}
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

export default ExperimentEmpty;
