import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import SmCodeLogin from "./components/SmCodeLogin";
import AccountLogin from "./components/AccountLogin";
import IconMap from "./Icon/IconMap";
import { getUsers } from "../../api/dataApi/usersApi";

//使用antd的form表单的相关组件
import { Button, Form, Input, Row, Col, message } from "antd";
import logImg from "../../common/img/logo.svg";

import "./css/login.less";

const FormItem = Form.Item;

const Login: React.FC = function () {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [type, setType] = useState(0);

  //表单完成输入之后的提交事件
  const submitUserInfo = async (data: any) => {
    try {
      const res = await getUsers();
      const usersList = res || []; // 防止 res 为 undefined

      // 过滤无效用户（排除账号/密码为空的情况）
      const validUsers = usersList.filter(
        (user) => typeof user?.accountName === "string" && typeof user?.password === "string"
      );

      // 查找匹配的用户
      const user = validUsers.find((item) => {
        const nameMatch = item.accountName.trim() === data.accountName.trim(); // 去空格比较
        const pwdMatch = item.password === data.password; // 注意：加密密码需用专门方法验证
        console.log(`匹配 ${item.accountName}：`, nameMatch, "，密码匹配：", pwdMatch);
        return nameMatch && pwdMatch;
      });

      if (user) {
        // 登录成功：保存状态并跳转
        localStorage.setItem("currentUser", JSON.stringify(user));
        navigate("/dashboard");
      } else {
        // 登录失败：清除状态、提示错误再跳转
        localStorage.removeItem("currentUser");
        message.error("账号或密码错误");
        setTimeout(() => navigate("/login"), 1000);
      }
    } catch (err) {
      // 捕获接口请求错误
      console.error("获取用户列表失败：", err);
      message.error("登录失败，请重试");
    }
  };

  //组件选择的容器函数
  const ComponentsSelector = (props: any) => {
    return !type ? <AccountLogin {...props} /> : <SmCodeLogin {...props} />;
  };
  return (
    <div className="form">
      <div className="logo">
        <img src={logImg} />
        <span>织信人事管理系统</span>
      </div>
      <Form form={form} onFinish={submitUserInfo}>
        {ComponentsSelector({ form, FormItem, Input })}
        <Row>
          <Button type="primary" htmlType="submit" block>
            登录
          </Button>
        </Row>
        <Row className="ft-12">
          <Col span={6}>
            <span>忘记密码？</span>
          </Col>
          <Col span={18} className="align-right">
            {!type ? (
              <span onClick={() => setType(1)}>手机号加验证码登录</span>
            ) : (
              <span onClick={() => setType(0)}>使用账户名密码进行登录</span>
            )}
            {IconMap.arrowRight}
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default Login;
