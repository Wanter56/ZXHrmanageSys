import React from "react";
import userpic from "../../common/img/user.jpg";
import { Avatar, Space } from "antd";

import React, { useState } from "react";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { Button, Layout, Menu, theme } from "antd";

const CommonHeader = () => {
  return (
    <div className="common-header-container">
      <div className="common-header">
        <span>织信人事系统</span>
      </div>
      <Space size={16} className="avatar">
        <Avatar size={64} src={userpic} />
      </Space>
    </div>
  );
};

export default CommonHeader;
