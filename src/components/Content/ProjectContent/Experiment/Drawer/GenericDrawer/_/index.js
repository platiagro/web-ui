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
import RemoveOperatorButton from '../RemoveOperatorButton';

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
    <>
      <SelectInput
        key={uuid || name}
        isMultiple={multiple ? true : ''}
        handleChange={(value) => handleChange(name, value)}
        name={name}
        loading={loading}
        tip={description}
        disabled={trainingSucceeded || trainingLoading}
        placeholder='Selecionar colunas'
        {...props}
      />
      <Divider />
    </>
  ),
  // number (float)
  number: (
    { uuid, name, multiple, description, options, ...props },
    loading,
    handleChange,
    trainingSucceeded,
    trainingLoading
  ) =>
    options === undefined ? (
      // simple number input
      <>
        <NumberInput
          key={uuid || name}
          handleChange={handleChange}
          {...props}
          step='0.1'
          name={name}
          tip={description}
          loading={loading}
          disabled={trainingSucceeded || trainingLoading}
        />
        <Divider />
      </>
    ) : (
      // number select input
      <>
        <SelectInput
          key={uuid || name}
          isMultiple={multiple ? true : ''}
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
      </>
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
      <>
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
      </>
    ) : (
      // integer select input
      <>
        <SelectInput
          key={uuid || name}
          isMultiple={multiple ? true : ''}
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
      </>
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
      <>
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
      </>
    ) : (
      // string select input
      <>
        <SelectInput
          key={uuid || name}
          isMultiple={multiple ? true : ''}
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
      </>
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
    {/* Render empty component when drawer is empty */}
    {drawerInputs && drawerInputs.length === 0 && (
      <Empty
        image={Empty.PRESENTED_IMAGE_SIMPLE}
        description='Não necessita de configuração'
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
    {/* rendering remove operator button */}
    <div>
      <RemoveOperatorButton
        loading={loading}
        handleClick={handleRemoveOperatorClick}
        disabled={trainingSucceeded || trainingLoading}
      />
    </div>
  </div>
);

// PROP TYPES
GenericDrawer.propTypes = {
  /** generic drawer inputs list */
  drawerInputs: PropTypes.arrayOf(PropTypes.object).isRequired,
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
};

// EXPORT
export default GenericDrawer;
