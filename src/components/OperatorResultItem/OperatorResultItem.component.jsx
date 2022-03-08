import React from 'react';
import { Card } from 'antd';
import PropTypes from 'prop-types';
import { withResizeDetector } from 'react-resize-detector';

import { PlotResult } from 'components';

import OperatorResultItemTitle from './OperatorResultItemTitle';

import './OperatorResult.less';
import { BrainPlaceholderComponent } from 'assets';

const OperatorResultItem = ({
  cardId,
  figures,
  isSelected,
  selectedFigure,
  handleSelectResult,
  handleRemoveFigure,
  handleSelectFigure,
}) => {
  const figure =
    selectedFigure || selectedFigure === 0 ? figures[selectedFigure] : null;

  return (
    <Card
      className='operator-result-item'
      title={
        <OperatorResultItemTitle
          cardId={cardId}
          figures={figures}
          isSelected={isSelected}
          selectedFigure={selectedFigure}
          handleSelectFigure={handleSelectFigure}
          handleSelectResult={handleSelectResult}
          handleRemoveFigure={handleRemoveFigure}
        />
      }
    >
      {figure ? (
        <div className='operator-result-item-scroll-img'>
          <PlotResult
            plotImageClassName='operator-result-item-plot-image'
            plotUrl={figure.plotUrl}
          />
        </div>
      ) : (
        <div className='operator-result-item-placeholder'>
          <BrainPlaceholderComponent />
        </div>
      )}
    </Card>
  );
};

OperatorResultItem.propTypes = {
  cardId: PropTypes.string.isRequired,
  figures: PropTypes.array.isRequired,
  isSelected: PropTypes.bool.isRequired,
  selectedFigure: PropTypes.number,
  handleRemoveFigure: PropTypes.func.isRequired,
  handleSelectResult: PropTypes.func.isRequired,
  handleSelectFigure: PropTypes.func.isRequired,
};

OperatorResultItem.defaultProps = {
  selectedFigure: undefined,
};

export default withResizeDetector(OperatorResultItem);
