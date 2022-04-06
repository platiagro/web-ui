import React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router';
import { Typography, Select, Button } from 'antd';
import {
  TableOutlined,
  ShoppingOutlined,
  UnorderedListOutlined,
} from '@ant-design/icons';

import { MarketplaceTaskItem, Placeholder } from 'components';

import {
  MARKETPLACE_LIST_TYPE,
  MARKETPLACE_LIST_ORDER,
} from './MarketplaceSearchConfigs';
import MarketplaceSearchTasksSkeleton from './MarketplaceSearchTasksSkeleton';

const MarketplaceSearchResults = ({
  tasks,
  listType,
  listOrder,
  searchText,
  isSearchingTasks,
  handleChangeListType,
  handleChangeListOrder,
}) => {
  const history = useHistory();

  return (
    <div className='marketplace-search-results'>
      <div className='marketplace-search-results-header'>
        <div className='marketplace-search-results-header-total'>
          <Typography.Text>{tasks.length}</Typography.Text>
          <Typography.Text>
            {tasks.length === 1 ? 'Resultado' : 'Resultados'}
          </Typography.Text>
        </div>

        <div className='marketplace-search-results-header-options'>
          <Typography.Text>Mostrar Primeiro:</Typography.Text>

          <Select
            value={listOrder}
            onChange={handleChangeListOrder}
            placeholder='Selecione a ordem de exibição'
          >
            <Select.Option value={MARKETPLACE_LIST_ORDER.NEWER}>
              Mais recentes
            </Select.Option>

            <Select.Option value={MARKETPLACE_LIST_ORDER.OLDER}>
              Mais antigos
            </Select.Option>
          </Select>

          <Button shape='round' onClick={handleChangeListType}>
            {listType === MARKETPLACE_LIST_TYPE.LIST ? (
              <TableOutlined />
            ) : (
              <UnorderedListOutlined />
            )}

            <span>
              {listType === MARKETPLACE_LIST_TYPE.LIST
                ? 'Ver como grid'
                : 'Ver como lista'}
            </span>
          </Button>
        </div>
      </div>

      {!!searchText?.trim() && (
        <div className='marketplace-search-results-search-text'>
          <Typography.Text>
            Busca por: <q>{searchText}</q>
          </Typography.Text>
        </div>
      )}

      {isSearchingTasks ? (
        <MarketplaceSearchTasksSkeleton listType={listType} />
      ) : (
        <>
          <div className='marketplace-search-results-tasks'>
            {tasks.map((task) => {
              const itemClass = `marketplace-search-results-tasks-task--${listType}`;

              const handleSeeTask = () => {
                history.push(`/marketplace/tarefas/${task.uuid}`);
              };

              return (
                <MarketplaceTaskItem.Box
                  key={task.uuid}
                  onClick={handleSeeTask}
                  taskCategory={task.category}
                  className={itemClass.toLowerCase()}
                  header={
                    <MarketplaceTaskItem.Header
                      name={task.author.name}
                      userId={task.author.uuid}
                      imageSrc={task.author.img}
                      userName={task.author.userName}
                    />
                  }
                  footer={
                    <MarketplaceTaskItem.InlineData
                      taskType={task.type}
                      taskCategory={task.category}
                    />
                  }
                >
                  <MarketplaceTaskItem.Description>
                    {task.description}
                  </MarketplaceTaskItem.Description>
                </MarketplaceTaskItem.Box>
              );
            })}
          </div>

          {!tasks.length && (
            <Placeholder
              className='marketplace-search-results-empty'
              message='Nenhuma tarefa ou fluxo encontrado'
              iconComponent={<ShoppingOutlined />}
            />
          )}
        </>
      )}
    </div>
  );
};

MarketplaceSearchResults.propTypes = {
  tasks: PropTypes.array,
  listType: PropTypes.oneOf(Object.values(MARKETPLACE_LIST_TYPE)),
  listOrder: PropTypes.oneOf(Object.values(MARKETPLACE_LIST_ORDER)),
  searchText: PropTypes.string,
  isSearchingTasks: PropTypes.bool,
  handleChangeListType: PropTypes.func,
  handleChangeListOrder: PropTypes.func,
};

MarketplaceSearchResults.defaultProps = {
  tasks: [],
  listType: MARKETPLACE_LIST_TYPE.GRID,
  listOrder: MARKETPLACE_LIST_ORDER.NEWER,
  searchText: '',
  isSearchingTasks: false,
  handleChangeListType: null,
  handleChangeListOrder: null,
};

export default MarketplaceSearchResults;
