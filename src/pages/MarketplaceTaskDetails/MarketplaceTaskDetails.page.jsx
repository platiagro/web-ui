import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';

import MarketplaceTaskDetailsData from './MarketplaceTaskDetailsData';
import MarketplaceTaskDetailsHeader from './MarketplaceTaskDetailsHeader';
import MarketplaceTaskDetailsChanges from './MarketplaceTaskDetailsChanges';

import './MarketplaceTaskDetails.style.less';

const MarketplaceTaskDetails = () => {
  const { taskId } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();

  const handleGoBack = () => {
    history.goBack();
  };

  useEffect(() => {
    dispatch({ type: 'any', payload: taskId });
  }, [dispatch, taskId]);

  return (
    <div className='marketplace-task-details'>
      <MarketplaceTaskDetailsHeader handleGoBack={handleGoBack} />

      <div className='marketplace-task-details-content'>
        <MarketplaceTaskDetailsData
          taskData={{
            img: 'https://www.cpqd.com.br/wp-content/uploads/2020/07/ico-plat1-268x300.png',
            name: 'Random Forest Classifier',
            category: 'Treinamento',
            link: '/platiagro',
            author: 'Plataforma de IA para o Agronegócio',
            dataOut: 'Descrição dos dados de saída da tarefa.',
            dataIn:
              'Arquivo .csv com dados tabulares (um atributo por coluna), sem cabeçalho.  ',
            description:
              'A random forest is a meta estimator that fits a number of decision tree classifiers on various sub-samples of the dataset and uses averaging to improve the predictive accuracy and control over-fitting.',
            docs: 'https://github.com/',
            tags: ['cool', 'useful', 'task'],
          }}
        />

        <MarketplaceTaskDetailsChanges
          updatedAt='10/12/2020'
          changes={`Nesta versão foram corrigidos alguns erros e acrescentada uma funcionalidade:

- Correção do erro xyz que ocorria nos casos abc, def e ghi;
- Correção do erro xpto quando todos os dados de um atributo são nulos;
- Adicionado o parâmetros “asdf” para configuração na experimentação.`}
        />
      </div>
    </div>
  );
};

export default MarketplaceTaskDetails;
