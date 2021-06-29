import React from 'react';
import { Empty } from 'antd';

import { EmptyPlaceholderImage } from 'assets';

const ExperimentEmpty = () => (
  <Empty
    imageStyle={{ height: 136 }}
    image={EmptyPlaceholderImage}
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
