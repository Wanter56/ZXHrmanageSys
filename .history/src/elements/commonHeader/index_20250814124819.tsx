import React from "react";
import userpic from "../../common/img/user.jpg";
import { Avatar, Space } from "antd";
import "./CommonHeader.less";

const CommonHeader = () => {
  return (
    <div className="common-header-container">
      <div className="common-header">织信人事系统</div>
      <Space size={16} className="avtar">
        <Avatar size={64} src={userpic} />
      </Space>
    </div>
  );
};

export default CommonHeader;
