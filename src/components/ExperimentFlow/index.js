/* eslint-disable react/no-unused-state */
/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';
import './style.scss';
import { ArcherContainer, ArcherElement } from 'react-archer';
import CardTask from './CardTask';

const ExperimentFlow = ({
  details,
  selected,
  parameters,
  handleClick,
  taskStatus,
}) => {
  const AutomlComplete = () => (
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
                condition={taskStatus.conjunto_dados}
                params={
                  !!parameters.conjunto_dados.datasetId &&
                  Boolean(
                    parameters.conjunto_dados.target &&
                      parameters.conjunto_dados.target.trim()
                  )
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
                condition={taskStatus.atributos_tempo}
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
                condition={taskStatus.pre_selecao1}
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
                condition={taskStatus.atributos_genericos}
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
                condition={taskStatus.pre_selecao2}
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
                condition={taskStatus.filtro_atributos}
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
                condition={taskStatus.automl}
                params={!!parameters.automl.time}
              />
            </ArcherElement>
          </div>
        </div>
      </div>
    </ArcherContainer>
  );

  const AutomlSimple = () => (
    <ArcherContainer strokeColor='gray'>
      <div className='grid-wraper'>
        <div className='flow-container template-simple-automl'>
          <div className='item dados'>
            <ArcherElement
              id='dados'
              relations={[
                {
                  targetId: 'filtro',
                  targetAnchor: 'left',
                  sourceAnchor: 'right',
                },
              ]}
            >
              <CardTask
                selected={selected.conjunto_dados}
                task='conjunto_dados'
                taskClick={handleClick}
                title='Conjunto de dados'
                condition={taskStatus.conjunto_dados}
                icon='database'
                params={
                  !!parameters.conjunto_dados.datasetId &&
                  Boolean(
                    parameters.conjunto_dados.target &&
                      parameters.conjunto_dados.target.trim()
                  )
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
                condition={taskStatus.filtro_atributos}
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
                condition={taskStatus.automl}
                params={!!parameters.automl.time}
              />
            </ArcherElement>
          </div>
        </div>
      </div>
    </ArcherContainer>
  );

  const switchTemplate = (type) => {
    switch (type) {
      case 'AutoML':
        return <AutomlSimple />;
      case 'AutoFeaturing + Linear Regression/Logistic Regression':
        return <div>AutoFeaturing + Linear Regression/Logistic Regression</div>;
      case 'AutoFeaturing + AutoML':
        return <AutomlComplete />;
      case 'Linear Regression/Logistic Regression':
        return <div>Linear Regression/Logistic Regression</div>;
      default:
        return null;
    }
  };
  return switchTemplate(details.template);
  // return details.pipelineIdTrain ? <AutomlComplete /> : null;
};

ExperimentFlow.propTypes = {
  selected: PropTypes.objectOf(PropTypes.bool).isRequired,
  parameters: PropTypes.objectOf(PropTypes.any).isRequired,
  handleClick: PropTypes.func.isRequired,
};

export default ExperimentFlow;
