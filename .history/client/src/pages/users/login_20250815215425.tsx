import React, { useState } from "react";
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
  const fromPath = "/dashboard";

  //表单完成输入之后的提交事件
  const submitUserInfo = (data: any) => {
    // 1. 先清除可能的旧登录状态（关键！）
    localStorage.removeItem("currentUser");
    sessionStorage.clear();
    try {
      const res = getUsers();
      if (!res) {
        // 若响应为空，直接提示错误
        message.error("服务器返回数据异常，请重试");
        return;
      }
      const usersList = res.data || [];

      // 2. 严格过滤有效用户（排除异常数据）
      const validUsers = usersList.filter(
        (user) =>
          typeof user?.accountName === "string" &&
          typeof user?.password === "string" &&
          user.accountName.trim() !== "" &&
          user.password.trim() !== ""
      );
      // 3. 精确匹配账号密码（去除输入空格）
      const inputAccount = data.accountName?.trim() || "";
      const inputPassword = data.password?.trim() || "";
      const matchedUser = validUsers.find(
        (user) => user.accountName.trim() === inputAccount && user.password === inputPassword
      );

      // 4. 根据匹配结果处理
      if (matchedUser) {
        // 登录成功后的处理
        if (matchedUser) {
          localStorage.setItem("currentUser", JSON.stringify(matchedUser));
          message.success("登录成功");
          navigate(fromPath, { replace: true }); // 跳转到原始访问路径
        }
      } else {
        // 登录失败：强制停留在登录页并提示
        // 不执行任何跳转，保持在当前登录页
        message.error("账号或密码错误，请重新输入");
      }
    } catch (err) {
      console.error("登录请求失败:", err);
      // 确保在捕获错误时触发 message 组件
      message.error("服务器异常，登录失败");
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
