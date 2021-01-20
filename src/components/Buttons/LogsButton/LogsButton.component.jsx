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

  const  [ title, setTitle ] = useState(false);

    const content = title?"Ocultar histórico de erros":"Exibir histórico de erros";
    
  
  // rendering component LogsButton
  return (
    <Badge count={3}>
      <Tooltip
        title={content}
        placement="left"
        color="black"
        className="button-config"
      >
        <button onClick={()=>setTitle(!title)}>
          <AlertOutlined/>
        </button>
      </Tooltip>
    </Badge>
  );
};

// PROP TYPES
LogsButton.propTypes = {
  /** click function */
  onClick: PropTypes.func.isRequired,
};

// EXPORT DEFAULT
export default LogsButton;
