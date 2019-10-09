/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/prop-types */
import React from 'react';
import _ from 'lodash';
import './style.scss';
import { ArcherContainer, ArcherElement } from 'react-archer';
import { Button } from 'antd';
import CardTask from './CardTask';
import MainDrawer from '../MainDrawer';
import GenericAttributeCreationDrawerContent from '../GenericAttributeCreationDrawerContent';
import AttributeFilterDrawerContent from '../AttributeFilterDrawerContent';
import AttributePreSelectionDrawerContent from '../AttributePreSelectionDrawerContent';
import AutoMLDrawerContent from '../AutoMLDrawerContent';
import DataSetDrawerContent from '../DataSetDrawerContent';
import TimeAttributeCreationDrawerContent from '../TimeAttributeCreationDrawerContent';

class ExperimentFlow extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selected: {
        conjunto_dados: false,
        atributos_tempo: false,
        pre_selecao1: false,
        atributos_genericos: false,
        pre_selecao2: false,
        filtro_atributos: false,
        automl: false,
      },
      demoStateData: '',
      dataSet: {
        // data types
        // Categorical
        // Numerical
        // Datetime
        columns: [
          {
            uuid: 'aa7f1ad9-9e3e-471c-9ce6-8fb8f2a14105',
            headerId: 'ecaf9299-cfda-46d8-887e-31dd10a2907f',
            name: 'DATA',
            datatype: 'DateTime',
            position: 0,
          },
          {
            uuid: '73f243d8-ad20-4801-bf0f-1e3d77dcfaf8',
            headerId: 'ecaf9299-cfda-46d8-887e-31dd10a2907f',
            name: 'Item_Name',
            datatype: 'factor',
            position: 1,
          },
          {
            uuid: '3d2dbe98-c7f1-48d1-b6d9-0467f9b92d4a',
            headerId: 'ecaf9299-cfda-46d8-887e-31dd10a2907f',
            name: 'price_alvo',
            datatype: 'numeric',
            position: 2,
          },
          {
            uuid: 'b1be9744-5253-4394-a90b-a8b9418098fe',
            headerId: 'ecaf9299-cfda-46d8-887e-31dd10a2907f',
            name: 'cotacao_dolar',
            datatype: 'numeric',
            position: 3,
          },
          {
            uuid: 'ce138be2-976f-477d-a6d1-daee466490db',
            headerId: 'ecaf9299-cfda-46d8-887e-31dd10a2907f',
            name: 'Producao_estimada',
            datatype: 'numeric',
            position: 4,
          },
          {
            uuid: 'cb39498c-930e-40d9-952c-6fc071acc0c9',
            headerId: 'ecaf9299-cfda-46d8-887e-31dd10a2907f',
            name: 'Producao_perdida_ciclo_anterior_por_doenca_ou_praga',
            datatype: 'numeric',
            position: 5,
          },
          {
            uuid: '3b15eb83-b312-4a3a-b9a1-fd756e4b5065',
            headerId: 'ecaf9299-cfda-46d8-887e-31dd10a2907f',
            name: 'Inflacao_acumulada_mensal',
            datatype: 'numeric',
            position: 6,
          },
          {
            uuid: 'ab4f07a4-66a2-4cc3-94d1-02a5aaa23432',
            headerId: 'ecaf9299-cfda-46d8-887e-31dd10a2907f',
            name: 'Temperatura_media',
            datatype: 'numeric',
            position: 7,
          },
          {
            uuid: '1c98892b-9e52-44b5-a0d4-d7db4f8fe2e8',
            headerId: 'ecaf9299-cfda-46d8-887e-31dd10a2907f',
            name: 'Chuvaem_mm',
            datatype: 'numeric',
            position: 8,
          },
          {
            uuid: 'edf112fa-2e4c-49cd-bb0d-e8ba79ef6374',
            headerId: 'ecaf9299-cfda-46d8-887e-31dd10a2907f',
            name: 'Probabilidade_de_precipitacao',
            datatype: 'numeric',
            position: 9,
          },
          {
            uuid: '951e1239-4d59-4a56-97f3-af6f09586b30',
            headerId: 'ecaf9299-cfda-46d8-887e-31dd10a2907f',
            name: 'Niveis_de_conforto_em_umidade',
            datatype: 'numeric',
            position: 10,
          },
          {
            uuid: 'd26dbe8f-5d5f-4f4d-9baa-3f4b4d8020d6',
            headerId: 'ecaf9299-cfda-46d8-887e-31dd10a2907f',
            name: 'cotacao_rub_ind',
            datatype: 'numeric',
            position: 11,
          },
          {
            uuid: 'd8d3598b-2737-4712-906f-ae7cc0e1f663',
            headerId: 'ecaf9299-cfda-46d8-887e-31dd10a2907f',
            name: 'defensivos_unidade_hc',
            datatype: 'numeric',
            position: 12,
          },
        ],
        pipeline_spec: {
          parameters: [
            {
              name: 'experiment-id',
              value: 'autofeaturing-automl/fruits',
            },
            {
              name: 'bucket',
              value: 'mlpipeline',
            },
            {
              name: 'csv',
              value: 'Fruit_India_v3.csv',
            },
            {
              name: 'txt',
              value: 'fruits.txt',
            },
            {
              name: 'target',
              value: 'price_alvo',
            },
            {
              name: 'date',
              value: 'DATA',
            },
            {
              name: 'date-format',
              value: '%Y-%m-%d',
            },
            {
              name: 'feature-temporal-group',
              value: 'Item_Name',
            },
            {
              name: 'feature-temporal-period',
              value: 'month',
            },
            {
              name: 'preselection-1-na-cutoff',
              value: '0.1',
            },
            {
              name: 'preselection-1-correlation-cutoff',
              value: '0.7',
            },
            {
              name: 'feature-tools-group',
              value: 'Item_Name',
            },
            {
              name: 'preselection-2-na-cutoff',
              value: '0.1',
            },
            {
              name: 'preselection-2-correlation-cutoff',
              value: '0.7',
            },
            {
              name: 'filter-columns',
              value: 'DATA',
            },
            {
              name: 'automl-time-limit',
              value: '300',
            },
          ],
          pipeline_id: {
            training: 'e96a10ef-e81b-4391-ada7-7c90ace6a6c6',
            deployment: 'e96a10ef-e81b-4391-ada7-7c90ace6a6c6',
          },
        },
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

  handleClose = () => {
    const { selected } = this.state;
    this.setState({ selected: _.mapValues(selected, () => false) });
  };

  openDrawer = () => {
    const { selected } = this.state;
    return _.indexOf(Object.values(selected), true) !== -1;
  };

  switchDrawer = () => {
    const { selected } = this.state;
    if (selected.conjunto_dados) {
      return <DataSetDrawerContent />;
    }
    if (selected.atributos_tempo) {
      return <TimeAttributeCreationDrawerContent />;
    }
    if (selected.pre_selecao1) {
      return <AttributePreSelectionDrawerContent />;
    }
    if (selected.atributos_genericos) {
      return <GenericAttributeCreationDrawerContent />;
    }
    if (selected.pre_selecao2) {
      return <AttributePreSelectionDrawerContent />;
    }
    if (selected.filtro_atributos) {
      return <AttributeFilterDrawerContent />;
    }
    if (selected.automl) {
      return <AutoMLDrawerContent />;
    }
  };

  render() {
    // eslint-disable-next-line no-unused-vars
    const { selected, demoStateData } = this.state;
    return (
      <>
        <MainDrawer isOpen={this.openDrawer()} onClose={this.handleClose}>
          {this.switchDrawer()}
        </MainDrawer>

        <ArcherContainer strokeColor='gray'>
          <Button onClick={() => this.setState({ demoStateData: '' })}>
            Reset
          </Button>
          <Button onClick={() => this.setState({ demoStateData: 'ok' })}>
            Complete
          </Button>
          <Button onClick={() => this.setState({ demoStateData: 'loading' })}>
            Loading
          </Button>
          <Button onClick={() => this.setState({ demoStateData: 'wait' })}>
            Wait
          </Button>
          <Button onClick={() => this.setState({ demoStateData: 'warn' })}>
            Error
          </Button>
          <Button onClick={() => this.setState({ demoStateData: 'success' })}>
            Success
          </Button>
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
                    taskClick={this.handleClick}
                    title='Conjunto de dados'
                    state={demoStateData}
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
          </div>
        </ArcherContainer>
      </>
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
