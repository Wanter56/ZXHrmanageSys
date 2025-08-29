import React from "react";
import { Modal, Form, Input, Button, message, FormProps, FormInstance } from "antd";
import type { Student } from "@store/studentStore";
import type { FormInstance as AntdFormInstance } from "antd";

/**
 * 通用学生编辑/新增弹窗组件
 *
 * @props visible - 是否显示弹窗
 * @props isAddMode - 是否是新增模式（影响标题和按钮文案）
 * @props initialValues - 表单初始值（编辑时回显数据）
 * @props onCancel - 取消回调
 * @props onSubmit - 提交成功回调（需返回 Promise 处理错误）
 * @props form - 可选，外部传入 Form 实例实现跨组件表单控制
 */
type StudentModalProps = {
  visible: boolean;
  isAddMode: boolean;
  initialValues?: Omit<Student, "id">;
  onCancel: () => void;
  onSubmit: (values: Omit<Student, "id">) => Promise<void>; // 要求返回 Promise 统一错误处理
  form?: AntdFormInstance<Omit<Student, "id">>;
};

const StudentModal: React.FC<StudentModalProps> = ({
  visible,
  isAddMode,
  initialValues = {},
  onCancel,
  onSubmit,
  form: externalForm,
}) => {
  // 优先使用外部传入的 Form 实例，否则内部创建
  const [form] = Form.useForm<Omit<Student, "id">>();
  const actualForm = externalForm || form;

  // 组件挂载时设置初始值（编辑场景用）
  React.useEffect(() => {
    if (initialValues && Object.keys(initialValues).length > 0) {
      actualForm.setFieldsValue(initialValues);
    }
  }, [initialValues, actualForm]);

  // 表单提交处理（统一错误捕获）
  const handleFormSubmit: FormProps<Omit<Student, "id">>["onFinish"] = async (values) => {
    try {
      await onSubmit(values); // 调用外部提交逻辑
      message.success(isAddMode ? "新增学生成功" : "编辑学生成功");
      onCancel(); // 关闭弹窗
      actualForm.resetFields(); // 重置表单
    } catch (err) {
      message.error(`操作失败：${(err as Error).message || "未知错误"}`);
    }
  };

  return (
    <Modal
      title={isAddMode ? "新增学生" : "编辑学生"}
      open={visible}
      onCancel={onCancel}
      footer={null}
      destroyOnClose
      width={600}
    >
      <Form
        form={actualForm}
        layout="vertical"
        onFinish={handleFormSubmit}
        initialValues={{ age: "", phone: "", email: "", ...initialValues }} // 合并默认值
      >
        <Form.Item name="name" label="姓名" rules={[{ required: true, message: "请输入学生姓名" }]}>
          <Input placeholder="请输入姓名" />
        </Form.Item>

        <Form.Item
          name="age"
          label="年龄"
          rules={[
            { required: true, message: "请输入年龄" },
            { type: "number", message: "年龄需为数字" },
          ]}
        >
          <Input type="number" placeholder="请输入年龄" />
        </Form.Item>

        <Form.Item
          name="phone"
          label="联系方式"
          rules={[
            { required: true, message: "请输入手机号" },
            { pattern: /^1\d{10}$/, message: "请输入正确的手机号" },
          ]}
        >
          <Input placeholder="请输入11位手机号" />
        </Form.Item>

        <Form.Item
          name="email"
          label="邮箱"
          rules={[
            { required: true, message: "请输入邮箱" },
            { type: "email", message: "请输入正确的邮箱格式" },
          ]}
        >
          <Input placeholder="请输入邮箱（如xxx@xxx.com）" />
        </Form.Item>

        <Form.Item name="education" label="学历" rules={[{ required: true, message: "请选择学历" }]}>
          <Input placeholder="请输入学历（如本科、硕士）" />
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
          <Button onClick={onCancel} style={{ marginRight: 8 }}>
            取消
          </Button>
          <Button type="primary" htmlType="submit">
            {isAddMode ? "新增" : "保存"}
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default StudentModal;
