import React, { useLayoutEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';

import { useIsLoading } from 'hooks';
import { MARKETPLACE_TYPES } from 'store/marketplace';

import MarketplaceAuthorInfo from './MarketplaceAuthorInfo';
import MarketplaceAuthorTasks from './MarketplaceAuthorTasks';
import MarketplaceAuthorHeader from './MarketplaceAuthorHeader';

import './MarketplaceAuthor.style.less';

const FAKE_ARRAY = [];
const FAKE_OBJECT = {};

const getAuthorTasks = () => FAKE_ARRAY;
const getAuthorData = () => FAKE_OBJECT;

const MarketplaceAuthor = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { authorId } = useParams();

  const author = useSelector(getAuthorData);
  const tasks = useSelector(getAuthorTasks);

  const isLoadingTasks = useIsLoading(MARKETPLACE_TYPES.FETCH_TASKS);
  const isLoadingAuthor = useIsLoading(MARKETPLACE_TYPES.FETCH_TASKS);

  const handleGoBack = () => {
    history.goBack();
  };

  const handleSearch = (search) => {
    history.push({
      pathname: '/marketplace/tarefas',
      search: `?${new URLSearchParams({ search })}`,
    });
  };

  useLayoutEffect(() => {
    if (authorId) {
      dispatch({ type: 'tasks', payload: { authorId } });
      dispatch({ type: 'author', payload: { authorId } });
    }

    return () => {
      dispatch({ type: 'clearTasks' });
      dispatch({ type: 'clearAuthor' });
    };
  });

  return (
    <div className='marketplace-author'>
      <MarketplaceAuthorHeader
        author={author}
        handleGoBack={handleGoBack}
        handleSearch={handleSearch}
      />

      <MarketplaceAuthorInfo
        author={author}
        isLoadingAuthor={isLoadingAuthor}
        numberOfFlows={author.numberOfFlows}
        numberOfTasks={author.numberOfTasks}
        isLoading={isLoadingAuthor || isLoadingTasks}
      />

      <MarketplaceAuthorTasks tasks={tasks} isLoadingTasks={isLoadingTasks} />
    </div>
  );
};

export default MarketplaceAuthor;
