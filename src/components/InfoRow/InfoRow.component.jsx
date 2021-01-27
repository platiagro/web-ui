import React from "react";
import PropTypes from 'prop-types';

import { InfoCircleOutlined } from "@ant-design/icons";

import "./style.less";

/**
 * A information row.
 *
 * @param {object} props Component props
 *
 * @returns {InfoRow} Component
 *
 * @component
 */

const InfoRow = (props) => {
  const { title, dateTime, message } = props;

  return (
    <div className="InfoRow-Body">
      <div className="InfoRow-Header">
        <InfoCircleOutlined className="InfoRow-Icon" />
        {title}
        {dateTime}
      </div>
      <div className="InfoRow-Content">{message}</div>
    </div>
  );
};

// PROP TYPES
InfoRow.propTypes = {
  /** */
  title: PropTypes.string.isRequired,
  /** */
  dateTime: PropTypes.string.isRequired,
  /** */
  message: PropTypes.string.isRequired,
};

export default InfoRow;
