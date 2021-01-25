import React from "react";

import { BugOutlined } from "@ant-design/icons";

import moment from "moment";

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

const { message } = props;

  return (
    <div className="ErrorRow-Body">
      <div className="ErrorRow-Header">
        <BugOutlined className="ErrorRow-Icon" />
        Filtro de atributos - {moment(moment().toDate()).format("h:mm:ss, DD/MM/YYYY ")}{" "}
      </div>
      <div className="ErrorRow-Content">{message}</div>
    </div>
  );
};

export default ErrorRow;
