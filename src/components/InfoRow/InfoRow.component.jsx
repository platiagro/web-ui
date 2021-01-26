import React from "react";

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

export default InfoRow;
