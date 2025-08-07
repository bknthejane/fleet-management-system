"use client";

import React, { useEffect, useState } from "react";
import {
    Table,
    Button,
    Card,
    Typography,
    Modal,
    Form,
    Input,
    Space,
    Tag,
    Avatar,
} from "antd";
import {
    EditOutlined,
    LockOutlined,
    UserOutlined,
} from "@ant-design/icons";
import { useUserState, useUserActions } from "@/providers/user-provider";
import { IUser } from "@/providers/user-provider/context";
import { useStyles } from "./style/usersStyle";
import useApp from "antd/es/app/useApp";

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
    const [searchText, setSearchText] = useState("");
    const [targetMunicipalityId, setTargetMunicipalityId] = useState<string | null>(null);
    const app = useApp();

    useEffect(() => {
        const storedMunicipalityId = sessionStorage.getItem("municipalityId");
        setTargetMunicipalityId(storedMunicipalityId);
        if (storedMunicipalityId) {
            getUserList();
        } 
    }, []);

    const usersArray: IUser[] = Array.isArray(users)
        ? users
        : ((users as unknown) as { items?: IUser[]; result?: IUser[] })?.items ??
          ((users as unknown) as { items?: IUser[]; result?: IUser[] })?.result ??
          [];


    const municipalityUsers = usersArray
        .filter(
            (user) =>
                targetMunicipalityId &&
                user.municipalityId === targetMunicipalityId &&
                !user.roleNames?.includes("MUNICIPALITYADMIN")
        )
        .filter((user) => {
            const lowerCaseSearch = searchText.toLowerCase();
            return (
                user.userName?.toLowerCase().includes(lowerCaseSearch) ||
                user.name?.toLowerCase().includes(lowerCaseSearch) ||
                user.surname?.toLowerCase().includes(lowerCaseSearch) ||
                user.emailAddress?.toLowerCase().includes(lowerCaseSearch)
            );
        });

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
                const payload = {
                    userId: currentUser.id,
                    newPassword: values.password,
                    adminPassword: prompt("Please enter your supervisor password to confirm:")
                };

                if (!payload.adminPassword) {
                    app.message.error("Password change cancelled. Supervisor password is required.");
                    return;
                }

                await changePassword(payload);
                app.message.success(`Password updated for ${currentUser.userName}`);
            } else {
                await updateUser({ ...currentUser, ...values });
                app.message.success(`User updated: ${currentUser.userName}`);
            }

            getUserList();
            setIsModalOpen(false);
        } catch (err) {
            console.error("Error:", err);
            app.message.error("An error occurred. Please try again.");
        }
    };

    const columns = [
        {
            title: "Username",
            dataIndex: "userName",
            key: "userName",
            render: (text: string) => (
                <Space>
                    <Avatar icon={<UserOutlined />} size="small" />
                    {text || "-"}
                </Space>
            ),
        },
        {
            title: "Full Name",
            dataIndex: "name",
            key: "name",
            render: (_: unknown, record: IUser) => `${record.name} ${record.surname}` || "-",
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
                        className={styles.tableActionButton}
                    />
                    <Button
                        icon={<LockOutlined />}
                        onClick={() => openPasswordModal(user)}
                        title="Change Password"
                        className={styles.tableActionButton}
                    />
                </Space>
            ),
        },
    ];

    return (
        <div style={{ backgroundColor: '#f5f7fa', minHeight: '100vh', padding: '24px' }}>
            <div className={styles.pageHeader}>
                <Title level={3} className={styles.pageTitle}>
                    Municipality Users
                </Title>
                <Space className={styles.headerControls}>
                    <Search
                        placeholder="Search users"
                        allowClear
                        onSearch={(value) => setSearchText(value)}
                        onChange={(e) => setSearchText(e.target.value)}
                        className={styles.searchBar}
                    />
                </Space>
            </div>

            <Card className={styles.tableCard}>
                <Table
                    columns={columns}
                    dataSource={municipalityUsers}
                    rowKey="id"
                    pagination={{
                        pageSize: 10,
                        showSizeChanger: true,
                        showTotal: (total, range) =>
                            `${range[0]}-${range[1]} of ${total} items`,
                    }}
                    bordered
                    loading={!users}
                    scroll={{ x: 'max-content' }}
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
                                                : Promise.reject(
                                                    new Error("Passwords don't match")
                                                );
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
