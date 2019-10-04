/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/prop-types */
import React from 'react';
import _ from 'lodash';
import './style.scss';
import { ArcherContainer, ArcherElement } from 'react-archer';
import CardTask from './CardTask';

class ExperimentFlow extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      // dataSelected: false,
      selected: {
        conjunto_dados: false,
        atributos_tempo: false,
        pre_selecao1: false,
        atributos_genericos: false,
        pre_selecao2: false,
        filtro_atributos: false,
        automl: false,
      },
    };
  }

  handleClick = (task) => {
    const { selected } = this.state;
    let newSelected = { ...selected };
    newSelected = _.mapValues(selected, (value, key) => {
      if (key === task) return !value;
      return false;
    });

    this.setState({ selected: newSelected });
  };

  render() {
    // eslint-disable-next-line no-unused-vars
    const { selected } = this.state;
    return (
      <ArcherContainer strokeColor='gray'>
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
                taskClick={this.handleClick}
                title='Conjunto de dados'
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
                taskClick={this.handleClick}
                title='Criação de atributos por tempo'
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
                taskClick={this.handleClick}
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
                taskClick={this.handleClick}
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
                taskClick={this.handleClick}
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
                taskClick={this.handleClick}
                title='Filtro de atributos'
              />
            </ArcherElement>
          </div>

          <div className='item automl'>
            <ArcherElement id='automl'>
              <CardTask
                task='automl'
                selected={selected.automl}
                taskClick={this.handleClick}
                title='AutoML'
              />
            </ArcherElement>
          </div>
        </div>
      </ArcherContainer>
    );
  }
}

// ExperimentFlow.propTypes = {
//   details: PropTypes.shape({
//     experimentsList: PropTypes.array,
//     projectName: PropTypes.string,
//   }).isRequired,
// };

export default ExperimentFlow;
