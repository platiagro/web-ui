import React from "react";

import PropTypes from "prop-types";

import { InfoCircleOutlined } from "@ant-design/icons";

import "./style.less";

/**
 * A info button
 *
 * @param {*} props Component props
 *
 * @returns {InfoButton} Component
 *
 * @component
 */

const InfoButton = (props) => {
  const { onClick, disabled, active } = props;
  return (
    <button className={disabled?"info-button-disabled":active?"info-button-active":"info-button"} onClick={onClick} disabled={disabled}>
      <InfoCircleOutlined />
      Info
    </button>
  );
};

// PROP TYPES
InfoButton.propTypes = {
  /** click function */
  onClick: PropTypes.func.isRequired,
};


export default InfoButton;
