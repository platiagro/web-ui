// CORE LIBS
import React from "react";
import PropTypes from "prop-types";

// ANTD LIBS
import {
  RedoOutlined,
  UndoOutlined,
  DeleteOutlined,
  ZoomInOutlined,
  ZoomOutOutlined,
  ExpandOutlined,
} from "@ant-design/icons";

import { Button, Popconfirm } from "antd";

import { useZoomPanHelper } from "react-flow-renderer";

const ToolbarConfig = ({ handleDeleteClick, operator }) => {
  const { fitView, zoomTo, zoomIn, zoomOut } = useZoomPanHelper();

  const handleFitView = () => {
    fitView();
    zoomTo(1);
  };

  return (
    <>
      <Button icon={<UndoOutlined />} type="text" disabled />
      <Button icon={<RedoOutlined />} type="text" disabled />
      <Button icon={<ZoomInOutlined />} type="text" onClick={zoomIn} />
      <Button icon={<ZoomOutOutlined />} type="text" onClick={zoomOut} />
      <Button icon={<ExpandOutlined />} type="text" onClick={handleFitView} />
      <Popconfirm
        title="Você tem certeza que deseja excluir esta tarefa?"
        onConfirm={handleDeleteClick}
        okText="Sim"
        cancelText="Não"
        disabled={!operator?.uuid}
      >
        <Button
          icon={<DeleteOutlined />}
          type="text"
          disabled={!operator?.uuid}
        />
      </Popconfirm>
    </>
  );
};

// PROP TYPES
ToolbarConfig.propTypes = {
  /** remove operator button is disabled */
  disabled: PropTypes.bool,
  /** remove operator button click function */
  handleClick: PropTypes.func,
  /** is loading */
  loading: PropTypes.bool,
};

// EXPORT
export default ToolbarConfig;
