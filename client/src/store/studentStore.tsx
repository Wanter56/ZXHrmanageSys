// 1. 首先定义明确的类型（避免any，提升可维护性）
interface Student {
  id: string; // 学生唯一标识（从之前数据看存在字符串ID，如"d119"）
  name: string;
  age: string | number; // 兼容之前数据中age的字符串/数字格式
  phone: string;
  email: string;
  education: string;
  graduationschool: string; // 注意：建议统一为驼峰式 graduationSchool（需和接口对齐）
  profession: string;
  profile: string;
}

// 接口返回格式类型（避免依赖 response.data[0] 这种强耦合结构）
interface GetStudentsResponse {
  code?: number; // 假设接口有状态码（如0=成功）
  msg?: string; // 接口提示信息
  data:
    | {
        students: Student[]; // 学生列表数组（明确结构）
        [key: string]: any; // 兼容其他可能的字段
      }
    | { students: Student[] }[]; // 兼容原接口data是数组的情况（如response.data[0].students）
}

// 2. Zustand 状态存储（完善加载态、错误态、默认值）
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { getStudents } from "@api/dataApi/studentsApi";
import { message } from "antd"; // 引入UI库提示（可选，增强用户体验）

interface StudentStore {
  studentList: Student[]; // 学生列表（默认空数组，避免undefined）
  loading: boolean; // 加载态（控制加载动画）
  error: string | null; // 错误信息（null表示无错误）

  // 获取学生列表：支持手动传参（如分页、筛选，预留扩展性）
  getStudentList: (params?: Record<string, any>) => Promise<void>;

  // 可选：新增/编辑/删除学生的方法（按需添加，完善CRUD）
  addStudent: (student: Omit<Student, "id">) => void;
  updateStudent: (id: string, student: Partial<Student>) => void;
  deleteStudent: (id: string) => void;
}

const useStudentStore = create<StudentStore>()(
  immer((set, get) => ({
    // 初始状态（明确默认值）
    studentList: [],
    loading: false,
    error: null,

    // 核心：获取学生列表（优化点：加载态、错误处理、数据结构兼容）
    getStudentList: async (params = {}) => {
      // 1. 开始请求：设置加载态，清空旧错误
      set({ loading: true, error: null });

      try {
        // 2. 发起请求（支持传参，如分页page、筛选keyword）
        const response = (await getStudents(params)) as GetStudentsResponse;

        // 3. 兼容接口数据结构（解决原代码依赖 response.data[0] 的强耦合问题）
        let students: Student[] = [];
        // 判断data是数组还是对象，兼容两种格式
        if (Array.isArray(response.data)) {
          // 原格式：data是数组，取第一个元素的students（如response.data[0].students）
          const targetData = response.data[0] || {};
          students = targetData.students || [];
        } else {
          // 新格式：data是对象，直接取students（更符合常规接口设计）
          students = response.data.students || [];
        }

        // 4. 存储数据：使用immer可直接修改状态（无需浅拷贝）
        set({
          studentList: students,
          loading: false, // 请求成功：关闭加载态
        });

        // 可选：接口成功提示（如“获取学生列表成功”）
        message.success(response.msg || "获取学生列表成功");
      } catch (error: any) {
        // 5. 错误处理（捕获网络错误、接口错误）
        const errorMsg = error.message || "获取学生列表失败，请重试";
        set({
          error: errorMsg,
          loading: false, // 请求失败：关闭加载态
          studentList: [], // 错误时清空列表（可选，避免旧数据干扰）
        });

        // 可选：错误提示（用户可见）
        message.error(errorMsg);
        console.error("获取学生列表异常:", error); // 控制台打印详细错误，便于调试
      }
    },

    // 新增学生（基于immer的不可变更新）
    addStudent: (student) => {
      // 生成临时ID（实际项目建议用接口返回的ID）
      const newStudent = { ...student, id: `student_${Date.now()}` };
      set((state) => {
        state.studentList.push(newStudent);
      });
    },

    // 编辑学生（根据ID匹配，更新部分字段）
    updateStudent: (id, student) => {
      set((state) => {
        const targetIndex = state.studentList.findIndex((item) => item.id === id);
        if (targetIndex !== -1) {
          // 合并旧数据和新数据（避免覆盖未修改的字段）
          state.studentList[targetIndex] = { ...state.studentList[targetIndex], ...student };
        }
      });
    },

    // 删除学生（根据ID过滤）
    deleteStudent: (id) => {
      set((state) => {
        state.studentList = state.studentList.filter((item) => item.id !== id);
      });
    },
  }))
);

export default useStudentStore;
