import React from "react";

import PropTypes from "prop-types";

import { BugOutlined } from "@ant-design/icons";

import "./style.less";

/**
 * A error button
 *
 * @param {*} props Component props
 *
 * @returns {ErrorButton} Component
 *
 * @component
 */

const ErrorButton = (props) => {
  const { onClick, disabled, active } = props;
  return (
    <button className={disabled?"error-button-disabled":active?"error-button-active":"error-button"} onClick={onClick} disabled={disabled}>
      <BugOutlined />
      Error
    </button>
  );
};

// PROP TYPES
ErrorButton.propTypes = {
  /** click function */
  onClick: PropTypes.func.isRequired,
  /** disable function */
  disabled: PropTypes.bool.isRequired,
};


export default ErrorButton;

