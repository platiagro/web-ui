import React from 'react';
import { Skeleton } from 'antd';
import PropTypes from 'prop-types';

import { MARKETPLACE_LIST_TYPE } from './MarketplaceSearchConfigs';

const MarketplaceSearchTasksSkeleton = ({ listType }) => {
  const itemClass = `marketplace-search-results-skeletons-skeleton--${listType}`;
  const itemClassLowerCase = itemClass.toLowerCase();

  return (
    <div className='marketplace-search-results-skeletons'>
      <Skeleton.Button className={itemClassLowerCase} active />
      <Skeleton.Button className={itemClassLowerCase} active />
      <Skeleton.Button className={itemClassLowerCase} active />
      <Skeleton.Button className={itemClassLowerCase} active />
    </div>
  );
};

MarketplaceSearchTasksSkeleton.propTypes = {
  listType: PropTypes.oneOf(Object.values(MARKETPLACE_LIST_TYPE)),
};

MarketplaceSearchTasksSkeleton.defaultProps = {
  listType: MARKETPLACE_LIST_TYPE.GRID,
};

export default MarketplaceSearchTasksSkeleton;
