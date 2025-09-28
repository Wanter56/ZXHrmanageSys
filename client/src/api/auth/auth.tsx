// @utils/auth.ts 中 isAdmin 函数需正确实现
export const isAdmin = (): boolean => {
  try {
    const userStr = localStorage.getItem("currentUser");
    if (!userStr) return false;
    const user = JSON.parse(userStr);
    return user.identity === 1; // 确保identity=1是管理员
  } catch (error) {
    console.error("判断管理员失败:", error);
    return false;
  }
};
/**
 * 获取当前用户信息
 * @returns 用户信息对象或null
 */
export const getCurrentUser = (): any => {
  try {
    const userStr = localStorage.getItem("currentUser");
    return userStr ? JSON.parse(userStr) : null;
  } catch (error) {
    console.error("获取用户信息失败:", error);
    return null;
  }
};
