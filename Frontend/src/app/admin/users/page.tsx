"use client";

import React, { useEffect, useState } from "react";
import { Table, Button, Card, Typography, Modal, Form, Input, Space, Tag, message } from "antd";
import { EditOutlined, DeleteOutlined, KeyOutlined } from "@ant-design/icons";
import { useUserState, useUserActions } from "@/providers/user-provider";
import { IUser } from "@/providers/user-provider/context";

const { Title } = Typography;

const UsersPage: React.FC = () => {
  const { users } = useUserState();
  const { getUserList, updateUser, deleteUser } = useUserActions();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPasswordModal, setIsPasswordModal] = useState(false);
  const [currentUser, setCurrentUser] = useState<IUser | null>(null);
  const [form] = Form.useForm();

  useEffect(() => {
    getUserList();
  }, ['']);

  const usersArray: IUser[] = Array.isArray(users)
    ? users
    : ((users as unknown) as { items?: IUser[]; result?: IUser[] })?.items ??
      ((users as unknown) as { items?: IUser[]; result?: IUser[] })?.result ??
      [];

  const municipalityAdmins = usersArray.filter((user) =>
    user.roleNames?.includes("MUNICIPALITYADMIN")
  );

  const openEditModal = (user: IUser) => {
    setCurrentUser(user);
    setIsPasswordModal(false);
    form.setFieldsValue({
      userName: user.userName,
      name: user.name,
      surname: user.surname,
      emailAddress: user.emailAddress,
    });
    setIsModalOpen(true);
  };

  const openPasswordModal = (user: IUser) => {
    setCurrentUser(user);
    setIsPasswordModal(true);
    form.resetFields();
    setIsModalOpen(true);
  };

  const handleSubmit = async () => {
    if (!currentUser) return;

    try {
      const values = await form.validateFields();

      if (isPasswordModal) {
        message.success(`Password updated for ${currentUser.userName}`);
      } else {
        await updateUser({ ...currentUser, ...values });
        message.success(`User ${values.userName} updated successfully`);
      }

      getUserList();
      setIsModalOpen(false);
    } catch (err) {
      console.error("Error:", err);
      message.error("An error occurred. Please try again.");
    }
  };

  const handleDelete = (id: string) => {
    Modal.confirm({
      title: "Delete this user?",
      content: "This action cannot be undone.",
      okText: "Delete",
      okType: "danger",
      onOk: async () => {
        try {
          await deleteUser(id);
          getUserList();
          message.success("User deleted successfully");
        } catch (err) {
          console.error("Error deleting user:", err);
          message.error("Failed to delete user");
        }
      },
    });
  };

  const columns = [
    {
      title: "Username",
      dataIndex: "userName",
      key: "userName",
      render: (text: string) => text || "-",
    },
    {
      title: "Full Name",
      dataIndex: "name",
      key: "name",
      render: (text: string) => text || "-",
    },
    {
      title: "Email",
      dataIndex: "emailAddress",
      key: "emailAddress",
      render: (text: string) => text || "-",
    },
    {
      title: "Roles",
      dataIndex: "roleNames",
      key: "roles",
      render: (roles: string[]) =>
        roles && roles.length > 0 ? (
          roles.map((role, i) => <Tag key={i}>{role}</Tag>)
        ) : (
          <Tag>No roles</Tag>
        ),
    },
    {
      title: "Municipality",
      dataIndex: "municipalityName",
      key: "municipalityId",
      render: (text: string) => text || "-",
    },
    {
      title: "Actions",
      key: "actions",
      render: (_: unknown, user: IUser) => (
        <Space>
          <Button
            icon={<EditOutlined />}
            onClick={() => openEditModal(user)}
            title="Edit User"
          />
          <Button
            icon={<KeyOutlined />}
            onClick={() => openPasswordModal(user)}
            title="Change Password"
          />
          <Button
            danger
            icon={<DeleteOutlined />}
            onClick={() => handleDelete(user.id!)}
            title="Delete User"
            disabled={!user.id}
          />
        </Space>
      ),
    },
  ];

  return (
    <div style={{ padding: 24 }}>
      <Card>
        <Title level={3}>Municipality Admins</Title>

        <Table
          columns={columns}
          dataSource={municipalityAdmins}
          rowKey="id"
          pagination={{
            pageSize: 10,
            showSizeChanger: true,
            showTotal: (total, range) =>
              `${range[0]}-${range[1]} of ${total} items`,
          }}
          bordered
          loading={!users}
        />
      </Card>

      <Modal
        title={isPasswordModal ? "Change Password" : "Edit User"}
        open={isModalOpen}
        onOk={handleSubmit}
        onCancel={() => setIsModalOpen(false)}
        okText={isPasswordModal ? "Update Password" : "Save"}
      >
        <Form form={form} layout="vertical">
          {isPasswordModal ? (
            <>
              <Form.Item
                name="password"
                label="New Password"
                rules={[
                  { required: true, message: "Enter new password" },
                  { min: 6, message: "Password must be at least 6 characters" },
                ]}
              >
                <Input.Password placeholder="Enter new password" />
              </Form.Item>
              <Form.Item
                name="confirmPassword"
                label="Confirm Password"
                dependencies={["password"]}
                rules={[
                  { required: true, message: "Confirm password" },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      return !value || getFieldValue("password") === value
                        ? Promise.resolve()
                        : Promise.reject(new Error("Passwords don't match"));
                    },
                  }),
                ]}
              >
                <Input.Password placeholder="Confirm new password" />
              </Form.Item>
            </>
          ) : (
            <>
              <Form.Item
                name="userName"
                label="Username"
                rules={[{ required: true, message: "Username is required" }]}
              >
                <Input placeholder="Enter username" />
              </Form.Item>
              <Form.Item
                name="name"
                label="First Name"
                rules={[{ required: true, message: "First name is required" }]}
              >
                <Input placeholder="Enter first name" />
              </Form.Item>
              <Form.Item
                name="surname"
                label="Surname"
                rules={[{ required: true, message: "Surname is required" }]}
              >
                <Input placeholder="Enter surname" />
              </Form.Item>
              <Form.Item
                name="emailAddress"
                label="Email"
                rules={[
                  { required: true, message: "Email is required" },
                  { type: "email", message: "Please enter a valid email" },
                ]}
              >
                <Input placeholder="Enter email address" />
              </Form.Item>
            </>
          )}
        </Form>
      </Modal>
    </div>
  );
};

export default UsersPage;
