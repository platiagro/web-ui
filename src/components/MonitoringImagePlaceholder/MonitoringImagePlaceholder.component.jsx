/* eslint-disable */
import React from "react";
import Button from "uiComponents/Button/index";
import { PlusOutlined, FundOutlined } from "@ant-design/icons";
import { Menu } from "antd";

import "./MonitoringImagePlaceholder.component.style.less";

const { SubMenu } = Menu;

/**
 *
 * @param {*} props
 * @returns
 */
function MonitoringImagePlaceholder() {
  function handleClick(e) {
    console.log("click ", e);
    this.setState({ current: e.key });
  }
  return (
    <div>
      <div className="menuImage">
        <Menu
          onClick={handleClick}
          className="monitorinMune"
          defaultSelectedKeys={["1"]}
          defaultOpenKeys={["sub1"]}
          mode="inline"
        >
          <SubMenu key="sub4">
            <div className="elementButton">
              <div>
                <strong>Monitoramento</strong>
              </div>
              <div>
                <Button
                  disabled={false}
                  shape="round"
                  icon={<PlusOutlined />}
                  type="primary-inverse"
                >
                  Adicionar
                </Button>
              </div>
            </div>
            <div className="placeholdericon">
            <div className="icon">
            <FundOutlined />
            </div>
              <div>
                <strong>Nenhum monitoramento adicionado</strong>
              </div>
            </div>
          </SubMenu>
        </Menu>
      </div>
    </div>
  );
}

export default MonitoringImagePlaceholder;
