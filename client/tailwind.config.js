/** @type {import('tailwindcss').Config} */
module.exports = {
  // 配置深色模式切换方式
  darkMode: 'class', // 关键：通过类名切换深色模式
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}