import React from "react";
import "./CommonHeader.less";
import userpic from "../../common/img/user.jpg";
import { Avatar, Space } from "antd";
const CommonHeader = () => {
  return (
    <div className="common-header-container">
      <div className="common-header">
        <div className="char">织</div>
        <div className="char">信</div>
        <div className="char">人</div>
        <div className="char">事</div>
        <div className="char">管</div>
        <div className="char">理</div>
        <div className="char">系</div>
        <div className="char">统</div>
      </div>
      <Space direction="vertical" size={16}>
        <Space wrap size={16}>
          <Avatar size={64} icon={<UserOutlined />} />
        </Space>
      </Space>
    </div>
  );
};

export default CommonHeader;
