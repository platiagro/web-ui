import React, { useLayoutEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';

import { useIsLoading } from 'hooks';

import MarketplaceAuthorHeader from './MarketplaceAuthorHeader';
import MarketplaceAuthorTasks from './MarketplaceAuthorTasks';
import MarketplaceAuthorInfo from './MarketplaceAuthorInfo';

import './MarketplaceAuthor.style.less';

const MarketplaceAuthor = () => {
  const { authorId } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();

  const author = {
    name: 'Plataforma de IA para o Agronegócio',
    userName: '@platiagro',
    uuid: 'abc-123',
    img: '',
  };

  const tasks = [
    {
      uuid: '1',
      name: 'Upload de arquivo',
      type: 'Tarefa',
      category: 'DATASETS',
      description: 'Faça o upload de arquivo para usar como dataset.',
    },
    {
      uuid: '2',
      name: 'Upload de arquivo',
      type: 'Tarefa',
      category: 'DATASETS',
      description: 'Faça o upload de arquivo para usar como dataset.',
    },
    {
      uuid: '3',
      name: 'Upload de arquivo',
      type: 'Tarefa',
      category: 'DATASETS',
      description: 'Faça o upload de arquivo para usar como dataset.',
    },
    {
      uuid: '4',
      name: 'Upload de arquivo',
      type: 'Tarefa',
      category: 'DATASETS',
      description: 'Faça o upload de arquivo para usar como dataset.',
    },
  ];

  const isLoadingTasks = useIsLoading('tasks');
  const isLoadingAuthor = useIsLoading('author');

  const handleGoBack = () => {
    history.goBack();
  };

  useLayoutEffect(() => {
    if (authorId) {
      dispatch({ type: 'author', payload: { authorId } });
      dispatch({ type: 'tasks', payload: { authorId } });
    }

    return () => {
      dispatch({ type: 'clearAuthor' });
      dispatch({ type: 'clearTasks' });
    };
  });

  return (
    <div className='marketplace-author'>
      <MarketplaceAuthorHeader author={author} handleGoBack={handleGoBack} />

      <MarketplaceAuthorInfo
        author={author}
        numberOfFlows={1}
        numberOfTasks={2}
        isLoadingAuthor={isLoadingAuthor}
      />

      <MarketplaceAuthorTasks tasks={tasks} isLoadingTasks={isLoadingTasks} />
    </div>
  );
};

export default MarketplaceAuthor;
