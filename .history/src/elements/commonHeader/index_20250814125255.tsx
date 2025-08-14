import React from "react";
import userpic from "../../common/img/user.jpg";
import { Avatar, Space } from "antd";
import "./CommonHeader.less";

const CommonHeader = () => {
  return (
    <div className="common-header-container">
      <div className="common-header">
        <span>justify-content: space-between; align-items: center;</span>
      </div>
      <Space size={16} className="avatar">
        <Avatar size={64} src={userpic} />
      </Space>
    </div>
  );
};

export default CommonHeader;
