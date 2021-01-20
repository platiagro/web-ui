import React, { useState } from "react";
import PropTypes from "prop-types";

import { Tooltip, Badge } from "antd";
import { AlertOutlined } from "@ant-design/icons";

import "./style.less";

/**
 * A button to hide error history
 *
 * @param {*} props Component props
 *
 * @returns {LogsButton} Component
 *
 * @component
 */

const LogsButton = () => {

  const [ active, setActive ] = useState(true);
  const [ title, setTitle ] = useState(false);
  const [ count, setCount ] = useState(6);

    const content = title?"Ocultar histórico de erros":"Exibir histórico de erros";
    
    const errorCount = count;

  // rendering component LogsButton
  return (
    <Badge count={errorCount}>
      <Tooltip
        title={content}
        placement="left"
        color="black"
        className={active?"black":"white"}
      >
        <button onClick={()=>{{setTitle(!title) 
        setActive(!active)}}}>
          <AlertOutlined/>
        </button>
      </Tooltip>
    </Badge>
  );
};

// PROP TYPES
LogsButton.propTypes = {
  /* click function */
  onClick: PropTypes.func.isRequired,
  /*error count function */
  errorCount: PropTypes.number.isRequired,
  /*button activated state */
  active: PropTypes.bool.isRequired,
};

// EXPORT DEFAULT
export default LogsButton;
