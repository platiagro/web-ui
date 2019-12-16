/* eslint-disable react/no-unused-state */
/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import './style.scss';
import { ArcherContainer, ArcherElement } from 'react-archer';
import { connect } from 'react-redux';
import _ from 'lodash';
import GenericAttributeCreationDrawerContent from '../GenericAttributeCreationDrawerContent';
import AttributeFilterDrawerContent from '../AttributeFilterDrawerContent';
import AttributePreSelectionDrawerContent from '../AttributePreSelectionDrawerContent';
import AutoMLDrawerContent from '../AutoMLDrawerContent';
import DataSetDrawerContent from '../DataSetDrawerContent';
import TimeAttributeCreationDrawerContent from '../TimeAttributeCreationDrawerContent';
import CardTask from './CardTask';

import { showDrawer, selectDrawer } from '../../store/actions/drawerActions';
import {
  setSelectedDrawer,
  setColumns,
  setGroup,
  setPeriod,
  setCutoffPre1,
  setCorrelationPre1,
  setCutoffPre2,
  setCorrelationPre2,
  setFilter,
  setAutoML,
  setCsv,
  setTxt,
  setTarget,
  setDataset,
} from '../../store/actions/experimentActions';

const ExperimentFlow = (props) => {
  const {
    template,
    selected,
    runStatus,
    parameters,
    taskStatus,
    columns,
    details,
  } = props;

  const {
    onShowDrawer,
    onSelectDrawer,
    onSetColumns,
    onSetSelectedDrawer,
    onSetGroup,
    onSetPeriod,
    onSetCutoffPre1,
    onSetCorrelationPre1,
    onSetCutoffPre2,
    onSetCorrelationPre2,
    onSetFilter,
    onSetAutoML,
    onSetCsv,
    onSetTxt,
    onSetTarget,
    onSetDataset,
  } = props;

  // getting drawer title
  const getTitle = (task) => {
    switch (task) {
      case 'conjunto_dados':
        return 'Conjunto de dados';
      case 'atributos_tempo':
        return 'Criação de atributos por tempo';
      case 'pre_selecao1':
        return 'Pré-seleção de atributos';
      case 'atributos_genericos':
        return 'Criação de atributos genéricos';
      case 'pre_selecao2':
        return 'Pré-seleção de atributos';
      case 'filtro_atributos':
        return 'Filtro de atributos';
      case 'automl':
        return 'AutoML';
      case 'regression':
        return 'Regressão Logística';
      default:
        return null;
    }
  };

  // getting drawer child
  // Selecioanr o Drawer certo
  const getChild = (task) => {
    switch (task) {
      case 'conjunto_dados':
        return (
          <DataSetDrawerContent
            parameter={parameters.conjunto_dados}
            setTarget={onSetTarget}
            columns={columns}
            setColumns={onSetColumns}
            setDataset={onSetDataset}
            setCSV={onSetCsv}
            setTXT={onSetTxt}
            details={details}
            runStatus={runStatus}
            taskStatus={taskStatus.conjunto_dados}
          />
        );
      case 'atributos_tempo':
        return (
          <TimeAttributeCreationDrawerContent
            parameter={parameters.atributos_tempo}
            dataSets={columns}
            setGroup={onSetGroup}
            setPeriod={onSetPeriod}
            runStatus={runStatus} // 'Succeeded' // {runStatus}
            taskStatus={taskStatus.atributos_tempo} // 'Succeeded' // {taskStatus.atributos_tempo}
            targetId={parameters.conjunto_dados.target}
            details={details}
          />
        );
      case 'pre_selecao1':
        return (
          <AttributePreSelectionDrawerContent
            parameter={parameters.pre_selecao1}
            preType={1}
            dataSets={columns}
            setCutoff={onSetCutoffPre1}
            setCorrelation={onSetCorrelationPre1}
            runStatus={runStatus}
            taskStatus={taskStatus.pre_selecao1}
            details={details}
          />
        );
      case 'atributos_genericos':
        return (
          <GenericAttributeCreationDrawerContent
            parameter={parameters.atributos_tempo}
            dataSets={columns}
            setFeatureTools={onSetGroup}
            runStatus={runStatus} // 'Succeeded' // {runStatus}
            taskStatus={taskStatus.atributos_genericos} // 'Succeeded' // {taskStatus.atributos_genericos}
            targetId={parameters.conjunto_dados.target}
            details={details}
          />
        );
      case 'pre_selecao2':
        return (
          <AttributePreSelectionDrawerContent
            parameter={parameters.pre_selecao2}
            preType={2}
            dataSets={columns}
            setCutoff={onSetCutoffPre2}
            setCorrelation={onSetCorrelationPre2}
            runStatus={runStatus}
            taskStatus={taskStatus.pre_selecao2}
            details={details}
          />
        );
      case 'filtro_atributos':
        return (
          <AttributeFilterDrawerContent
            parameter={parameters.filtro_atributos}
            dataSets={columns}
            setFilter={onSetFilter}
            runStatus={runStatus} // 'Succeeded' // {runStatus}
            taskStatus={taskStatus.filtro_atributos} // 'Succeeded' // {taskStatus.filtro_atributos}
            targetId={parameters.conjunto_dados.target}
          />
        );
      case 'automl':
        return (
          <AutoMLDrawerContent
            parameter={parameters.automl}
            dataSets={columns}
            setAutoML={onSetAutoML}
            runStatus={runStatus}
            taskStatus={taskStatus.automl}
            details={details}
          />
        );
      default:
        return null;
    }
    // NÃO REMOVER
    // if (
    //   selected.regression &&
    //   runStatus === 'Succeeded' &&
    //   taskStatus.regression === 'Succeeded'
    // ) {
    //   return <ResultsDrawer hideDivider details={details} plot />;
    // }
  };

  // Click para abrir drawer de cada tarefa
  const handleClick = (task) => {
    let newSelected = { ...selected };
    newSelected = _.mapValues(selected, (value, key) => {
      if (key === task) return !value;
      return false;
    });

    onSetSelectedDrawer(newSelected);

    const drawerTitle = getTitle(task);
    const drawerChild = getChild(task);
    const drawerContent = { title: drawerTitle, children: drawerChild };

    onSelectDrawer(drawerContent);
    onShowDrawer();
  };

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
                loading={runStatus}
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
                loading={runStatus}
                condition={taskStatus.atributos_tempo}
                params={!!parameters.atributos_tempo.period}
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
                loading={runStatus}
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
                loading={runStatus}
                condition={taskStatus.atributos_genericos}
                params={parameters.atributos_tempo.group}
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
                loading={runStatus}
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
                loading={runStatus}
                params={parameters.filtro_atributos}
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
                loading={runStatus}
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
                loading={runStatus}
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
                loading={runStatus}
                params={parameters.filtro_atributos}
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
                loading={runStatus}
                params={!!parameters.automl.time}
              />
            </ArcherElement>
          </div>
        </div>
      </div>
    </ArcherContainer>
  );

  const RegressionComplete = () => (
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
                loading={runStatus}
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
                loading={runStatus}
                condition={taskStatus.atributos_tempo}
                params={!!parameters.atributos_tempo.period}
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
                loading={runStatus}
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
                loading={runStatus}
                condition={taskStatus.atributos_genericos}
                params={parameters.atributos_tempo.group}
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
                loading={runStatus}
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
                  targetId: 'regression',
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
                loading={runStatus}
                params={parameters.filtro_atributos}
              />
            </ArcherElement>
          </div>

          <div className='item regression'>
            <ArcherElement id='regression'>
              <CardTask
                task='regression'
                selected={selected.regression}
                taskClick={handleClick}
                title='Regressão'
                icon='share-alt'
                iconTheme='outlined'
                condition={taskStatus.regression}
                loading={runStatus}
                params
              />
            </ArcherElement>
          </div>
        </div>
      </div>
    </ArcherContainer>
  );

  const RegressionSimple = () => (
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
                loading={runStatus}
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
                  targetId: 'regression',
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
                loading={runStatus}
                params={parameters.filtro_atributos}
              />
            </ArcherElement>
          </div>

          <div className='item regression'>
            <ArcherElement id='regression'>
              <CardTask
                task='regression'
                selected={selected.regression}
                taskClick={handleClick}
                title='Regressão'
                icon='share-alt'
                iconTheme='outlined'
                condition={taskStatus.regression}
                loading={runStatus}
                params
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
        return <RegressionComplete />;
      case 'AutoFeaturing + AutoML':
        return <AutomlComplete />;
      case 'Linear Regression/Logistic Regression':
        return <RegressionSimple />;
      default:
        return null;
    }
  };

  return switchTemplate(template);
};

const mapStateToProps = (state) => {
  const {
    columns,
    template,
    selected,
    parameters,
    runStatus,
    taskStatus,
  } = state.experiment;
  return {
    columns,
    template,
    selected,
    parameters,
    runStatus,
    taskStatus,
    details: state.experiment,
  };
};

const mapDispatchToProps = (dispatch) => ({
  onShowDrawer: () => dispatch(showDrawer()),
  onSelectDrawer: (drawerContent) => dispatch(selectDrawer(drawerContent)),
  onSetColumns: (columns) => {
    dispatch(setColumns(columns));
  },
  onSetSelectedDrawer: (selectedDrawer) => {
    dispatch(setSelectedDrawer(selectedDrawer));
  },
  onSetGroup: (group) => {
    dispatch(setGroup(group));
  },
  onSetPeriod: (period) => {
    dispatch(setPeriod(period));
  },
  onSetCutoffPre1: (cutOffPre1) => {
    dispatch(setCutoffPre1(cutOffPre1));
  },
  onSetCorrelationPre1: (correlationPre1) => {
    dispatch(setCorrelationPre1(correlationPre1));
  },
  onSetCutoffPre2: (cutOffPre2) => {
    dispatch(setCutoffPre2(cutOffPre2));
  },
  onSetCorrelationPre2: (correlationPre2) => {
    dispatch(setCorrelationPre2(correlationPre2));
  },
  onSetFilter: (filter) => {
    dispatch(setFilter(filter));
  },
  onSetAutoML: (automl) => {
    dispatch(setAutoML(automl));
  },
  onSetCsv: (csv) => {
    dispatch(setCsv(csv));
  },
  onSetTxt: (txt) => {
    dispatch(setTxt(txt));
  },
  onSetTarget: (target) => {
    dispatch(setTarget(target));
  },
  onSetDataset: (dataset) => {
    dispatch(setDataset(dataset));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ExperimentFlow);
