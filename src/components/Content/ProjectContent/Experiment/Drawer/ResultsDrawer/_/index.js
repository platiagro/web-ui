// CORE LIBS
import React from 'react';
import PropTypes from 'prop-types';

// UI LIBS
import { Divider, Spin, Icon } from 'antd';

// COMPONENTS
import TagResult from '../TagResult';
import TableResult from '../TableResult';
import PlotResult from '../PlotResult';

// RESULTS TYPES
const resultsTypes = {
  // tag
  tag: ({ uuid, ...props }) => <TagResult key={uuid} {...props} />,
  // table
  table: ({ uuid, ...props }) => <TableResult key={uuid} {...props} />,
  // plot
  plot: ({ uuid, ...props }) => <PlotResult key={uuid} {...props} />,
};

/**
 * Results Drawer.
 * This component is responsible for displaying drawer with results.
 */
const ResultsDrawer = ({ results, loading }) => (
  // div container
  <div>
    {/* is loading */}
    {loading ? (
      // loading
      <Spin indicator={<Icon type='loading' spin />} />
    ) : (
      /* rendering results */
      results.map((result) => (
        // div result container
        <div key={result.uuid}>
          {/* rendering result */}
          {resultsTypes[result.type](result)}
          {/* rendering divider */}
          <Divider />
        </div>
      ))
    )}
  </div>
);

// PROP TYPES
ResultsDrawer.propTypes = {
  /** results drawer results list */
  results: PropTypes.arrayOf(PropTypes.object).isRequired,
  /** results drawer results list */
  results: PropTypes.arrayOf(PropTypes.object).isRequired,
};

// EXPORT
export default ResultsDrawer;
