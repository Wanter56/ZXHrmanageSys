import React, { useState, useEffect } from "react";
import SmCodeLogin from "./components/SmCodeLogin";
import AccountLogin from "./components/AccountLogin";
import IconMap from "./Icon/IconMap";
import { getUsers } from "../../api/dataApi/usersApi";

//使用antd的form表单的相关组件
import { Button, Form, Input, Row, Col } from "antd";
import logImg from "../../common/img/logo.svg";

import "./css/login.less";

const FormItem = Form.Item;

const Login: React.FC = function () {
  useEffect(() => {
    getUsers().then((res) => {
      const users = res."data";
      console.log(users);
    });
  }, []);

  const [form] = Form.useForm();
  const [type, setType] = useState(0);

  //表单完成输入之后的提交事件
  const submitUserInfo = (data: any) => {
    console.log(data);
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
