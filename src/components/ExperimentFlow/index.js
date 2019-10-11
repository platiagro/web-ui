/* eslint-disable react/no-unused-state */
/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';
import './style.scss';
import { ArcherContainer, ArcherElement } from 'react-archer';
import CardTask from './CardTask';

const ExperimentFlow = ({ selected, parameters, handleClick }) => {
  return (
    <ArcherContainer strokeColor='gray'>
      <div className='grid-wraper'>
        <div className='flow-container template-complete-automl'>
          <div className='item dados'>
            <ArcherElement
              id='dados'
              relations={[
                {
                  targetId: 'atributo-tempo',
                  targetAnchor: 'top',
                  sourceAnchor: 'bottom',
                },
              ]}
            >
              <CardTask
                selected={selected.conjunto_dados}
                task='conjunto_dados'
                taskClick={handleClick}
                title='Conjunto de dados'
                icon='database'
                params={
                  !!parameters.conjunto_dados.datasetId &&
                  !!parameters.conjunto_dados.target
                }
              />
            </ArcherElement>
          </div>

          <div className='item atributo-tempo'>
            <ArcherElement
              id='atributo-tempo'
              relations={[
                {
                  targetId: 'pre1',
                  targetAnchor: 'top',
                  sourceAnchor: 'bottom',
                },
              ]}
            >
              <CardTask
                task='atributos_tempo'
                selected={selected.atributos_tempo}
                taskClick={handleClick}
                title='Criação de atributos por tempo'
                params={
                  !_.isEmpty(parameters.atributos_tempo.group) &&
                  !!parameters.atributos_tempo.period
                }
              />
            </ArcherElement>
          </div>

          <div className='item pre1'>
            <ArcherElement
              id='pre1'
              relations={[
                {
                  targetId: 'atributo-gen',
                  targetAnchor: 'left',
                  sourceAnchor: 'right',
                },
              ]}
            >
              <CardTask
                task='pre_selecao1'
                selected={selected.pre_selecao1}
                taskClick={handleClick}
                title='Pré-seleção de atributos'
                params={
                  parameters.pre_selecao1.cutoff >= 0 &&
                  parameters.pre_selecao1.correlation >= 0
                }
              />
            </ArcherElement>
          </div>

          <div className='item atributo-gen'>
            <ArcherElement
              id='atributo-gen'
              relations={[
                {
                  targetId: 'pre2',
                  targetAnchor: 'bottom',
                  sourceAnchor: 'top',
                },
              ]}
            >
              <CardTask
                task='atributos_genericos'
                selected={selected.atributos_genericos}
                taskClick={handleClick}
                title='Criação de atributos genéricos'
                params={!_.isEmpty(parameters.atributos_tempo.group)}
              />
            </ArcherElement>
          </div>

          <div className='item pre2'>
            <ArcherElement
              id='pre2'
              relations={[
                {
                  targetId: 'filtro',
                  targetAnchor: 'bottom',
                  sourceAnchor: 'top',
                },
              ]}
            >
              <CardTask
                task='pre_selecao2'
                selected={selected.pre_selecao2}
                taskClick={handleClick}
                title='Pré-seleção de atributos'
                params={
                  parameters.pre_selecao2.cutoff >= 0 &&
                  parameters.pre_selecao2.correlation >= 0
                }
              />
            </ArcherElement>
          </div>

          <div className='item filtro'>
            <ArcherElement
              id='filtro'
              relations={[
                {
                  targetId: 'automl',
                  targetAnchor: 'left',
                  sourceAnchor: 'right',
                },
              ]}
            >
              <CardTask
                task='filtro_atributos'
                selected={selected.filtro_atributos}
                taskClick={handleClick}
                title='Filtro de atributos'
                params={!_.isEmpty(parameters.filtro_atributos)}
              />
            </ArcherElement>
          </div>

          <div className='item automl'>
            <ArcherElement id='automl'>
              <CardTask
                task='automl'
                selected={selected.automl}
                taskClick={handleClick}
                title='AutoML'
                icon='share-alt'
                iconTheme='outlined'
                params={!!parameters.automl.time}
              />
            </ArcherElement>
          </div>
        </div>
      </div>
    </ArcherContainer>
  );
};

ExperimentFlow.propTypes = {
  selected: PropTypes.objectOf(PropTypes.bool).isRequired,
  parameters: PropTypes.objectOf(PropTypes.any).isRequired,
  handleClick: PropTypes.func.isRequired,
};

export default ExperimentFlow;
