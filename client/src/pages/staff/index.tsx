import React, { use, useEffect, useState } from "react"; // 无需额外的useState

//导入管理学生的API
import { getStudents, addStudent, updateStudent, deleteStudent } from "@api/dataApi/studentsApi";
//学生类型
import type { Student } from "@store/studentStore";

import { Table, Input, Button, Select, Modal, Form, Popconfirm } from "antd";
import type { TableColumnsType } from "antd";

import "./staff.less";

const { Search } = Input;
const Staff: React.FC = () => {
  //表格数据
  const [dataSource, setDataSource] = useState([]);
  // 控制弹窗打开/关闭状态
  const [visible, setVisible] = useState(false);
  //控制按钮保存/新增
  const [isAdd, setIsAdd] = useState(true);
  //创建form实例
  const [form] = Form.useForm();

  //学生的CRUD操作
  //获取表格数据所有学生
  useEffect(() => {
    getStudents().then((res) => {
      console.log(res);
      setDataSource(res.data[0].students);
    });
  }, []);
  //编辑和新增函数
  const handleClick = (type: string, rowData?: Student) => {
    if (type === "edit" && rowData) {
      setIsAdd(false);
      setVisible(true);
      form.setFieldsValue(rowData); // 使用form实例设置表单初始值
    } else if (type === "add") {
      setIsAdd(true);
      setVisible(true);
      form.resetFields();
    }
  };
  const handleDelete = (rowData: Student) => {
    console.log(rowData);
  };

  //表单提交函数
  const handleFinish = (e) => {
    console.log(e);
  };

  const columns: TableColumnsType = [
    {
      title: "姓名",
      dataIndex: "name",
      width: 150,
    },
    {
      title: "年龄",
      dataIndex: "age",
      width: 150,
    },
    {
      title: "联系方式",
      dataIndex: "phone",
      width: 150,
    },
    {
      title: "学历",
      dataIndex: "education",
      width: 150,
    },
    {
      title: "毕业院校",
      dataIndex: "graduationschool",
      width: 150,
    },
    {
      title: "岗位",
      dataIndex: "profession",
      width: 150,
    },
    {
      title: "操作",
      width: 150,
      render: (rowData: Student) => {
        return (
          <div style={{ display: "flex", alignItems: "center" }}>
            <Button style={{ marginRight: "10px" }} onClick={() => handleClick("edit", rowData)}>
              详情
            </Button>
            <Popconfirm
              title="提示"
              description="此操作将删除该用户，是否继续？"
              okText="确认"
              cancelText="取消"
              onConfirm={() => handleDelete(rowData)}
            >
              <Button type="primary" danger>
                删除
              </Button>
            </Popconfirm>
          </div>
        );
      },
    },
  ];

  return (
    <div style={{ padding: "20px" }} className="staff-container">
      <div className="control-container">
        <Button type="primary" style={{ margin: 20, width: "85px", marginLeft: 10 }} onClick={() => handleClick("add")}>
          添加
        </Button>
        <Search placeholder="" enterButton style={{ marginBottom: 20 }} />

        <Select
          style={{ width: "100%", marginBottom: 20 }}
          placeholder="请选择学历"
          options={[
            {
              value: "本科",
              label: "本科",
            },
            {
              value: "硕士",
              label: "硕士",
            },
            {
              value: "博士",
              label: "博士",
            },
          ]}
        />
        <Select
          style={{ width: "100%" }}
          placeholder="请选择年龄"
          options={[
            {
              value: "25以下",
              label: "25以下",
            },
            {
              value: "25-35",
              label: "25-35",
            },
            {
              value: "35-50",
              label: "35-50",
            },
            {
              value: "50以上",
              label: "50以上",
            },
          ]}
        />
        <div className="filter-container"></div>
      </div>
      <div className="border"></div>
      <div className="table-container">
        {dataSource.length > 0 && (
          <Table columns={columns} dataSource={dataSource} pagination={{ pageSize: 10 }} rowKey="id" />
        )}
      </div>
      {/* 弹窗组件 */}
      <Modal
        width={600}
        footer={null}
        open={visible}
        onCancel={() => setVisible(false)}
        title={isAdd ? "添加学生" : "编辑学生"}
      >
        <Form layout="vertical" initialValues={{ age: "", phone: "", email: "" }} form={form} onFinish={handleFinish}>
          <Form.Item name="name" label="姓名" rules={[{ required: true, message: "请输入学生姓名" }]}>
            <Input placeholder="请输入姓名" />
          </Form.Item>

          <Form.Item name="age" label="年龄" rules={[{ required: true, message: "请输入年龄" }]}>
            <Input type="number" placeholder="请输入年龄" />
          </Form.Item>

          <Form.Item name="phone" label="联系方式" rules={[{ required: true, message: "请输入手机号" }]}>
            <Input placeholder="请输入手机号" />
          </Form.Item>

          <Form.Item name="email" label="邮箱" rules={[{ required: true, message: "请输入邮箱" }]}>
            <Input placeholder="请输入邮箱（如xxx@xxx.com）" />
          </Form.Item>

          <Form.Item name="education" label="学历" rules={[{ required: true, message: "请选择学历" }]}>
            <Select placeholder="请选择学历" allowClear>
              <Select.Option value="1">本科</Select.Option>
              <Select.Option value="2">硕士</Select.Option>
              <Select.Option value="3">博士</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item name="graduationschool" label="毕业院校" rules={[{ required: true, message: "请输入毕业院校" }]}>
            <Input placeholder="请输入毕业院校" />
          </Form.Item>

          <Form.Item name="profession" label="职业" rules={[{ required: true, message: "请输入职业" }]}>
            <Input placeholder="请输入职业（如学生、工程师）" />
          </Form.Item>

          <Form.Item name="profile" label="个人简介" rules={[{ required: false }]}>
            <Input.TextArea rows={4} placeholder="请输入个人简介（选填）" />
          </Form.Item>

          <Form.Item style={{ textAlign: "right" }}>
            <Button style={{ marginRight: 8 }}>取消</Button>
            <Button type="primary" htmlType="submit">
              {isAdd ? "新增" : "保存"}
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Staff;
