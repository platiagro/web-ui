import React from 'react';
import PropTypes from 'prop-types';
import { Drawer } from 'antd';
import { ClearOutlined, FilterOutlined } from '@ant-design/icons';

const MonitoringDrawerItemFilters = ({
  filters,
  hasFilters,
  isShowingFilters,
  handleClearFilters,
  handleToggleFilters,
}) => {
  return (
    <Drawer
      className='monitoring-drawer-item-filters'
      visible={hasFilters && isShowingFilters}
      onClose={handleToggleFilters}
      getContainer={false}
      placement='right'
      mask={false}
      headerStyle={{
        padding: '0 0 0 16px',
        background: '#F5F5F5',
        height: '46px',
        display: 'flex',
        alignItems: 'center',
      }}
      footerStyle={{
        padding: '0',
      }}
      bodyStyle={{
        padding: '16px',
      }}
      drawerStyle={{
        border: '1px solid #f0f0f0',
        borderRight: 'none',
      }}
      title={
        <div className='monitoring-drawer-item-filters-title'>
          <FilterOutlined />
          <span>Filtrar Por</span>
        </div>
      }
      footer={
        <button
          className='monitoring-drawer-item-filters-footer'
          type='button'
          onClick={handleClearFilters}
        >
          <ClearOutlined />
          <span>Limpar Filtros</span>
        </button>
      }
    >
      <div className='monitoring-drawer-item-filters-content'>
        {!!filters && <span>Filters...</span>}
        <span>Filters...</span>
      </div>
    </Drawer>
  );
};

MonitoringDrawerItemFilters.propTypes = {
  filters: PropTypes.object,
  hasFilters: PropTypes.bool,
  isShowingFilters: PropTypes.bool,
  handleClearFilters: PropTypes.func,
  handleToggleFilters: PropTypes.func,
};

MonitoringDrawerItemFilters.defaultProps = {
  filters: undefined,
  hasFilters: false,
  isShowingFilters: false,
  handleClearFilters: undefined,
  handleToggleFilters: undefined,
};

export default MonitoringDrawerItemFilters;
