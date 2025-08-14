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
  const submitUserInfo = (data: any) => {
    //与usersList中各数据中的aacountName与password进行比较
    getUsers().then((res) => {
      const usersList = res;
      console.log(usersList);
      const user = usersList.find(
        (item: any) => item.accountName === data.accountName && item.password === data.password
      );
      console.log(
        "用户名比较：",
        user.accountName,
        "===",
        data.accountName,
        "→",
        user.accountName === data.accountName
      );
      console.log("密码比较：", user.password, "===", data.password, "→", user.password === data.password);
      if (user) {
        navigate("/dashboard");
      } else {
        navigate("/login");
        message.error("账号或密码错误");
      }
    });
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
