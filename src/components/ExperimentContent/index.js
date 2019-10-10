import React, { useState } from 'react';
import _ from 'lodash';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import PropTypes from 'prop-types';
import './style.scss';
import { Button, Divider, Tooltip, Input, message } from 'antd';
import EditableTitle from './EditableTitle';
import ExperimentFlow from '../ExperimentFlow';
import MainDrawer from '../MainDrawer';
import GenericAttributeCreationDrawerContent from '../GenericAttributeCreationDrawerContent';
import AttributeFilterDrawerContent from '../AttributeFilterDrawerContent';
import AttributePreSelectionDrawerContent from '../AttributePreSelectionDrawerContent';
import AutoMLDrawerContent from '../AutoMLDrawerContent';
import DataSetDrawerContent from '../DataSetDrawerContent';
import TimeAttributeCreationDrawerContent from '../TimeAttributeCreationDrawerContent';
// import * as projectsServices from '../../services/projectsApi';
import col from './mock_col';

const ExperimentContent = ({ details, fetch }) => {
  // eslint-disable-next-line no-unused-vars
  const [columns, setColumns] = useState(col);

  const [parameters, setParameters] = useState({
    atributos_tempo: {
      group: [],
      period: null,
    },
    pre_selecao1: { cutoff: 0.6, correlation: 0.6 },
    pre_selecao2: { cutoff: 0.6, correlation: 0.6 },
    // atributos_genericos: { group: [] },
    filtro_atributos: [],
    automl: { time: null },
    conjunto_dados: { target: null, columns: [], dataset: null },
  });

  const [selected, setSelected] = useState({
    conjunto_dados: false,
    atributos_tempo: false,
    pre_selecao1: false,
    atributos_genericos: false,
    pre_selecao2: false,
    filtro_atributos: false,
    automl: false,
  });

  const url = '.../modelo_workshop.foragri.com/api/';
  const info = () => {
    message.info('URL Copiada', 1);
  };

  // Métodos para alterar valores dos Drawers
  // Atributos por tempo
  const setGroup = (e) => {
    const params = { ...parameters };
    params.atributos_tempo.group = e;
    setParameters(params);
  };

  const setPeriod = (e) => {
    const params = { ...parameters };
    params.atributos_tempo.period = e.target.value;
    setParameters(params);
  };
  // Pré-seleção 1
  const setCutoffPre1 = (e) => {
    const params = { ...parameters };
    params.pre_selecao1.cutoff = e;
    setParameters(params);
  };
  const setCorrelationPre1 = (e) => {
    const params = { ...parameters };
    params.pre_selecao1.correlation = e;
    setParameters(params);
  };
  // Atributos Genéricos
  // const setFeatureTools = (e) => {
  //   const params = { ...parameters };
  //   params.atributos_genericos.feature_tools = e;
  //   setParameters(params);
  // };
  // Pré-seleção 2
  const setCutoffPre2 = (e) => {
    const params = { ...parameters };
    params.pre_selecao2.cutoff = e;
    setParameters(params);
  };
  const setCorrelationPre2 = (e) => {
    const params = { ...parameters };
    params.pre_selecao2.correlation = e;
    setParameters(params);
  };
  const setFilter = (e) => {
    const params = { ...parameters };
    params.filtro_atributos = e;
    setParameters(params);
  };
  const setAutoML = (e) => {
    const params = { ...parameters };
    params.automl.time = e;
    setParameters(params);
  };
  const setTarget = (e) => {
    const params = { ...parameters };
    params.conjunto_dados.target = e;
    setParameters(params);
  };

  // Click para abrir drawer de cada tarefa
  const handleClick = (task) => {
    // const { selected } = this.state;
    let newSelected = { ...selected };
    newSelected = _.mapValues(selected, (value, key) => {
      if (key === task) return !value;
      return false;
    });

    setSelected(newSelected);
  };

  // Abrir Drawer
  const openDrawer = () => {
    return _.indexOf(Object.values(selected), true) !== -1;
  };

  // Fechar Drawer
  const handleClose = () => {
    setSelected(_.mapValues(selected, () => false));
  };

  // Selecioanr o Drawer certo
  const switchDrawer = () => {
    if (selected.conjunto_dados) {
      return (
        <DataSetDrawerContent
          parameter={parameters.conjunto_dados}
          setTarget={setTarget}
          columns={columns}
          // setDataset={setDataset}
          // setColumns={setColumnsList}
        />
      );
    }
    if (selected.atributos_tempo) {
      return (
        <TimeAttributeCreationDrawerContent
          parameter={parameters.atributos_tempo}
          dataSets={columns}
          setGroup={setGroup}
          setPeriod={setPeriod}
        />
      );
    }
    if (selected.pre_selecao1) {
      return (
        <AttributePreSelectionDrawerContent
          parameter={parameters.pre_selecao1}
          dataSets={columns}
          setCutoff={setCutoffPre1}
          setCorrelation={setCorrelationPre1}
        />
      );
    }
    if (selected.atributos_genericos) {
      return (
        <GenericAttributeCreationDrawerContent
          parameter={parameters.atributos_tempo}
          dataSets={columns}
          setFeatureTools={setGroup}
        />
      );
    }
    if (selected.pre_selecao2) {
      return (
        <AttributePreSelectionDrawerContent
          parameter={parameters.pre_selecao2}
          dataSets={columns}
          setCutoff={setCutoffPre2}
          setCorrelation={setCorrelationPre2}
        />
      );
    }
    if (selected.filtro_atributos) {
      return (
        <AttributeFilterDrawerContent
          parameter={parameters.filtro_atributos}
          dataSets={columns}
          setFilter={setFilter}
        />
      );
    }
    if (selected.automl) {
      return (
        <AutoMLDrawerContent
          parameter={parameters.automl}
          dataSets={columns}
          setAutoML={setAutoML}
        />
      );
    }
    return null;
  };

  return (
    <div className='experiment-content'>
      <div className='experiment-content-header'>
        <EditableTitle fetch={fetch} details={details} />

        <div style={{ display: 'none' }} className='experiment-deployed'>
          <Input className='experiment-url' value={url} />
          <CopyToClipboard onCopy={info} text={url}>
            <Button type='primary'>Copiar URL</Button>
          </CopyToClipboard>
          <Tooltip placement='bottomLeft' title='Download do modelo'>
            <Button type='primary' icon='download' />
          </Tooltip>
        </div>
        <div className='experiment-actions'>
          <Button
            icon='play-circle'
            type='primary'
            // eslint-disable-next-line no-console
            onClick={() => console.log(details.name, parameters)}
          >
            Executar
          </Button>
          <Divider type='vertical' />
          <Button icon='tool' type='primary'>
            Implantar
          </Button>
        </div>
      </div>
      <MainDrawer isOpen={openDrawer()} onClose={handleClose}>
        {switchDrawer()}
      </MainDrawer>
      <ExperimentFlow
        selected={selected}
        parameters={parameters}
        columns={columns}
        handleClick={handleClick}
      />
    </div>
  );
};

ExperimentContent.propTypes = {
  details: PropTypes.shape({
    name: PropTypes.string,
  }).isRequired,
  fetch: PropTypes.func.isRequired,
};

export default ExperimentContent;
