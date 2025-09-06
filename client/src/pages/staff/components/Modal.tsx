import React from "react";
import { Modal, Form, Input, Button, Select } from "antd";
import type { FormProps } from "antd";
import { Student } from "@api/dataApi/studentsApi";

const { Option } = Select;

interface StuModalProps {
  visible: boolean;
  isAdd: boolean;
  initialValues?: Partial<Student>;
  loading: boolean;
  onCancel: () => void;
  onFinish: (values: Student) => Promise<void>;
}

const StuModal: React.FC<StuModalProps> = ({ visible, isAdd, initialValues, loading, onCancel, onFinish }) => {
  const [form] = Form.useForm();

  // 当弹窗显示状态或初始值变化时更新表单
  React.useEffect(() => {
    if (visible) {
      if (initialValues) {
        form.setFieldsValue({
          ...initialValues,
          age: initialValues.age || 0,
        });
      } else {
        form.resetFields();
      }
    }
  }, [visible, initialValues, form]);

  const handleFinish: FormProps<Student>["onFinish"] = async (values) => {
    // 数据预处理
    const studentData = {
      ...values,
      age: Number(values.age),
      education: values.education?.trim() || "",
    };

    await onFinish(studentData);
  };

  return (
    <Modal
      className="bg-box-bg"
      width={600}
      footer={null}
      open={visible}
      onCancel={onCancel}
      title={isAdd ? "添加学生" : "编辑学生"}
      maskClosable={false}
    >
      <Form
        className="bg-box-bg text-heading-2"
        layout="vertical"
        form={form}
        onFinish={handleFinish}
        initialValues={{ phone: "", email: "" }}
      >
        <Form.Item name="name" label="姓名" rules={[{ required: true, message: "请输入学生姓名" }]}>
          <Input placeholder="请输入姓名" />
        </Form.Item>

        <Form.Item name="age" label="年龄" rules={[{ required: true, message: "请输入年龄" }]}>
          <Input type="number" placeholder="请输入年龄" />
        </Form.Item>

        <Form.Item name="phone" label="联系方式" rules={[{ required: true, message: "请输入手机号" }]}>
          <Input placeholder="请输入手机号" />
        </Form.Item>

        <Form.Item
          name="email"
          label="邮箱"
          rules={[
            { required: true, message: "请输入邮箱" },
            { type: "email", message: "请输入有效的邮箱地址" },
          ]}
        >
          <Input placeholder="请输入邮箱（如xxx@xxx.com）" />
        </Form.Item>

        <Form.Item name="education" label="学历" rules={[{ required: true, message: "请选择学历" }]}>
          <Select placeholder="请选择学历" allowClear>
            <Option value="本科">本科</Option>
            <Option value="硕士">硕士</Option>
            <Option value="博士">博士</Option>
          </Select>
        </Form.Item>

        <Form.Item name="graduationschool" label="毕业院校" rules={[{ required: true, message: "请输入毕业院校" }]}>
          <Input placeholder="请输入毕业院校" />
        </Form.Item>

        <Form.Item name="profession" label="职业" rules={[{ required: true, message: "请输入职业" }]}>
          <Input placeholder="请输入职业（如学生、工程师）" />
        </Form.Item>

        <Form.Item name="profile" label="个人简介">
          <Input.TextArea rows={4} placeholder="请输入个人简介（选填）" />
        </Form.Item>

        <Form.Item style={{ textAlign: "right" }}>
          <Button style={{ marginRight: 8 }} onClick={onCancel} disabled={loading}>
            取消
          </Button>
          <Button type="primary" htmlType="submit" loading={loading}>
            {isAdd ? "新增" : "保存"}
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default StuModal;
