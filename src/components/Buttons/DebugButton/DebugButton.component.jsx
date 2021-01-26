import React from "react";
import PropTypes from "prop-types";

import { CodeOutlined } from "@ant-design/icons";

import "./style.less";

/**
 * A debug button
 *
 * @param {*} props Component props
 *
 * @returns {DebugButton} Component
 *
 * @component
 */

const DebugButton = (props) => {
  const { onClick, active, disabled } = props;
  return (
    <button
      disabled={disabled}
      className={disabled?"debug-button-disabled":active ? "debug-button" : "debug-button-active"}
      onClick={onClick}
    >
      <CodeOutlined />
      Debug
    </button>
  );
};

// PROP TYPES
DebugButton.propTypes = {
  /** click function */
  onClick: PropTypes.func.isRequired,
};

export default DebugButton;
