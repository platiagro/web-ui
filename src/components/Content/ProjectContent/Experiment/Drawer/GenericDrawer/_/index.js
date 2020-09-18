// CORE LIBS
import React from 'react';
import PropTypes from 'prop-types';

// UI LIBS
import { BulbOutlined } from '@ant-design/icons';
import { Divider, Empty } from 'antd';

// COMPONENTS
import RadioInput from '../RadioInput';
import {
  ToggleInputBlock,
  NumberInputBlock,
  SelectInputBlock,
  TextInputBlock,
} from 'components/InputBlocks';
import RemoveOperatorButton from '../RemoveOperatorButton';
import InputBlockContainer from 'components/InputBlockContainer';

// INPUT TYPES
const inputTypes = {
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
  // feature
  feature(props, loading, handleChange, trainingLoading, valueLatestTraining) {
    const { uuid, name, label, value, options, multiple, description } = props;

    return (
      <SelectInputBlock
        key={uuid || name}
        isMultiple={multiple ? true : false}
        handleChange={(value) => handleChange(name, value)}
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
        handleChange={(value) => handleChange(name, value)}
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
        handleChange={(value) => handleChange(name, value)}
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
        handleChange={(value) => handleChange(name, value)}
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
        handleChange={(value) => handleChange(name, value)}
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
  // BOOLEAN / TOGGLE
  boolean(props, loading, handleChange, trainingLoading, valueLatestTraining) {
    const { uuid, name, description, label, value } = props;

    return (
      <ToggleInputBlock
        key={uuid || name}
        handleChange={(inputName, value) => handleChange(inputName, value)}
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
};

/**
 * Generic Drawer.
 * This component is responsible for displaying generic drawer content.
 *
 * @param props
 */
const GenericDrawer = (props) => {
  const { drawerInputs, drawerTip, parametersLatestTraining } = props;
  const { loading, parameterLoading, trainingLoading } = props;
  const { handleChangeParameter, handleRemoveOperatorClick } = props;

  return (
    // div container
    <>
      {/* rendering remove operator button */}
      <InputBlockContainer>
        <RemoveOperatorButton
          loading={loading}
          handleClick={handleRemoveOperatorClick}
          disabled={trainingLoading}
        />
      </InputBlockContainer>
      {/* Render empty component when drawer is empty */}
      {drawerInputs && drawerInputs.length === 0 && (
        <InputBlockContainer>
          <Empty
            image={Empty.PRESENTED_IMAGE_SIMPLE}
            description='Não há parâmetros para configuração'
          />
        </InputBlockContainer>
      )}
      {/* rendering drawer inputs */}
      {drawerInputs &&
        drawerInputs.length > 0 &&
        drawerInputs.map((input) => {
          let valueLatestTraining = parametersLatestTraining
            ? parametersLatestTraining[input.name]
            : null;
          if (
            valueLatestTraining === undefined ||
            valueLatestTraining === null
          ) {
            valueLatestTraining = input.value;
          }

          return inputTypes[input.type](
            input,
            parameterLoading,
            handleChangeParameter,
            trainingLoading,
            valueLatestTraining
          );
        })}
      {/* rendering drawer tip node */}
      {drawerTip && (
        <div>
          {/* divider */}
          <Divider orientation='left'>
            <BulbOutlined />
            Dica
          </Divider>
          {/* drawer tip node */}
          {drawerTip}
        </div>
      )}
    </>
  );
};

// PROP TYPES
GenericDrawer.propTypes = {
  /** generic drawer inputs list */
  drawerInputs: PropTypes.arrayOf(PropTypes.object),
  /** generic drawer tip node */
  drawerTip: PropTypes.node,
  /** pipeline parameters list */
  parametersLatestTraining: PropTypes.arrayOf(PropTypes.object),
  /** experiment is loading */
  loading: PropTypes.bool,
  /** parameter is loading */
  parameterLoading: PropTypes.bool,
  /** training is running */
  trainingLoading: PropTypes.bool,
  /** function to handle change parameter */
  handleChangeParameter: PropTypes.func,
  /** function to handle remove operator */
  handleRemoveOperatorClick: PropTypes.func,
};

// PROP DEFAULT VALUES
GenericDrawer.defaultProps = {
  /** generic drawer tip node */
  drawerTip: undefined,
  /** generic drawer inputs list */
  drawerInputs: [],
};

// EXPORT
export default GenericDrawer;
