// eslint.config.js
import js from "@eslint/js";
import globals from "globals";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import tseslint from "typescript-eslint";
import { globalIgnores } from "eslint/config";
import { messages } from "@eslint/i18n/locales/zh-CN";

// 自定义规则（根据项目需求调整）
const customRules = {
  // JavaScript 基础规则
  "no-console": ["warn", { allow: ["warn", "error"] }], // 允许 console.warn/error，其他警告
  "no-debugger": "error", // 禁止 debugger
  "no-unused-vars": "off", // TypeScript 项目由 @typescript-eslint 接管

  // TypeScript 规则
  "@typescript-eslint/no-unused-vars": ["warn", { argsIgnorePattern: "^_" }], // 允许下划线开头的未使用参数
  "@typescript-eslint/explicit-module-boundary-types": "off", // 不强制导出函数显式声明返回类型
  "@typescript-eslint/no-explicit-any": "warn", // any 类型警告（而非报错）
  "@typescript-eslint/consistent-type-imports": "error", // 强制使用 import type 导入类型

  // React 规则
  "react/react-in-jsx-scope": "off", // React 17+ 无需显式导入 React
  "react/prop-types": "off", // TypeScript 项目无需 prop-types
  "react/jsx-filename-extension": ["error", { extensions: [".tsx"] }], // 仅允许 .tsx 文件使用 JSX

  // React Hooks 规则
  "react-hooks/rules-of-hooks": "error", // 强制 Hooks 使用规则（如不能在条件中调用）
  "react-hooks/exhaustive-deps": "warn", // 依赖项不完整时警告（避免过度严格）

  // React Refresh 规则（Vite 热更新）
  "react-refresh/only-export-components": ["warn", { allowConstantExport: true }], // 允许导出常量
};

export default tseslint.config([
  // 全局忽略文件/目录
  globalIgnores([
    "dist", // 构建输出目录
    "node_modules", // 依赖目录
    "*.d.ts", // 类型声明文件
    "*.config.js", // 配置文件（如 vite.config.js）
    "public", // 静态资源目录
  ]),

  // 核心配置（作用于 TS/TSX 文件）
  {
    files: ["**/*.{ts,tsx}"], // 匹配所有 TypeScript 和 TSX 文件
    ignores: ["**/node_modules/**"], // 忽略 node_modules 下的文件

    // 继承预设规则
    extends: [
      js.configs.recommended, // ESLint 官方 JS 推荐规则
      ...tseslint.configs.recommended, // TypeScript 推荐规则
      ...tseslint.configs.stylistic, // TypeScript 代码风格规则（如空格、引号）
      react.configs.recommended, // React 官方推荐规则
      react.configs["jsx-runtime"], // 适配 React 17+ JSX 自动导入
      reactHooks.configs["recommended-latest"], // 最新 React Hooks 规则
      reactRefresh.configs.vite, // Vite 环境 React 热更新规则
    ],

    // 语言解析配置
    languageOptions: {
      parser: tseslint.parser, // TypeScript 解析器（必须）
      parserOptions: {
        ecmaFeatures: { jsx: true }, // 支持 JSX 语法
        project: ["./tsconfig.json", "./tsconfig.app.json"], // 关联 TS 配置文件（启用类型检查）
        tsconfigRootDir: import.meta.url, // 明确 TS 配置根目录
      },
      ecmaVersion: "latest", // 支持最新 ES 语法
      globals: {
        ...globals.browser, // 浏览器环境全局变量（window、document 等）
        ...globals.es2025, // ES2025 全局变量（如 Array.prototype.at）
        React: "writable", // 声明 React 全局变量（避免导入警告）
      },
      messages, // 启用中文提示
    },

    // 插件配置（显式声明使用的插件）
    plugins: {
      react,
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
      "@typescript-eslint": tseslint.plugin,
    },

    // 自定义规则（覆盖预设）
    rules: customRules,
  },
]);
