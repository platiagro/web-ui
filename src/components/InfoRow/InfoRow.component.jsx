import React from "react";

import { InfoCircleOutlined } from "@ant-design/icons";

import moment from "moment";

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

const { message } = props;

  return (
    <div className="InfoRow-Body">
      <div className="InfoRow-Header">
        <InfoCircleOutlined className="InfoRow-Icon" />
        Filtro de atributos - {moment(moment().toDate()).format("h:mm:ss, DD/MM/YYYY ")}{" "}
      </div>
      <div className="InfoRow-Content">{message}</div>
    </div>
  );
};

export default InfoRow;
