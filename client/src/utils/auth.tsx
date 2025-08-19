/**
 * 判断当前用户是否为管理员
 * @returns boolean
 */
export const isAdmin = (): boolean => {
  try {
    const role = localStorage.getItem("userRole");
    return role === "admin";
  } catch (error) {
    console.error("判断用户角色失败:", error);
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
