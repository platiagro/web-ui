import React from 'react';
import PropTypes from 'prop-types';
import { Typography, Checkbox, Button, Tag } from 'antd';

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
  tagsPerCategory,
  handleClearFilters,
  handleChangeTagFilters,
  handleChangeCategoryFilters,
}) => {
  const mapCategoryToCheckbox = (category) => {
    const isChecked = !!filters[category.key];

    const handleChange = (e) => {
      handleChangeCategoryFilters(category.key, e.target.checked);
    };

    return (
      <Checkbox
        key={category.key}
        checked={isChecked}
        onChange={handleChange}
        className='marketplace-search-filters-group-checkbox'
      >
        {category.name}
      </Checkbox>
    );
  };

  const mapCategoryToTags = (category) => {
    const isFilteringByThisCategory = !!filters[category.key];
    if (!isFilteringByThisCategory) return null;

    const tags = tagsPerCategory[category.key] || [];
    if (tags.length === 0) return null;

    return (
      <div key={category.key} className='marketplace-search-filters-group-tags'>
        <Typography.Paragraph strong>{category.name}</Typography.Paragraph>

        {tags.map((tag) => {
          const isChecked = !!filters?.tags?.includes(tag.name);

          const handleChangeTag = () => {
            handleChangeTagFilters(tag.name, isChecked);
          };

          return (
            <div
              key={tag.name}
              className='marketplace-search-filters-group-tags-tag'
            >
              <Tag.CheckableTag checked={isChecked} onChange={handleChangeTag}>
                {`${tag.name} (${tag.quantity})`}
              </Tag.CheckableTag>
            </div>
          );
        })}
      </div>
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
        {TASK_CATEGORIES_TO_FILTER.map(mapCategoryToTags)}
      </div>

      <div className='marketplace-search-filters-group'>
        <Typography.Title
          className='marketplace-search-filters-group-title'
          level={5}
        >
          FLUXOS
        </Typography.Title>

        {FLOW_CATEGORIES_TO_FILTER.map(mapCategoryToCheckbox)}
        {FLOW_CATEGORIES_TO_FILTER.map(mapCategoryToTags)}
      </div>
    </div>
  );
};

MarketplaceSearchFilters.propTypes = {
  filters: PropTypes.object,
  tagsPerCategory: PropTypes.object,
  handleClearFilters: PropTypes.func,
  handleChangeTagFilters: PropTypes.func,
  handleChangeCategoryFilters: PropTypes.func,
};

MarketplaceSearchFilters.defaultProps = {
  filters: {},
  tagsPerCategory: {},
  handleClearFilters: null,
  handleChangeTagFilters: null,
  handleChangeCategoryFilters: null,
};

export default MarketplaceSearchFilters;
