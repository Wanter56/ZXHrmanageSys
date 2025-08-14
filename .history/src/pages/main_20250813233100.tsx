import { Outlet } from "react-router-dom";
import { Layout, theme } from "antd";
import CommonSider from "../elements/commonSider";
import CommonHeader from "../elements/commonHeader";
const { Content } = Layout;
const Main = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  return (
    <Layout>
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
