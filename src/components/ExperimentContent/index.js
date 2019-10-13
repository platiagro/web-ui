/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import _ from 'lodash';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import PropTypes from 'prop-types';
import './style.scss';
import { Button, Divider, Tooltip, Input, message } from 'antd';
import { useParams } from 'react-router-dom';
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
import { updateExperiment } from '../../services/projectsApi';
import {
  getHeader,
  getHeaderColumns,
  getDataSet,
} from '../../services/dataSetApi';

const ExperimentContent = ({ details, flowDetails, fetch }) => {
  const params = useParams();

  const [columns, setColumns] = useState([]);

  // const [experimentParameters, setParameters] = useState({
  //   atributos_tempo: {
  //     group: [],
  //     period: null,
  //   },
  //   pre_selecao1: { cutoff: 0.6, correlation: 0.6 },
  //   pre_selecao2: { cutoff: 0.6, correlation: 0.6 },
  //   filtro_atributos: [],
  //   automl: { time: null },
  //   conjunto_dados: {
  //     target: null,
  //     datasetId: null,
  //     txtName: null,
  //     csvName: null,
  //   },
  // });

  const baseParameters = {
    atributos_tempo: {
      group: [],
      period: null,
    },
    pre_selecao1: { cutoff: 0.6, correlation: 0.6 },
    pre_selecao2: { cutoff: 0.6, correlation: 0.6 },
    filtro_atributos: [],
    automl: { time: null },
    conjunto_dados: {
      target: undefined,
      datasetId: null,
      txtName: null,
      csvName: null,
    },
    template: null,
  };

  const [experimentParameters, setParameters] = useState(
    JSON.parse(details.parameters) || baseParameters
  );

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
    const newParameters = { ...experimentParameters };
    newParameters.atributos_tempo.group = e;
    setParameters(newParameters);
  };

  const setPeriod = (e) => {
    const newParameters = { ...experimentParameters };
    newParameters.atributos_tempo.period = e.target.value;
    setParameters(newParameters);
  };
  // Pré-seleção 1
  const setCutoffPre1 = (e) => {
    const newParameters = { ...experimentParameters };
    newParameters.pre_selecao1.cutoff = e;
    setParameters(newParameters);
  };
  const setCorrelationPre1 = (e) => {
    const newParameters = { ...experimentParameters };
    newParameters.pre_selecao1.correlation = e;
    setParameters(newParameters);
  };
  // Pré-seleção 2
  const setCutoffPre2 = (e) => {
    const newParameters = { ...experimentParameters };
    newParameters.pre_selecao2.cutoff = e;
    setParameters(newParameters);
  };
  const setCorrelationPre2 = (e) => {
    const newParameters = { ...experimentParameters };
    newParameters.pre_selecao2.correlation = e;
    setParameters(newParameters);
  };

  const setFilter = (e) => {
    const newParameters = { ...experimentParameters };
    newParameters.filtro_atributos = e;
    setParameters(newParameters);
  };
  const setAutoML = (e) => {
    const newParameters = { ...experimentParameters };
    newParameters.automl.time = e;
    setParameters(newParameters);
  };

  // Set Datasets

  const setCSV = (e) => {
    const newParameters = { ...experimentParameters };
    newParameters.conjunto_dados.csvName = e;
    setParameters(newParameters);
  };
  const setTXT = (e) => {
    const newParameters = { ...experimentParameters };
    newParameters.conjunto_dados.txtName = e;
    setParameters(newParameters);
  };
  const setTarget = (e) => {
    const newParameters = { ...experimentParameters };
    newParameters.conjunto_dados.target = e;
    setParameters(newParameters);
  };

  const setTemplate = () => {
    const newParameters = { ...experimentParameters };
    newParameters.template = flowDetails.databaseName;
    setParameters(newParameters);
  };

  const setUploadedColumns = (e) => {
    setColumns(e);
  };

  const setDataset = (e) => {
    const newParameters = { ...experimentParameters };
    newParameters.conjunto_dados.datasetId = e;
    setParameters(newParameters);
  };

  // Click para abrir drawer de cada tarefa
  const handleClick = (task) => {
    let newSelected = { ...selected };
    newSelected = _.mapValues(selected, (value, key) => {
      if (key === task) return !value;
      return false;
    });

    setSelected(newSelected);
  };

  // DidMount montagem das colunas
  useEffect(() => {
    async function fetchColumns() {
      // You can await here

      const responseHeader = await getHeader(details.headerId);
      if (responseHeader) setTXT(responseHeader.data.payload.originalName);

      const col = await getHeaderColumns(details.headerId);
      if (col) setColumns(col.data.payload);

      const responseDataset = await getDataSet(details.datasetId);
      if (responseDataset) setCSV(responseDataset.data.payload.originalName);
    }
    if (details.headerId) fetchColumns();

    if (details.targetColumnId) {
      if (details.targetColumnId.length > 5) setTarget(details.targetColumnId);
      else setTarget(undefined);
    }

    if (details.datasetId) setDataset(details.datasetId);

    // if (!details.parameters) {
    //   setParameters(baseParameters);
    // }
    // console.log(details);
  }, []);

  useEffect(() => {
    async function updateTemplate() {
      const res = await updateExperiment(details.projectId, details.uuid, {
        parameters: JSON.stringify({
          ...experimentParameters,
          template: flowDetails.databaseName,
        }),
      });

      if (res) {
        console.log(res);
        setTemplate();
      }
    }

    if (flowDetails) {
      updateTemplate();
    }
  }, [flowDetails]);

  // Abrir Drawer
  const openDrawer = () => {
    return _.indexOf(Object.values(selected), true) !== -1;
  };

  // Fechar Drawer
  const handleClose = async () => {
    const res = await updateExperiment(details.projectId, details.uuid, {
      parameters: JSON.stringify(experimentParameters),
    });

    if (res) setSelected(_.mapValues(selected, () => false));
  };

  // Executar
  const mountObjectRequest = async () => {
    // Montar objeto
    const {
      atributos_tempo,
      pre_selecao1,
      pre_selecao2,
      filtro_atributos,
      automl,
      conjunto_dados,
    } = experimentParameters;

    const insertComma = (arr) => {
      return arr.join(', ');
    };

    const findDate = () => {
      const date = _.find(columns, {
        datatype: 'Date',
      });
      return date ? date.name : '';
    };

    const findTarget = (id) => {
      const target = _.find(columns, {
        uuid: id,
      });
      return target ? target.name : '';
    };

    const getPeriod = () => {
      return atributos_tempo.period ? atributos_tempo.period : '';
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
        value: getPeriod(),
      },
      {
        name: 'preselection-1-na-cutoff',
        value: pre_selecao1.cutoff.toString(),
      },
      {
        name: 'preselection-1-correlation-cutoff',
        value: pre_selecao1.correlation.toString(),
      },
      {
        name: 'feature-tools-group',
        value: insertComma(atributos_tempo.group),
      },
      {
        name: 'preselection-2-na-cutoff',
        value: pre_selecao2.cutoff.toString(),
      },
      {
        name: 'preselection-2-correlation-cutoff',
        value: pre_selecao2.correlation.toString(),
      },
      {
        name: 'filter-columns',
        value: insertComma(filtro_atributos),
      },
      {
        name: 'automl-time-limit',
        value: (automl.time * 60).toString(),
      },
    ];

    const mountName = () => {
      return `${flowDetails.databaseName} ${details.name}`;
    };

    const runRequestTrain = {
      pipeline_spec: {
        parameters: parms,
        pipeline_id: flowDetails.pipelineTrainId,
      },
      name: mountName(),
    };
    // const res = await updateExperiment(details.projectId, details.uuid, {
    //   pipelineIdTrain: flowDetails.pipelineTrainId,
    //   pipelineIdDeploy: flowDetails.pipelineDeployId,
    //   targetColumnId: conjunto_dados.target,
    // });

    // if (res) {
    //   await fetch();
    //   console.log(res);
    // }
    console.log(JSON.stringify(runRequestTrain));
    console.log(experimentParameters);
  };

  // Selecioanr o Drawer certo
  const switchDrawer = () => {
    if (selected.conjunto_dados) {
      return (
        <DataSetDrawerContent
          parameter={experimentParameters.conjunto_dados}
          setTarget={setTarget}
          columns={columns}
          setColumns={setUploadedColumns}
          setDataset={setDataset}
          setCSV={setCSV}
          setTXT={setTXT}
          details={details}
        />
      );
    }
    if (selected.atributos_tempo) {
      return (
        <TimeAttributeCreationDrawerContent
          parameter={experimentParameters.atributos_tempo}
          dataSets={columns}
          setGroup={setGroup}
          setPeriod={setPeriod}
        />
      );
    }
    if (selected.pre_selecao1) {
      return (
        <AttributePreSelectionDrawerContent
          parameter={experimentParameters.pre_selecao1}
          dataSets={columns}
          setCutoff={setCutoffPre1}
          setCorrelation={setCorrelationPre1}
        />
      );
    }
    if (selected.atributos_genericos) {
      return (
        <GenericAttributeCreationDrawerContent
          parameter={experimentParameters.atributos_tempo}
          dataSets={columns}
          setFeatureTools={setGroup}
        />
      );
    }
    if (selected.pre_selecao2) {
      return (
        <AttributePreSelectionDrawerContent
          parameter={experimentParameters.pre_selecao2}
          dataSets={columns}
          setCutoff={setCutoffPre2}
          setCorrelation={setCorrelationPre2}
        />
      );
    }
    if (selected.filtro_atributos) {
      return (
        <AttributeFilterDrawerContent
          parameter={experimentParameters.filtro_atributos}
          dataSets={columns}
          setFilter={setFilter}
        />
      );
    }
    if (selected.automl) {
      return (
        <AutoMLDrawerContent
          parameter={experimentParameters.automl}
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
        <EditableTitle fetchDetails={fetch} details={details} />

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
            disabled={Boolean(
              !(
                !!experimentParameters.conjunto_dados.datasetId &&
                experimentParameters.conjunto_dados.target !== undefined &&
                experimentParameters.template
              )
            )}
          >
            Executar
          </Button>
          <Divider type='vertical' />
          <Button
            icon='tool'
            type='primary'
            disabled={Boolean(
              !(
                !!experimentParameters.conjunto_dados.datasetId &&
                experimentParameters.conjunto_dados.target !== undefined &&
                experimentParameters.template
              )
            )}
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
        parameters={experimentParameters}
        columns={columns}
        handleClick={handleClick}
      />
    </div>
  );
};

// ExperimentContent.propTypes = {
//   details: PropTypes.shape({
//     name: PropTypes.string,
//     uuid: PropTypes.string,
//   }).isRequired,
// };

export default ExperimentContent;
