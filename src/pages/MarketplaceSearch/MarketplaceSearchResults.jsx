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

const MarketplaceSearchResults = ({
  tasks,
  listType,
  listOrder,
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
            <Select.Option value='new'>Mais recentes</Select.Option>
            <Select.Option value='old'>Mais antigos</Select.Option>
          </Select>

          <Button shape='round' onClick={handleChangeListType}>
            {listType === 'list' ? (
              <TableOutlined />
            ) : (
              <UnorderedListOutlined />
            )}

            <span>
              {listType === 'list' ? 'Ver como grid' : 'Ver como lista'}
            </span>
          </Button>
        </div>
      </div>

      <div className='marketplace-search-results-tasks'>
        {tasks.map((task) => {
          const handleSeeTask = () => {
            history.push(`/marketplace/tarefas/${task.uuid}`);
          };

          return (
            <MarketplaceTaskItem.Box
              key={task.uuid}
              onClick={handleSeeTask}
              taskCategory={task.category}
              className={`marketplace-search-results-tasks-task--${listType}`}
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

        {!tasks.length && (
          <Placeholder
            className='marketplace-search-results-tasks-empty'
            message='Nenhuma tarefa ou fluxo encontrado'
            iconComponent={<ShoppingOutlined />}
          />
        )}
      </div>
    </div>
  );
};

MarketplaceSearchResults.propTypes = {
  tasks: PropTypes.array,
  listType: PropTypes.oneOf(['list', 'grid']),
  listOrder: PropTypes.oneOf(['new', 'old']),
  handleChangeListType: PropTypes.func,
  handleChangeListOrder: PropTypes.func,
};

MarketplaceSearchResults.defaultProps = {
  tasks: [],
  listType: 'grid',
  listOrder: 'new',
  handleChangeListType: null,
  handleChangeListOrder: null,
};

export default MarketplaceSearchResults;
