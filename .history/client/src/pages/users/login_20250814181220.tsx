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

  const Login: React.FC = function () {
    const navigate = useNavigate();
    const location = useLocation();

    // 获取登录前的原始路径，默认跳转到dashboard
    const fromPath = (location.state as { from?: string })?.from || "/dashboard";

    // 登录成功后的处理
    if (matchedUser) {
      localStorage.setItem("currentUser", JSON.stringify(matchedUser));
      message.success("登录成功");
      navigate(fromPath, { replace: true }); // 跳转到原始访问路径
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
