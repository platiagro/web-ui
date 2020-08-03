// CORE LIBS
import React from 'react';

// UI LIBS
import { Empty } from 'antd';

// IMAGES
import emptyImage from '../../../../assets/emptyPlaceholder.png';

/**
 * Implanted Experiments Empty.
 * This component is responsible for displaying a implanted experiments empty message.
 */
const ImplantedExperimentsEmpty = () => (
  // empty component
  <Empty
    image={emptyImage}
    imageStyle={{
      height: 136,
    }}
    description={
      <span>
        <span>
          <strong>Nenhum fluxo foi implantado</strong>
        </span>
        <br />
        <span>Implante um experimento para começar</span>
      </span>
    }
  />
);

// EXPORT
export default ImplantedExperimentsEmpty;
