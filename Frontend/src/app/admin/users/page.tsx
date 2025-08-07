'use client';

import React, { useEffect, useState } from "react";
import { Table, Button, Card, Typography, Modal, Space, Tag, message, Input, Form } from "antd";
import type { ColumnsType } from "antd/es/table";
import {
  PlusOutlined,
  EditOutlined,
  LockOutlined,
} from "@ant-design/icons";
import { useUserState, useUserActions } from "@/providers/user-provider";
import { IUser } from "@/providers/user-provider/context";
import { useStyles } from "./style/usersStyles";

const { Title } = Typography;
const { Search } = Input;

const UsersPage: React.FC = () => {
  const { styles } = useStyles();
  const { users } = useUserState();
  const { getUserList, updateUser, changePassword } = useUserActions();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPasswordModal, setIsPasswordModal] = useState(false);
  const [currentUser, setCurrentUser] = useState<IUser | null>(null);
  const [form] = Form.useForm();
  const [isLoading, setIsLoading] = useState(false);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    getUserList();
  }, []);

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

  const handleModalSubmit = async () => {
    if (!currentUser) return;
    setIsLoading(true);

    try {
      const values = await form.validateFields();

      if (isPasswordModal) {
        const payload = {
          userId: currentUser.id,
          newPassword: values.password,
          adminPassword: prompt("Please enter your admin password to confirm:")
        };

        if (!payload.adminPassword) {
          message.error("Password change cancelled. Admin password is required.");
          return;
        }

        await changePassword(payload);
        message.success(`Password updated for ${currentUser.userName}`);
      }
      else {
        await updateUser({ ...currentUser, ...values });
        message.success(`User ${values.userName} updated successfully`);
      }

      getUserList();
      setIsModalOpen(false);
    } catch (err) {
      console.error("Error:", err);
      message.error("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const filteredUsers = municipalityAdmins.filter(user =>
    user.userName?.toLowerCase().includes(searchText.toLowerCase()) ||
    user.name?.toLowerCase().includes(searchText.toLowerCase()) ||
    user.surname?.toLowerCase().includes(searchText.toLowerCase())
  );

  const columns: ColumnsType<IUser> = [
    { title: "Username", dataIndex: "userName", key: "userName" },
    {
      title: "Full Name",
      dataIndex: "name",
      key: "name",
      render: (_, record) => `${record.name}`,
    },
    { title: "Email", dataIndex: "emailAddress", key: "emailAddress" },
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
      render: (_, user: IUser) => (
        <Space>
          <Button
            icon={<EditOutlined />}
            onClick={() => openEditModal(user)}
            title="Edit User"
          />
          <Button
            icon={<LockOutlined />}
            onClick={() => openPasswordModal(user)}
            title="Change Password"
          />
        </Space>
      ),
    },
  ];

  return (
    <div className={styles.container}>
      <Card className={styles.card}>
        <div className={styles.headerSection}>
          <Title level={3} className={styles.title}>Municipality Admins</Title>
          <Space>
            <Search
              placeholder="Search users"
              allowClear
              onSearch={setSearchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
          </Space>
        </div>

        <Table
          columns={columns}
          dataSource={filteredUsers}
          rowKey="id"
          pagination={{ pageSize: 5 }}
          bordered
          loading={!users}
          scroll={{ x: 'max-content' }}
        />
      </Card>

      <Modal
        title={isPasswordModal ? "Change Password" : "Edit User"}
        open={isModalOpen}
        onOk={handleModalSubmit}
        onCancel={() => setIsModalOpen(false)}
        okText={isPasswordModal ? "Update Password" : "Save"}
        confirmLoading={isLoading}
      >
        <Form form={form} layout="vertical" className={styles.modalForm}>
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