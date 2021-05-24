import React from 'react';
import { Input } from 'antd';
import PropTypes from 'prop-types';
import { SearchOutlined } from '@ant-design/icons';

const TasksMenuSearch = ({ handleFilter }) => {
  const handleChange = (e) => {
    e.preventDefault();
    handleFilter(e.currentTarget.value);
  };

  return (
    <div
      style={{
        padding: '10px 16px',
        border: '1px solid #ddd',
      }}
    >
      <Input
        placeholder='Pesquisar'
        allowClear
        onChange={handleChange}
        prefix={<SearchOutlined />}
      />
    </div>
  );
};

TasksMenuSearch.propTypes = {
  handleFilter: PropTypes.func.isRequired,
};

export default TasksMenuSearch;
