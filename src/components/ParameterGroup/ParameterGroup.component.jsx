// REACT LIBS
import PropTypes from 'prop-types';
import React from 'react';

// COMPONENTS
import {
  NumberInputBlock,
  RadioInput,
  SelectInputBlock,
  TextInputBlock,
  ToggleInputBlock,
} from 'components/InputBlocks';

function getParameterTypes(object, parameter, defaultType) {
  if (object.hasOwnProperty(parameter.type)) return object[parameter.type];
  else {
    console.warn(
      `Não foi declarado o tipo para o parâmetro '${parameter?.name}'`
    );
    return object[defaultType];
  }
}

// PARAMETER TYPES
const parameterTypes = {
  // BOOLEAN / TOGGLE
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
  // feature
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
  // float
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
      // number select input
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
  // integer
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
      // integer select input
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
  // number
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
      // number select input
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
  // radio
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
  // select
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
  // string
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
      // string select input
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

/**
 * This component is responsible for render the parameter group.
 */
const ParameterGroup = (props) => {
  const {
    loading,
    onChange,
    parameter,
    trainingLoading,
    valueLatestTraining,
  } = props;

  return getParameterTypes(parameterTypes, parameter, 'string')(
    parameter,
    loading,
    onChange,
    trainingLoading,
    valueLatestTraining
  );
};

// PROP TYPES
ParameterGroup.propTypes = {
  /** parameter is loading */
  loading: PropTypes.bool,
  /** function to handle change parameter */
  onChange: PropTypes.func,
  /** parameter object */
  parameter: PropTypes.object,
  /** training is running */
  trainingLoading: PropTypes.bool,
  /** latest training value */
  valueLatestTraining: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.object,
    PropTypes.string,
  ]),
};

// EXPORT DEFAULT
export default ParameterGroup;
