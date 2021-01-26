import React from "react";
import PropTypes from 'prop-types';

import { CodeOutlined } from "@ant-design/icons";

import "./style.less";

/**
 * A debug row.
 *
 * @param {object} props Component props
 *
 * @returns {DebugRow} Component
 *
 * @component
 */

const DebugRow = (props) => {
  const { title, dateTime, message } = props;

  return (
    <div className="DebugRow-Body">
      <div className="DebugRow-Header">
        <CodeOutlined className="DebugRow-Icon" />
        {title}
        {dateTime}
      </div>
      <div className="DebugRow-Content">{message}</div>
    </div>
  );
};

// PROP TYPES
DebugRow.propTypes = {
  /** */
  title: PropTypes.string.isRequired,
  /** */
  dateTime: PropTypes.string.isRequired,
  /** */
  message: PropTypes.string.isRequired,
};


export default DebugRow;
