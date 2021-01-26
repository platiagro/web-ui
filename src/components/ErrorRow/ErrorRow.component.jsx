import React from "react";
import PropTypes from 'prop-types';

import { BugOutlined } from "@ant-design/icons";

import "./style.less";

/**
 * An error row.
 *
 * @param {object} props Component props
 *
 * @returns {ErrorRow} Component
 *
 * @component
 */

const ErrorRow = (props) => {
  const { title, dateTime, message } = props;

  return (
    <div className="ErrorRow-Body">
      <div className="ErrorRow-Header">
        <BugOutlined className="ErrorRow-Icon" />
        {title}
        {dateTime}
      </div>
      <div className="ErrorRow-Content">{message}</div>
    </div>
  );
};

// PROP TYPES
ErrorRow.propTypes = {
  /** */
  title: PropTypes.string.isRequired,
  /** */
  dateTime: PropTypes.string.isRequired,
  /** */
  message: PropTypes.string.isRequired,
};

export default ErrorRow;
