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
  feature(props, loading, handleChange, trainingLoading) {
    // destructuring props
    const { uuid, name, label, value, options, multiple, description } = props;

    // rendering component
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
      />
    );
  },
  // number
  number(props, loading, handleChange, trainingLoading) {
    // destructuring props
    const {
      uuid,
      name,
      multiple,
      description,
      label,
      options,
      min,
      max,
      step,
      value,
      placeholder,
    } = props;

    // rendering component
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
      />
    );
  },
  // float
  float(props, loading, handleChange, trainingLoading) {
    // destructuring props
    const {
      uuid,
      name,
      multiple,
      description,
      label,
      options,
      min,
      max,
      step,
      value,
      placeholder,
    } = props;

    // rendering component
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
      />
    );
  },
  // integer
  integer(props, loading, handleChange, trainingLoading) {
    const {
      uuid,
      name,
      multiple,
      description,
      label,
      options,
      min,
      max,
      step,
      value,
      placeholder,
    } = props;
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
      />
    );
  },
  // string
  string(props, loading, handleChange, trainingLoading) {
    // destructuring props
    const {
      uuid,
      name,
      label,
      value,
      multiple,
      description,
      options,
      placeholder,
    } = props;

    // rendering component
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
      />
    );
  },
  // BOOLEAN / TOGGLE
  boolean(props, loading, handleChange, trainingLoading) {
    // destructuring props
    const { uuid, name, description, label, value } = props;

    // rendering component
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
  // destructuring props
  const {
    drawerInputs,
    drawerTip,
    loading,
    trainingLoading,
    parameterLoading,
    handleChangeParameter,
    handleRemoveOperatorClick,
  } = props;

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
        drawerInputs.map((input) =>
          inputTypes[input.type](
            input,
            parameterLoading,
            handleChangeParameter,
            trainingLoading
          )
        )}
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
  /** training is succeded */
  trainingSucceeded: PropTypes.bool.isRequired,
  /** training is running */
  trainingLoading: PropTypes.bool.isRequired,
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
