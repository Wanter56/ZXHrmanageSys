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
        <Footer style={{ textAlign: "center" }}>
          <p>项目 ©{new Date().getFullYear()} Created by wzh</p>
          <p>技术栈:React +Router +Zustand +Tyscript +less +Ant Design</p>
        </Footer>
      </Layout>
    </Layout>
  );
};
export default Main;
