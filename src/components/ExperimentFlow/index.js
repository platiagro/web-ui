/* eslint-disable react/no-unused-state */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/prop-types */
import React from 'react';
import _ from 'lodash';
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
                  !_.isEmpty(parameters.atributos_tempo.period)
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
              />
            </ArcherElement>
          </div>
        </div>
      </div>
    </ArcherContainer>
  );
};

// ExperimentFlow.propTypes = {
//   details: PropTypes.shape({
//     experimentsList: PropTypes.array,
//     projectName: PropTypes.string,
//   }).isRequired,
// };

export default ExperimentFlow;
