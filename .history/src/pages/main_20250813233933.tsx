import { Outlet } from "react-router-dom";
import CommonSider from "../elements/commonSider";
import CommonHeader from "../elements/commonHeader";

import { Layout, Menu, theme } from "antd";

const { Header, Content, Footer, Sider } = Layout;

const Main = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  return (
    <Layout className="main-container">
      <CommonSider />
      <Layout>
        <CommonHeader />
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};
export default Main;
