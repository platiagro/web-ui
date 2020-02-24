// CORE LIBS
import React from 'react';
import PropTypes from 'prop-types';

// UI LIBS
import { Icon, Divider } from 'antd';

// COMPONENTS
import SelectInput from '../SelectInput';
import RadioInput from '../RadioInput';
import NumberInput from '../NumberInput';

// INPUT TYPES
const inputTypes = {
  // select
  select: ({ uuid, ...props }) => (
    <SelectInput
      key={uuid}
      handleChange={(value) => alert(`(select) Valor selecionado: ${value}`)}
      {...props}
    />
  ),
  // radio
  radio: ({ uuid, ...props }) => (
    <RadioInput
      key={uuid}
      handleChange={(value) => alert(`(radio) Valor selecionado: ${value}`)}
      {...props}
    />
  ),
  // radio
  number: ({ uuid, ...props }) => (
    <NumberInput
      key={uuid}
      handleChange={(value) => alert(`(number) Valor selecionado: ${value}`)}
      {...props}
    />
  ),
};

/**
 * Generic Drawer.
 * This component is responsible for displaying generic drawer content.
 */
const GenericDrawer = ({ drawerInputs, drawerTip }) => (
  // div container
  <div>
    {/* rendering drawer inputs */}
    {drawerInputs.map((input) => inputTypes[input.type](input))}
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
