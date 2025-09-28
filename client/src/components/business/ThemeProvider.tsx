// src/components/ThemeProvider.tsx
import { ConfigProvider } from "antd";
import { useThemeStore } from "@store";

export const ThemeProvider = ({ children }) => {
  const { theme } = useThemeStore();

  // 根据主题设置AntD配置
  const antdTheme = {
    token: {
      colorBgContainer: theme === "dark" ? "#111827" : "#ffffff",
      colorText: theme === "dark" ? "#f3f4f6" : "#1f2937",
    },
  };

  return <ConfigProvider theme={antdTheme}>{children}</ConfigProvider>;
};
