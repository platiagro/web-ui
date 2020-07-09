// CORE LIBS
import React from 'react';
import PropTypes from 'prop-types';

// UI LIBS
import { Icon, Divider, Empty } from 'antd';

// COMPONENTS
import SelectInput from '../SelectInput';
import RadioInput from '../RadioInput';
import NumberInput from '../NumberInput';
import StringInput from '../StringInput';
import BooleanInput from '../BooleanInput';
import RemoveOperatorButton from '../RemoveOperatorButton';

// REACT FRAGMENT
const { Fragment } = React;

// INPUT TYPES
const inputTypes = {
  // select
  select: ({ uuid, name, ...props }) => (
    <SelectInput
      key={uuid || name}
      handleChange={(value) => alert(`(select) Valor selecionado: ${value}`)}
      {...props}
      name={name}
    />
  ),
  // radio
  radio: ({ uuid, name, ...props }) => (
    <RadioInput
      key={uuid || name}
      handleChange={(value) => alert(`(radio) Valor selecionado: ${value}`)}
      {...props}
      name={name}
    />
  ),
  // feature
  feature: (
    { uuid, name, multiple, description, ...props },
    loading,
    handleChange,
    trainingSucceeded,
    trainingLoading
  ) => (
    <Fragment key={`fragment-${uuid || name}`}>
      <SelectInput
        key={uuid || name}
        isMultiple={multiple ? true : false}
        handleChange={(value) => handleChange(name, value)}
        name={name}
        loading={loading}
        tip={description}
        disabled={trainingSucceeded || trainingLoading}
        placeholder='Selecionar colunas'
        {...props}
      />
      <Divider />
    </Fragment>
  ),
  // number
  number: (
    { uuid, name, multiple, description, options, ...props },
    loading,
    handleChange,
    trainingSucceeded,
    trainingLoading
  ) =>
    options === undefined ? (
      // simple number input
      <Fragment key={`fragment-${uuid || name}`}>
        <NumberInput
          key={uuid || name}
          handleChange={handleChange}
          {...props}
          step={0.1}
          name={name}
          tip={description}
          loading={loading}
          disabled={trainingSucceeded || trainingLoading}
        />
        <Divider />
      </Fragment>
    ) : (
      // number select input
      <Fragment key={`fragment-${uuid || name}`}>
        <SelectInput
          key={uuid || name}
          isMultiple={multiple ? true : false}
          handleChange={(value) => handleChange(name, parseFloat(value))}
          name={name}
          loading={loading}
          disabled={trainingSucceeded || trainingLoading}
          placeholder='Selecionar'
          options={options}
          tip={description}
          {...props}
        />
        <Divider />
      </Fragment>
    ),
  // float
  float: (
    { uuid, name, multiple, description, options, ...props },
    loading,
    handleChange,
    trainingSucceeded,
    trainingLoading
  ) =>
    options === undefined ? (
      // simple number input
      <Fragment key={`fragment-${uuid || name}`}>
        <NumberInput
          key={uuid || name}
          handleChange={handleChange}
          {...props}
          step={0.1}
          name={name}
          tip={description}
          loading={loading}
          disabled={trainingSucceeded || trainingLoading}
        />
        <Divider />
      </Fragment>
    ) : (
      // number select input
      <Fragment key={`fragment-${uuid || name}`}>
        <SelectInput
          key={uuid || name}
          isMultiple={multiple ? true : false}
          handleChange={(value) => handleChange(name, parseFloat(value))}
          name={name}
          loading={loading}
          disabled={trainingSucceeded || trainingLoading}
          placeholder='Selecionar'
          options={options}
          tip={description}
          {...props}
        />
        <Divider />
      </Fragment>
    ),
  // integer
  integer: (
    { uuid, name, multiple, description, options, ...props },
    loading,
    handleChange,
    trainingSucceeded,
    trainingLoading
  ) =>
    options === undefined ? (
      // simple integer input
      <Fragment key={`fragment-${uuid || name}`}>
        <NumberInput
          key={uuid || name}
          handleChange={handleChange}
          {...props}
          name={name}
          tip={description}
          loading={loading}
          disabled={trainingSucceeded || trainingLoading}
        />
        <Divider />
      </Fragment>
    ) : (
      // integer select input
      <Fragment key={`fragment-${uuid || name}`}>
        <SelectInput
          key={uuid || name}
          isMultiple={multiple ? true : false}
          handleChange={(value) => handleChange(name, parseInt(value))}
          name={name}
          loading={loading}
          disabled={trainingSucceeded || trainingLoading}
          placeholder='Selecionar'
          options={options}
          tip={description}
          {...props}
        />
        <Divider />
      </Fragment>
    ),
  // string
  string: (
    { uuid, name, multiple, description, options, ...props },
    loading,
    handleChange,
    trainingSucceeded,
    trainingLoading
  ) =>
    options === undefined ? (
      <Fragment key={`fragment-${uuid || name}`}>
        <StringInput
          key={uuid || name}
          handleChange={handleChange}
          tip={description}
          {...props}
          name={name}
          loading={loading}
          disabled={trainingSucceeded || trainingLoading}
        />
        <Divider />
      </Fragment>
    ) : (
      // string select input
      <Fragment key={`fragment-${uuid || name}`}>
        <SelectInput
          key={uuid || name}
          isMultiple={multiple ? true : false}
          handleChange={(value) => handleChange(name, value)}
          name={name}
          loading={loading}
          disabled={trainingSucceeded || trainingLoading}
          placeholder='Selecionar'
          options={options}
          tip={description}
          {...props}
        />
        <Divider />
      </Fragment>
    ),
  // boolean
  boolean: (
    { uuid, name, multiple, description, ...props },
    loading,
    handleChange,
    trainingSucceeded,
    trainingLoading
  ) => (
    <Fragment key={`fragment-${uuid || name}`}>
      <BooleanInput
        key={uuid || name}
        isMultiple={multiple ? true : false}
        handleChange={(inputName, value) => handleChange(inputName, value)}
        name={name}
        loading={loading}
        tip={description}
        disabled={trainingSucceeded || trainingLoading}
        placeholder='Selecionar colunas'
        {...props}
      />
      <Divider />
    </Fragment>
  ),
};

/**
 * Generic Drawer.
 * This component is responsible for displaying generic drawer content.
 */
const GenericDrawer = ({
  drawerInputs,
  drawerTip,
  loading,
  trainingLoading,
  parameterLoading,
  handleChangeParameter,
  handleRemoveOperatorClick,
  trainingSucceeded,
}) => (
  // div container
  <div>
    {/* rendering remove operator button */}
    <div style={{ textAlign: 'center' }}>
      {!trainingSucceeded && (
        <>
          <RemoveOperatorButton
            loading={loading}
            handleClick={handleRemoveOperatorClick}
            disabled={trainingLoading}
          />
          <Divider />
        </>
      )}
    </div>
    {/* Render empty component when drawer is empty */}
    {drawerInputs && drawerInputs.length === 0 && (
      <Empty
        image={Empty.PRESENTED_IMAGE_SIMPLE}
        description='Não há parâmetros para configuração'
      />
    )}
    {/* rendering drawer inputs */}
    {drawerInputs &&
      drawerInputs.length > 0 &&
      drawerInputs.map((input) =>
        inputTypes[input.type](
          input,
          parameterLoading,
          handleChangeParameter,
          trainingSucceeded,
          trainingLoading
        )
      )}
    {/* rendering drawer tip node */}
    {drawerTip && (
      <div>
        {/* divider */}
        <Divider orientation='left'>
          <Icon type='bulb' />
          Dica
        </Divider>
        {/* drawer tip node */}
        {drawerTip}
      </div>
    )}
  </div>
);

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
