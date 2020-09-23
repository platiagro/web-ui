// REACT LIBS
import React from 'react';
import PropTypes from 'prop-types';

// UI COMPONENTS
import { Popconfirm, Button } from 'uiComponents';

/**
 * A delete button with popconfirm.
 *
 * @param {object} props Component props
 *
 * @returns {DeleteButton} Component
 *
 * @component
 */
const DeleteButton = (props) => {
  // destructuring props
  const { popconfirmText, handleDelete } = props;

  // popconfirm ok text
  const okText = 'Sim';

  // popconfirm cancel text
  const cancelText = 'Não';

  // delete button type
  const buttonType = 'link';

  // delete button text
  const buttonText = 'Excluir';

  // rendering component
  return (
    <Popconfirm
      title={popconfirmText}
      onConfirm={handleDelete}
      okText={okText}
      cancelText={cancelText}
    >
      <Button type={buttonType}>{buttonText}</Button>
    </Popconfirm>
  );
};

// PROP TYPES
DeleteButton.propTypes = {
  /** */
  popconfirmText: PropTypes.string.isRequired,
  /** */
  handleDelete: PropTypes.func.isRequired,
};

// EXPORT DEFAULT
export default DeleteButton;
