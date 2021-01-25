import React from "react";

import { CodeOutlined } from "@ant-design/icons";

import moment from "moment";

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

const { message } = props;

  return (
    <div className="DebugRow-Body">
      <div className="DebugRow-Header">
        <CodeOutlined className="DebugRow-Icon" />
        Filtro de atributos - {moment(moment().toDate()).format("h:mm:ss, DD/MM/YYYY ")}{" "}
      </div>
      <div className="DebugRow-Content">{message}</div>
    </div>
  );
};

export default DebugRow;
