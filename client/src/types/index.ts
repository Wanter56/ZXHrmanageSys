// 定义API通用响应类型：后端所有接口都返回该结构
export interface ApiResponse<T> {
  success: boolean; // 接口是否成功（true/false）
  data: T; // 实际业务数据（学生列表、单个学生等）
  message?: string; // 提示信息（如“添加成功”“id不存在”）
  code?: number; // 状态码（可选，如200、404、500）
}
// 学历枚举：限制可选值，避免非法数据
export enum EducationLevel {
  UNDERGRADUATE = "本科",
  MASTER = "硕士",
  DOCTOR = "博士",
}

// 学生类型：完全对齐后端字段，id为number
export interface Student {
  id?: number; // 新增时后端自动生成，故为可选
  name: string; // 必选：姓名
  age: number; // 必选：年龄（后端通常用number）
  phone: string; // 必选：电话号码（用string避免截断）
  email: string; // 必选：邮箱
  education: string; // 必选：学历（用枚举限制值）
  graduationschool: string; // 必选：毕业院校
  profession: string; // 必选：职业
  profile?: string; // 可选：个人简介（非必填）
}
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
export interface User {
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

// 定义图表数据类型（根据实际需求调整）
export interface ChartData {
  xdata?: string[];
  series?: echarts.SeriesOption[];
  [key: string]: any; // 支持饼图等其他数据格式
}

// 定义图表标题类型
export interface chartTitle {
  text: string;
  left: string;
}

// 定义图表组件属性类型
export interface EchartProps {
  className?: string;
  charData: ChartData;
  isAxisChart?: boolean; // true: 柱状图, false: 饼图
  charTitle: chartTitle;
  style?: React.CSSProperties; // 添加 style 属性\
}
