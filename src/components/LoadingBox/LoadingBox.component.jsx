import React from "react";
import PropTypes from 'prop-types';

//UI Libs
import { Skeleton } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

// STYLES
import "./LoadingBox.style.less";

const LoadingBox = (props) => {

    const { siderColor, absolute } = props;

    return (
        <div className="loading-container">
        <div className={"card-loading skeleton-task-box"} style={absolute?{position:'absolute'}:{}}>
            <div className="siders" style={{backgroundColor: siderColor}}>
            <div style={{ fontSize: "18px" }}>
                <LoadingOutlined spin />
            </div>
            </div>
            <div className="middle" style={{ padding: "16px 12px 0" }}>
            <Skeleton
                active
                paragraph={{ rows: 1, width: "100%" }}
                size="large"
                title={false}
            />
            </div>
            <div className="siders" style={{backgroundColor: siderColor}}></div>
        </div>
        </div>
    );
};

LoadingBox.propTypes = {
    siderColor: PropTypes.string,
    absolute: PropTypes.bool
  }
  
LoadingBox.defaultProps = {
    siderColor: '#f9f0ff',
    absolute: true
}

export default LoadingBox;
