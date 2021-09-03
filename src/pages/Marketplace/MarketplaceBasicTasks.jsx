import React from 'react';
import { Button } from 'antd';

import { MarketplaceTaskItem } from 'components';

const MarketplaceBasicTasks = () => {
  return (
    <div className='marketplace-basic-tasks'>
      <div className='marketplace-basic-tasks-content'>
        <div className='marketplace-basic-tasks-title'>
          Na PlatIAgro, <strong>tarefas</strong> solucionam parte de um
          problema.
        </div>

        <div className='marketplace-basic-tasks-list'>
          {[1, 2, 3, 4].map((key) => {
            return (
              <MarketplaceTaskItem.Box
                key={key}
                taskCategory='DATASETS'
                header={
                  <MarketplaceTaskItem.Title>
                    Conjunto de dados
                  </MarketplaceTaskItem.Title>
                }
                footer={<Button shape='round'>Ver tarefas</Button>}
              >
                <MarketplaceTaskItem.Description>
                  Melhora a precisão dos modelos manipulando o conjunto de dados
                  que será utilizado por ele. As técnicas podem ser de aumento,
                  seleção ou transformação dos dados.
                </MarketplaceTaskItem.Description>
              </MarketplaceTaskItem.Box>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default MarketplaceBasicTasks;
