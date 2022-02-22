import React from 'react';
import { Card } from 'antd';
import PropTypes from 'prop-types';
import { withResizeDetector } from 'react-resize-detector';

import './OperatorResult.less';
import OperatorResultItemTitle from './OperatorResultItemTitle';

const OperatorResultItem = ({ onDelete, children }) => {
  return (
    <Card
      style={{
        height: '100%',
        margin: 0,
      }}
      title={<OperatorResultItemTitle onDelete={onDelete} />}
    >
      {children}
    </Card>
  );
};

OperatorResultItem.propTypes = {
  onDelete: PropTypes.func.isRequired,
  children: PropTypes.element.isRequired,
};

export default withResizeDetector(OperatorResultItem);
