// CORE LIBS
import React from 'react';
import PropTypes from 'prop-types';

// UI LIBS
import { Divider } from 'antd';

// COMPONENTS
import TagResult from '../TagResult';

// RESULTS TYPES
const resultsTypes = {
  // tag
  tag: ({ uuid, ...props }) => <TagResult key={uuid} {...props} />,
};

/**
 * Results Drawer.
 * This component is responsible for displaying drawer with results.
 */
const ResultsDrawer = ({ results }) => (
  // div container
  <div>
    {/* rendering results */}
    {results.map((result) => (
      // div result container
      <div>
        {/* rendering result */}
        {resultsTypes[result.type](result)}
        {/* rendering divider */}
        <Divider />
      </div>
    ))}
  </div>
);

// EXPORT
export default ResultsDrawer;
