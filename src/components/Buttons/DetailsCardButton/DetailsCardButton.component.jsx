import PropTypes from 'prop-types';
import React, { useState, useMemo } from 'react';
import { Image, Skeleton, Tooltip } from 'antd';

import experimentacao from 'assets/experimentacao.svg';
import fluxo from 'assets/fluxo.svg';
import experimentacaoHover from 'assets/experimentacaoHover.svg';
import fluxoHover from 'assets/fluxoHover.svg';

import './DetailsCardButton.style.less';

const DetailsCardButton = ({ onClick, projectLoading, numberText, type }) => {
  const [buttonIsHovered, setButtonIsHovered] = useState(false);

  const buttonType = {
    deployment: {
      imageHovered: fluxoHover,
      image: fluxo,
      classImage: 'cardsImage fluxoImage',
      classText: 'cardsText fluxoText',
      textType: 'fluxo(s)',
      tooltipText: 'Não existem fluxos de pré-implantação',
    },
    experiment: {
      imageHovered: experimentacaoHover,
      image: experimentacao,
      classImage: 'cardsImage experimentacaoImage',
      classText: 'cardsText experimentacaoText',
      textType: 'experimento(s)',
      tooltipText: 'Não existem fluxos de experimentação',
    },
  };

  const handleMouseEnter = () => {
    setButtonIsHovered(true);
  };

  const handleMouseLeave = () => {
    setButtonIsHovered(false);
  };

  const hasProjects = useMemo(() => numberText > 0, [numberText]);

  const cardsClass = useMemo(
    () => (!hasProjects || projectLoading ? 'cards' : 'cards active'),
    [hasProjects, projectLoading]
  );

  return (
    <Tooltip
      title={buttonType[type].tooltipText}
      placement='bottomRight'
      color='black'
      trigger={hasProjects || projectLoading ? '' : 'hover'}
    >
      <button
        className={cardsClass}
        onClick={onClick}
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
