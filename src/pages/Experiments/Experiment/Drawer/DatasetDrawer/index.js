import React, { useMemo } from 'react';
import PropTypes from 'prop-types';

import {
  DataViewButtonContainer,
  DatasetUploadInputBlockContainer,
} from 'containers';
import { PropertyBlock } from 'components';

const DatasetDrawer = ({ columns }) => {
  const showDataViewButton = useMemo(() => {
    return !!columns && columns.length > 0;
  }, [columns]);

  return (
    <div>
      <DatasetUploadInputBlockContainer />

      {showDataViewButton && (
        <PropertyBlock>
          <DataViewButtonContainer />
        </PropertyBlock>
      )}
    </div>
  );
};

DatasetDrawer.propTypes = {
  columns: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default DatasetDrawer;
