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
    <Layout>
      <CommonSider />
      <Layout>
        <CommonHeader />
        <Content style={{ margin: "24px 16px 0" }}>
          <div
            style={{
              padding: 24,
              minHeight: 360,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            <Outlet />
          </div>
        </Content>
        <Footer style={{ textAlign: "center" }}>项目 ©{new Date().getFullYear()} Created by 王志豪</Footer>
      </Layout>
    </Layout>
  );
};
export default Main;
