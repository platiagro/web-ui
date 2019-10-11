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

const ExperimentContent = ({ details, fetch, flowDetails }) => {
  console.log(flowDetails);

  // eslint-disable-next-line no-unused-vars
  const [columns, setColumns] = useState();

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
    conjunto_dados: {
      target: null,
      datasetId: null,
      txtName: null,
      csvName: null,
    },
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

  // Set Datasets

  const setCSV = (e) => {
    const params = { ...parameters };
    params.conjunto_dados.csvName = e;
    setParameters(params);
  };
  const setTXT = (e) => {
    const params = { ...parameters };
    params.conjunto_dados.txtName = e;
    setParameters(params);
  };
  const setTarget = (e) => {
    const params = { ...parameters };
    params.conjunto_dados.target = e;
    setParameters(params);
  };

  const setUploadedColumns = (e) => {
    setColumns(e);
  };

  const setDataset = (e) => {
    const params = { ...parameters };
    params.conjunto_dados.datasetId = e;
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

  // Executar
  const mountObjectRequest = () => {
    // Montar objeto
    console.log(columns);
    const {
      atributos_tempo,
      pre_selecao1,
      pre_selecao2,
      filtro_atributos,
      automl,
      conjunto_dados,
    } = parameters;

    const insertComma = (arr) => {
      return arr.join(', ');
    };

    const findDate = () => {
      let date = _.find(columns, { datatype: 'Date' });
      return date ? date.name : '';
    };

    const findTarget = (id) => {
      let target = _.find(columns, { uuid: id });
      return target ? target.name : '';
    };

    const parms = [
      {
        name: 'experiment-id',
        value: details.uuid,
      },
      {
        name: 'bucket',
        value: 'mlpipeline',
      },
      {
        name: 'csv',
        value: conjunto_dados.csvName,
      },
      {
        name: 'txt',
        value: conjunto_dados.txtName,
      },
      {
        name: 'target',
        value: findTarget(conjunto_dados.target),
      },
      {
        name: 'date',
        value: findDate(),
      },
      {
        name: 'date-format',
        value: '%Y-%m-%d',
      },
      {
        name: 'feature-temporal-group',
        value: insertComma(atributos_tempo.group),
      },
      {
        name: 'feature-temporal-period',
        value: atributos_tempo.period,
      },
      {
        name: 'preselection-1-na-cutoff',
        value: pre_selecao1.cutoff,
      },
      {
        name: 'preselection-1-correlation-cutoff',
        value: pre_selecao1.correlation,
      },
      {
        name: 'feature-tools-group',
        value: insertComma(atributos_tempo.group),
      },
      {
        name: 'preselection-2-na-cutoff',
        value: pre_selecao2.cutoff,
      },
      {
        name: 'preselection-2-correlation-cutoff',
        value: pre_selecao2.correlation,
      },
      {
        name: 'filter-columns',
        value: insertComma(filtro_atributos),
      },
      {
        name: 'automl-time-limit',
        value: automl.time * 60,
      },
    ];
    console.log(parms);
  };

  // Selecioanr o Drawer certo
  const switchDrawer = () => {
    if (selected.conjunto_dados) {
      return (
        <DataSetDrawerContent
          parameter={parameters.conjunto_dados}
          setTarget={setTarget}
          columns={columns}
          setColumns={setUploadedColumns}
          setDataset={setDataset}
          setCSV={setCSV}
          setTXT={setTXT}
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
            onClick={mountObjectRequest}
            disabled={!parameters.conjunto_dados.datasetId}
          >
            Executar
          </Button>
          <Divider type='vertical' />
          <Button
            icon='tool'
            type='primary'
            disabled={!parameters.conjunto_dados.datasetId}
          >
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
    uuid: PropTypes.string,
  }).isRequired,
  fetch: PropTypes.func.isRequired,
};

export default ExperimentContent;
