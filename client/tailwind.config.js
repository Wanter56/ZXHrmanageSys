/** @type {import('tailwindcss').Config} */
module.exports = {
  // 通过类名切换深色模式（如 <html class="dark">）
  darkMode: 'class',
  // 指定需要扫描的文件（Tailwind 会从中提取类名生成样式）
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // 覆盖 src 目录下所有相关文件
  ],
  theme: { },
  plugins: [
  ],
}
