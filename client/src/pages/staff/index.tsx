import React, { useEffect, useState } from "react";
import { getStudents, addStudent, updateStudent, deleteStudent } from "@api/dataApi/studentsApi";
import { message } from "antd";
import type { FormProps } from "antd";
import { Student } from "@api/dataApi/studentsApi";

//自定义组件和样式
import "./staff.less";
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

  // 获取学生列表数据
  const fetchStudents = async () => {
    try {
      const res = await getStudents();
      if (res.success && Array.isArray(res.data)) {
        setDataSource(res.data);
      } else {
        message.error("获取数据失败: " + (res.message || "未知错误"));
      }
    } catch (err) {
      console.error("获取学生列表失败:", err);
      message.error("获取数据失败，请刷新页面重试");
    }
  };

  // 初始加载和刷新数据
  useEffect(() => {
    fetchStudents();
  }, []);
  // 处理新增/编辑按钮点击
  const handleClick = (type: string, rowData?: Student) => {
    if (type === "edit" && rowData) {
      setIsAdd(false);
      setCurrentId(rowData.id || null);
      setCurrentStudent(rowData);
      setVisible(true);
    } else if (type === "add") {
      setIsAdd(true);
      setCurrentId(null);
      setCurrentStudent(undefined);
      setVisible(true);
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
      if (res.success) {
        // 删除成功后刷新列表
        fetchStudents();
        message.success("删除成功");
      } else {
        message.error("删除失败: " + (res.message || "未知错误"));
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

      // 数据预处理 - 确保类型正确
      const studentData = {
        ...values,
        age: Number(values.age), // 确保age是数字类型
      };

      if (isAdd) {
        // 新增学生
        const res = await addStudent(studentData);
        if (res.success) {
          message.success("添加成功");
          setVisible(false);
          fetchStudents(); // 重新获取列表，确保数据同步
        } else {
          message.error("添加失败: " + (res.message || "未知错误"));
        }
      } else if (currentId) {
        // 编辑学生
        const res = await updateStudent(currentId, studentData);
        if (res.success) {
          message.success("更新成功");
          setVisible(false);
          fetchStudents(); // 重新获取列表，确保数据同步
        } else {
          message.error("更新失败: " + (res.message || "未知错误"));
        }
      }
    } catch (err: any) {
      console.error(isAdd ? "添加失败:" : "更新失败:", err);
      message.error(`${isAdd ? "添加" : "更新"}失败: ${err.message || "网络错误"}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "20px" }} className="staff-container">
      <div className="control-container">
        <Filter onAdd={() => handleClick("add")} loading={loading} />
      </div>
      <div className="border"></div>
      <div className="table-container">
        <StuTable
          dataSource={dataSource}
          loading={loading}
          onEdit={(rowData) => handleClick("edit", rowData)}
          onDelete={handleDelete}
        />
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
