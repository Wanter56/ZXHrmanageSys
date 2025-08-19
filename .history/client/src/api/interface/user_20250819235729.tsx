/**
 * 大数字对象接口（用于处理MongoDB中的长数字类型）
 * 被 User 接口中的 bankNumber、idNumber 等字段引用
 */
export interface BigNumberObject {
  low: number; // 低32位数值
  high: number; // 高32位数值
  unsigned: boolean; // 是否为无符号数
}

/**
 * 员工完整信息接口（对应后端MongoDB用户模型）
 * 依赖 BigNumberObject 接口处理长数字类型字段
 */
export default interface User {
  _id: string; // MongoDB唯一ID
  __v: number; // MongoDB版本号
  accountName: string; // 账号名
  bankNumber: BigNumberObject; // 银行账号（关联BigNumberObject）
  department: string; // 所属部门
  education: number; // 学历编码（1=本科、2=硕士等）
  gender: number; // 性别（0=女，1=男）
  graduatedSchool: string; // 毕业院校
  idNumber: BigNumberObject; // 身份证号（关联BigNumberObject）
  identity: number; // 身份标识（1=正式员工、2=实习生等）
  level: number; // 职级编码
  marriage: number; // 婚姻状况（0=未婚、1=已婚等）
  mobile: number; // 手机号
  onboardingTime: string; // 入职时间（YYYY-MM-DD）
  password: string; // 密码（前端通常不显示）
  salary: number; // 薪资
  userName: string; // 姓名
}

/**
 * 员工表格展示接口（简化的User字段）
 * 从User接口中提取表格所需核心字段，不依赖BigNumberObject
 */
export interface TableItem {
  userName: string; // 姓名（来自User.userName）
  salary: number; // 薪资（来自User.salary）
  mobile: number; // 手机号（来自User.mobile）
}
