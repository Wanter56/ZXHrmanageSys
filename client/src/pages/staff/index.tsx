import React, { useRef, useEffect, useState } from "react";
import { getStudents, addStudent, updateStudent, deleteStudent } from "@api/dataApi/studentsApi";
import { message } from "antd";
import type { FormProps } from "antd";
import { Student } from "@api/dataApi/studentsApi";
import StuModal from "./components/Modal";
import StuTable from "./components/StuTable";
import Filter from "./components/Filter";
const Staff: React.FC = () => {
  const [dataSource, setDataSource] = useState<Student[]>([]);
  const [visible, setVisible] = useState(false);
  const [isAdd, setIsAdd] = useState(true);
  const [currentId, setCurrentId] = useState<number | null>(null);
  const [currentStudent, setCurrentStudent] = useState<Student | undefined>();
  // 添加加载状态，避免重复提交
  const [loading, setLoading] = useState(false);
  // 新增：标记是否是首次加载
  const isFirstLoad = useRef(true);
  // 1. 新增：缓存上次请求成功的数据（用 useRef 避免状态更新触发重渲染）
  const cachedData = useRef<Student[]>([]);
  // 2. 新增：标记数据是否已缓存（避免首次加载也走缓存）
  const isDataCached = useRef(false);
  //展示筛选后的Table开关
  const [isShow, setIsShow] = useState(false);
  //筛选后的学生TableList数据
  const [filterStu, setFilterStu] = useState<Student[]>([]);
  // 初始加载和刷新数据
  useEffect(() => {
    fetchStudents();
  }, []);
  const stuList = isShow ? filterStu : dataSource;

  // 手动刷新数据的方法（如操作成功后调用）
  const refreshData = () => {
    fetchStudents();
  };

  // 获取学生列表数据
  const fetchStudents = async () => {
    setLoading(true);
    // 非首次加载时：先对比缓存，数据一致则直接返回，不发请求
    if (!isFirstLoad.current && isDataCached.current) {
      // 对比逻辑：简单场景用 JSON.stringify（复杂数据可用 lodash.isEqual）
      const isDataSame = JSON.stringify(cachedData.current) === JSON.stringify(dataSource);
      if (isDataSame) {
        message.info("数据未变化，无需刷新"); // 可选：提示用户
        setLoading(false);
        return; // 直接终止函数，不发请求、不更新状态
      }
    }

    try {
      const res = await getStudents();
      if (Array.isArray(res.data)) {
        cachedData.current = res.data;
        isDataCached.current = true;
        setDataSource(res.data);
      } else {
        message.error("获取数据失败: ");
      }
    } catch (err) {
      console.error("获取学生列表失败:", err);
      message.error("获取数据失败，请刷新页面重试");
      // 失败时保留旧数据
    } finally {
      setLoading(false);
      isFirstLoad.current = false; // 首次加载完成
    }
  };

  //事件代理和学生的CRUD
  // 统一表格子节点的事件代理处理
  const handleTableAction = (action: "edit" | "delete", rowData: Student) => {
    if (action === "edit") {
      setIsAdd(false);
      setCurrentId(rowData.id || null);
      setCurrentStudent(rowData);
      setVisible(true);
    } else if (action === "delete") {
      handleDelete(rowData);
    }
  };
  // 处理删除操作
  const handleDelete = async (rowData: Student) => {
    if (!rowData.id) {
      message.error("学生ID不存在，无法删除");
      return;
    }

    try {
      setLoading(true);
      const res = await deleteStudent(rowData.id);
      if (res) {
        // 删除成功后刷新列表
        isDataCached.current = false;
        refreshData();
        message.success("删除成功");
      } else {
        message.error("删除失败: ");
      }
    } catch (err) {
      console.error("删除失败:", err);
      message.error("删除失败，请重试");
    } finally {
      setLoading(false);
    }
  };

  // 表单提交处理函数
  const handleFinish: FormProps<Student>["onFinish"] = async (values) => {
    try {
      setLoading(true);
      const studentData = {
        ...values,
        age: Number(values.age), // 确保age是数字类型
      };

      if (isAdd) {
        // 新增学生
        const res = await addStudent(studentData);
        if (res) {
          message.success("添加成功");
          setVisible(false);
          isDataCached.current = false;
          refreshData(); // 重新获取列表，确保数据同步
        } else {
          message.error("添加失败: ");
        }
      } else if (currentId) {
        // 编辑学生
        const res = await updateStudent(currentId, studentData);
        if (res) {
          message.success("更新成功");
          setVisible(false);
          isDataCached.current = false;
          refreshData(); // 重新获取列表，确保数据同步
        } else {
          message.error("更新失败: ");
        }
      }
    } catch (err: any) {
      console.error(isAdd ? "添加失败:" : "更新失败:", err);
      message.error(`${isAdd ? "添加" : "更新"}失败: ${err.message || "网络错误"}`);
    } finally {
      setLoading(false);
    }
  };

  //Filter组建的筛选函数
  //1. Search事件处理函数
  const handleSearch = (e: any) => {
    const strKeyword = String(e).toLowerCase();
    const list = dataSource.filter((stu) => {
      return Object.values(stu).some((value) => {
        // 无论原始值是什么类型，都转为字符串后比较
        return String(value).toLowerCase().includes(strKeyword);
      });
    });
    setFilterStu(list);
    setIsShow(true);
  };
  //2.学历筛选函数
  const handleEduChange = (e: any) => {
    const edu = String(e).toLowerCase();
    const list = dataSource.filter((stu) => {
      return Object.values(stu).some((value) => {
        // 无论原始值是什么类型，都转为字符串后比较
        return String(value).toLowerCase().includes(edu);
      });
    });
    setFilterStu(list);
    setIsShow(true);
  };
  //3.年龄筛选函数
  const handleAgeChange = (e: any) => {
    // e 就是选择的年龄区间（如"25以下"、"25-35"等）
    const selectedRange = e;
    // 根据选择的区间筛选学生
    const list = dataSource.filter((stu) => {
      // 确保学生年龄是有效数字
      const age = Number(stu.age);
      switch (selectedRange) {
        case "25以下":
          return age < 25;
        case "25-35":
          return age >= 25 && age <= 35;
        case "35-50":
          return age > 35 && age <= 50;
        case "50以上":
          return age > 50;
        default:
          return true; // 默认返回所有学生（如未选择区间时）
      }
    });
    setFilterStu(list);
    setIsShow(true);
  };

  return (
    <div style={{ padding: "20px" }} className="flex flex-row w-full h-full ">
      <div className="w-[300px]">
        <Filter
          onAdd={() => {
            setIsAdd(true);
            setCurrentId(null);
            setCurrentStudent(undefined);
            setVisible(true);
          }}
          onSearch={handleSearch}
          onEducationChange={handleEduChange}
          onAgeRangeChange={handleAgeChange}
          loading={loading}
        />
      </div>
      <div className="w-[6px] border-none"></div>
      <div className="flex-1">
        <StuTable dataSource={stuList} loading={loading} onAction={handleTableAction} />
      </div>

      {/* 弹窗组件 */}
      <StuModal
        visible={visible}
        isAdd={isAdd}
        initialValues={currentStudent}
        loading={loading}
        onCancel={() => setVisible(false)}
        onFinish={handleFinish}
      />
    </div>
  );
};

export default Staff;
