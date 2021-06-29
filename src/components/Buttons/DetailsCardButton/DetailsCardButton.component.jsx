import React, { useState, useMemo } from 'react';
import { Image, Skeleton, Tooltip } from 'antd';
import PropTypes from 'prop-types';

import { Flow, FlowHover, Experimentation, ExperimentationHover } from 'assets';

import './DetailsCardButton.style.less';

const buttonType = {
  deployment: {
    imageHovered: FlowHover,
    image: Flow,
    classImage: 'cardsImage fluxoImage',
    classText: 'cardsText fluxoText',
    textType: 'fluxo(s)',
    tooltipText: 'Não existem fluxos de pré-implantação',
  },
  experiment: {
    imageHovered: ExperimentationHover,
    image: Experimentation,
    classImage: 'cardsImage experimentacaoImage',
    classText: 'cardsText experimentacaoText',
    textType: 'experimento(s)',
    tooltipText: 'Não existem fluxos de experimentação',
  },
};

const DetailsCardButton = ({ onClick, projectLoading, numberText, type }) => {
  const [buttonIsHovered, setButtonIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setButtonIsHovered(true);
  };

  const handleMouseLeave = () => {
    setButtonIsHovered(false);
  };

  const hasProjects = useMemo(() => {
    return numberText > 0;
  }, [numberText]);

  const cardsClass = useMemo(() => {
    return !hasProjects || projectLoading ? 'cards' : 'cards active';
  }, [hasProjects, projectLoading]);

  return (
    <Tooltip
      trigger={hasProjects || projectLoading ? '' : 'hover'}
      title={buttonType[type].tooltipText}
      placement='bottomRight'
      color='black'
    >
      <button
        onClick={onClick}
        className={cardsClass}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div className={buttonType[type].classImage}>
          {buttonIsHovered && hasProjects && !projectLoading ? (
            <Image width={50} src={buttonType[type].imageHovered} />
          ) : (
            <Image width={50} src={buttonType[type].image} />
          )}
        </div>

        <div className={buttonType[type].classText}>
          {projectLoading ? (
            <Skeleton active />
          ) : (
            <>
              <span>{numberText}</span>
              {buttonType[type].textType}
            </>
          )}
        </div>
      </button>
    </Tooltip>
  );
};

DetailsCardButton.propTypes = {
  numberText: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  projectLoading: PropTypes.bool.isRequired,
  type: PropTypes.string,
};

DetailsCardButton.defaultProps = {
  type: 'experiment',
};

export default DetailsCardButton;
