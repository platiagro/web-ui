/* eslint-disable react/prop-types */
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

const ExperimentContent = (props) => {
  const [columns, setColumns] = useState(col);

  const [parameters, setParameters] = useState({
    atributos_tempo: {
      group: [],
      period: null,
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

  //Seleções dos atributos de tempo
  const handleSelectTime = (e) => {
    const params = { ...parameters };
    params.atributos_tempo.group = e;
    setParameters(params);
  };

  const handleRadioSelectTime = (e) => {
    const params = { ...parameters };
    params.atributos_tempo.period = e.target.value;
    setParameters(params);
  };

  const handleClick = (task) => {
    // const { selected } = this.state;
    let newSelected = { ...selected };
    newSelected = _.mapValues(selected, (value, key) => {
      if (key === task) return !value;
      return false;
    });

    setSelected(newSelected);
  };

  const openDrawer = () => {
    return _.indexOf(Object.values(selected), true) !== -1;
  };

  const handleClose = () => {
    setSelected(_.mapValues(selected, () => false));
  };

  const switchDrawer = () => {
    if (selected.conjunto_dados) {
      return <DataSetDrawerContent />;
    }
    if (selected.atributos_tempo) {
      return (
        <TimeAttributeCreationDrawerContent
          parameter={parameters.atributos_tempo}
          dataSets={columns}
          handleSelect={handleSelectTime}
          handleRadioSelect={handleRadioSelectTime}
        />
      );
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

  const { details, fetch } = props;
  const url = '.../modelo_workshop.foragri.com/api/';
  const info = () => {
    message.info('URL Copiada', 1);
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
          <Button icon='play-circle' type='primary'>
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
    title: PropTypes.string,
  }).isRequired,
};

export default ExperimentContent;
