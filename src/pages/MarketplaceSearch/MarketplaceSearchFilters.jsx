import React from 'react';
import PropTypes from 'prop-types';
import { Typography, Checkbox, Button } from 'antd';

import { MARKETPLACE_TASK_CATEGORIES } from 'configs';

const TASK_CATEGORIES_TO_FILTER = [
  MARKETPLACE_TASK_CATEGORIES.DATASETS,
  MARKETPLACE_TASK_CATEGORIES.FEATURE_ENGINEERING,
  MARKETPLACE_TASK_CATEGORIES.PREDICTOR,
  MARKETPLACE_TASK_CATEGORIES.DESCRIPTIVE_STATISTICS,
];

const FLOW_CATEGORIES_TO_FILTER = [
  MARKETPLACE_TASK_CATEGORIES.COMPUTER_VISION,
  MARKETPLACE_TASK_CATEGORIES.OPTIMIZATION,
  MARKETPLACE_TASK_CATEGORIES.OTHER,
];

const MarketplaceSearchFilters = ({
  filters,
  handleClearFilters,
  handleChangeFilters,
}) => {
  const mapCategoryToCheckbox = (category) => {
    const isChecked = !!filters[category.key];

    return (
      <Checkbox
        key={category.key}
        checked={isChecked}
        className='marketplace-search-filters-group-checkbox'
        onChange={(e) => handleChangeFilters(category.key, e.target.checked)}
      >
        {category.name}
      </Checkbox>
    );
  };

  return (
    <div className='marketplace-search-filters'>
      <div className='marketplace-search-filters-header'>
        <Typography.Text className='marketplace-search-filters-header-title'>
          Filtrar Por:
        </Typography.Text>

        <Button type='link' onClick={handleClearFilters}>
          Limpar Filtros
        </Button>
      </div>

      <div className='marketplace-search-filters-group'>
        <Typography.Title
          className='marketplace-search-filters-group-title'
          level={5}
        >
          TAREFAS
        </Typography.Title>

        {TASK_CATEGORIES_TO_FILTER.map(mapCategoryToCheckbox)}
      </div>

      <div className='marketplace-search-filters-group'>
        <Typography.Title
          className='marketplace-search-filters-group-title'
          level={5}
        >
          FLUXOS
        </Typography.Title>

        {FLOW_CATEGORIES_TO_FILTER.map(mapCategoryToCheckbox)}
      </div>
    </div>
  );
};

MarketplaceSearchFilters.propTypes = {
  filters: PropTypes.object,
  handleClearFilters: PropTypes.func,
  handleChangeFilters: PropTypes.func,
};

MarketplaceSearchFilters.defaultProps = {
  filters: {},
  handleClearFilters: null,
  handleChangeFilters: null,
};

export default MarketplaceSearchFilters;
