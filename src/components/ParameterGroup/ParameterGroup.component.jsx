/* eslint-disable sonarjs/no-identical-functions */
/* eslint-disable no-prototype-builtins */
/* eslint-disable react/prop-types */

import React from 'react';
import PropTypes from 'prop-types';

import {
  RadioInput,
  TextInputBlock,
  SelectInputBlock,
  ToggleInputBlock,
  NumberInputBlock,
} from 'components/InputBlocks';

const getParameterTypes = (object, parameter, defaultType) => {
  if (object.hasOwnProperty(parameter.type)) {
    return object[parameter.type];
  } else {
    console.warn(
      `Não foi declarado o tipo para o parâmetro '${parameter?.name}'`
    );
    return object[defaultType];
  }
};

const parameterTypes = {
  boolean(props, loading, handleChange, trainingLoading, valueLatestTraining) {
    const { uuid, name, description, label, value } = props;

    return (
      <ToggleInputBlock
        key={uuid || name}
        handleChange={(inputName, newValue) =>
          handleChange(inputName, newValue)
        }
        name={name}
        title={label || name}
        isLoading={loading}
        tip={description}
        isChecked={value}
        isDisabled={trainingLoading}
        valueLatestTraining={valueLatestTraining}
      />
    );
  },

  feature(props, loading, handleChange, trainingLoading, valueLatestTraining) {
    const { uuid, name, label, value, options, multiple, description } = props;

    return (
      <SelectInputBlock
        key={uuid || name}
        isMultiple={multiple ? true : false}
        handleChange={(newValue) => handleChange(name, newValue)}
        name={name}
        isLoading={loading}
        isDisabled={trainingLoading}
        placeholder='Selecionar'
        options={options}
        tip={description}
        value={value ? value : undefined}
        title={label || name}
        valueLatestTraining={
          valueLatestTraining ? valueLatestTraining : undefined
        }
      />
    );
  },

  float(props, loading, handleChange, trainingLoading, valueLatestTraining) {
    const { description, label, max, multiple, min, name } = props;
    const { options, placeholder, step, uuid, value } = props;

    return options === undefined ? (
      <NumberInputBlock
        key={uuid || name}
        handleChange={handleChange}
        title={label || name}
        name={name}
        tip={description}
        min={min}
        max={max}
        step={step}
        value={value}
        isLoading={loading}
        isDisabled={trainingLoading}
        placeholder={placeholder}
        valueLatestTraining={valueLatestTraining}
      />
    ) : (
      <SelectInputBlock
        key={uuid || name}
        isMultiple={multiple ? true : false}
        handleChange={(newValue) => handleChange(name, newValue)}
        name={name}
        isLoading={loading}
        isDisabled={trainingLoading}
        placeholder='Selecionar'
        options={options}
        tip={description}
        value={value}
        title={label || name}
        valueLatestTraining={valueLatestTraining}
      />
    );
  },

  integer(props, loading, handleChange, trainingLoading, valueLatestTraining) {
    const { description, label, max, multiple, min, name } = props;
    const { options, placeholder, step, uuid, value } = props;

    return options === undefined ? (
      <NumberInputBlock
        key={uuid || name}
        handleChange={handleChange}
        title={label || name}
        name={name}
        tip={description}
        min={min}
        max={max}
        step={step}
        value={value}
        isLoading={loading}
        isDisabled={trainingLoading}
        placeholder={placeholder}
        valueLatestTraining={valueLatestTraining}
      />
    ) : (
      <SelectInputBlock
        key={uuid || name}
        isMultiple={multiple ? true : false}
        handleChange={(newValue) => handleChange(name, newValue)}
        name={name}
        isLoading={loading}
        isDisabled={trainingLoading}
        placeholder='Selecionar'
        options={options}
        tip={description}
        value={value}
        title={label || name}
        valueLatestTraining={valueLatestTraining}
      />
    );
  },

  number(props, loading, handleChange, trainingLoading, valueLatestTraining) {
    const { description, label, max, multiple, min, name } = props;
    const { options, placeholder, step, uuid, value } = props;

    return options === undefined ? (
      <NumberInputBlock
        key={uuid || name}
        handleChange={handleChange}
        title={label || name}
        name={name}
        tip={description}
        min={min}
        max={max}
        step={step}
        value={value}
        isLoading={loading}
        isDisabled={trainingLoading}
        placeholder={placeholder}
        valueLatestTraining={valueLatestTraining}
      />
    ) : (
      <SelectInputBlock
        key={uuid || name}
        isMultiple={multiple ? true : false}
        handleChange={(newValue) => handleChange(name, newValue)}
        name={name}
        isLoading={loading}
        isDisabled={trainingLoading}
        placeholder='Selecionar'
        options={options}
        tip={description}
        value={value}
        title={label || name}
        valueLatestTraining={valueLatestTraining}
      />
    );
  },

  radio({ uuid, name, ...props }) {
    return (
      <RadioInput
        key={uuid || name}
        handleChange={(value) => alert(`(radio) Valor selecionado: ${value}`)}
        {...props}
        name={name}
      />
    );
  },

  select({ uuid, name, ...props }) {
    return (
      <SelectInputBlock
        key={uuid || name}
        handleChange={(value) => alert(`(select) Valor selecionado: ${value}`)}
        {...props}
        name={name}
      />
    );
  },

  string(props, loading, handleChange, trainingLoading, valueLatestTraining) {
    const { description, label, multiple, name } = props;
    const { options, placeholder, value, uuid } = props;

    return options === undefined ? (
      <TextInputBlock
        key={uuid || name}
        handleChange={handleChange}
        tip={description}
        name={name}
        isLoading={loading}
        isDisabled={trainingLoading}
        placeholder={placeholder}
        title={label || name}
        value={value}
        valueLatestTraining={valueLatestTraining}
      />
    ) : (
      <SelectInputBlock
        key={uuid || name}
        isMultiple={multiple ? true : false}
        handleChange={(newValue) => handleChange(name, newValue)}
        name={name}
        isLoading={loading}
        isDisabled={trainingLoading}
        placeholder='Selecionar'
        options={options}
        tip={description}
        value={value}
        title={label || name}
        valueLatestTraining={valueLatestTraining}
      />
    );
  },
};

const ParameterGroup = ({
  loading,
  onChange,
  parameter,
  trainingLoading,
  valueLatestTraining,
}) => {
  return getParameterTypes(parameterTypes, parameter, 'string')(
    parameter,
    loading,
    onChange,
    trainingLoading,
    valueLatestTraining
  );
};

ParameterGroup.propTypes = {
  loading: PropTypes.bool,
  onChange: PropTypes.func,
  parameter: PropTypes.object,
  trainingLoading: PropTypes.bool,
  valueLatestTraining: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.object,
    PropTypes.string,
    PropTypes.array,
    PropTypes.bool,
  ]),
};

export default ParameterGroup;
