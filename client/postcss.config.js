/** @type {import('postcss').Config} */
export default {
  plugins: {
    // 关键修改：用 @tailwindcss/postcss 替代 tailwindcss
    '@tailwindcss/postcss': {}, 
    autoprefixer: {} // 保留 autoprefixer，无需修改
  }
};