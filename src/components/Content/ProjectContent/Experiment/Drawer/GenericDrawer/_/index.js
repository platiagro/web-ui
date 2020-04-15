// CORE LIBS
import React from 'react';
import PropTypes from 'prop-types';

// UI LIBS
import { Icon, Divider } from 'antd';

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
  // number (float)
  number: ({ uuid, name, ...props }) => (
    <NumberInput
      key={uuid || name}
      handleChange={(value) => alert(`(float) Valor selecionado: ${value}`)}
      {...props}
      step='0.1'
      name={name}
    />
  ),
  // integer
  integer: ({ uuid, name, ...props }) => (
    <NumberInput
      key={uuid || name}
      handleChange={(value) => alert(`(integer) Valor selecionado: ${value}`)}
      {...props}
      name={name}
    />
  ),
  // string
  string: ({ uuid, name, ...props }) => (
    <StringInput
      key={uuid || name}
      handleChange={(value) => alert(`(string) Valor selecionado: ${value}`)}
      {...props}
      name={name}
    />
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
  handleRemoveOperatorClick,
}) => (
  // div container
  <div>
    {/* rendering drawer inputs */}
    {drawerInputs &&
      drawerInputs.length > 0 &&
      drawerInputs.map((input) => inputTypes[input.type](input))}
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
};

// PROP DEFAULT VALUES
GenericDrawer.defaultProps = {
  /** generic drawer tip node */
  drawerTip: undefined,
};

// EXPORT
export default GenericDrawer;
