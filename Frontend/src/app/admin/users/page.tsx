"use client";

import React, { useState } from "react";
import { Table, Button, Card, Typography, Modal, Form, Input, Space, Tag } from "antd";
import { EditOutlined, DeleteOutlined, KeyOutlined } from "@ant-design/icons";
import { useStyles } from "./style/usersStyles";

const { Title } = Typography;

interface User {
    id: string;
    userName: string;
    name: string;
    surname: string;
    emailAddress: string;
    roleNames: string[];
    municipalityName?: string;
}

const UsersPage: React.FC = () => {
    const { styles } = useStyles();

    const [users, setUsers] = useState<User[]>([
        {
            id: "01",
            userName: "sysadmin",
            name: "John",
            surname: "Mokoena",
            emailAddress: "john@mangaung.gov.za",
            roleNames: ["System Admin"],
            municipalityName: "-",
        },
        {
            id: "02",
            userName: "kop_admin",
            name: "Sarah",
            surname: "Khumalo",
            emailAddress: "sarah@kopanong.gov.za",
            roleNames: ["Municipality Admin"],
            municipalityName: "Kopanong Municipality",
        },
        {
            id: "03",
            userName: "naledi_admin",
            name: "David",
            surname: "Molefe",
            emailAddress: "david@naledi.gov.za",
            roleNames: ["Municipality Admin"],
            municipalityName: "Naledi Municipality",
        },
    ]);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalType, setModalType] = useState<"edit" | "password">("edit");
    const [currentUser, setCurrentUser] = useState<User | null>(null);
    const [form] = Form.useForm();

    const openModal = (type: "edit" | "password", user: User) => {
        setModalType(type);
        setCurrentUser(user);

        if (type === "password") {
            form.resetFields();
        } else {
            form.setFieldsValue({
                userName: user.userName,
                name: user.name,
                surname: user.surname,
                emailAddress: user.emailAddress,
            });
        }

        setIsModalOpen(true);
    };

    const handleModalSubmit = () => {
        form.validateFields().then((values) => {
            if (!currentUser) return;

            if (modalType === "edit") {
                setUsers(
                    users.map((u) =>
                        u.id === currentUser.id
                            ? { ...u, ...values, roleNames: u.roleNames, municipalityName: u.municipalityName }
                            : u
                    )
                );
            } else if (modalType === "password") {
                console.log(`Password changed for ${currentUser.userName}:`, values.password);
            }

            setIsModalOpen(false);
        });
    };

    const handleDelete = (id: string) => {
        Modal.confirm({
            title: "Are you sure you want to delete this user?",
            okText: "Delete",
            okType: "danger",
            onOk: () => setUsers(users.filter((user) => user.id !== id)),
        });
    };

    const columns = [
        { title: "Username", dataIndex: "userName", key: "userName" },
        { title: "First Name", dataIndex: "name", key: "name" },
        { title: "Surname", dataIndex: "surname", key: "surname" },
        { title: "Email", dataIndex: "emailAddress", key: "emailAddress" },
        {
            title: "Roles",
            dataIndex: "roleNames",
            key: "roleNames",
            render: (roles: string[]) => roles.map((role, index) => <Tag key={index}>{role}</Tag>),
        },
        {
            title: "Municipality",
            dataIndex: "municipalityName",
            key: "municipalityName",
            render: (name: string) => name || "-",
        },
        {
            title: "Actions",
            key: "actions",
            render: (_: unknown, record: User) => (
                <Space>
                    <Button icon={<EditOutlined />} onClick={() => openModal("edit", record)} />
                    <Button icon={<KeyOutlined />} onClick={() => openModal("password", record)} />
                    <Button danger icon={<DeleteOutlined />} onClick={() => handleDelete(record.id)} />
                </Space>
            ),
        },
    ];

    return (
        <div className={styles.container}>
            <Card className={styles.card}>
                <div className={styles.headerSection}>
                    <Title level={3} className={styles.title}>
                        Users
                    </Title>
                </div>

                <Table
                    columns={columns}
                    dataSource={users.filter(user => !user.roleNames.includes("System Admin"))} // exclude system admins
                    rowKey="id"
                    pagination={{ pageSize: 5 }}
                    className={styles.table}
                    bordered
                />

            </Card>

            <Modal
                title={modalType === "edit" ? "Edit User" : "Change Password"}
                open={isModalOpen}
                onOk={handleModalSubmit}
                onCancel={() => setIsModalOpen(false)}
                okText={modalType === "password" ? "Update Password" : "Save"}
            >
                <Form form={form} layout="vertical" className={styles.modalForm}>
                    {modalType === "password" ? (
                        <>
                            <Form.Item
                                name="password"
                                label="New Password"
                                rules={[{ required: true, message: "Please enter a new password" }]}
                            >
                                <Input.Password placeholder="Enter new password" />
                            </Form.Item>
                            <Form.Item
                                name="confirmPassword"
                                label="Confirm Password"
                                dependencies={["password"]}
                                rules={[
                                    { required: true, message: "Please confirm the password" },
                                    ({ getFieldValue }) => ({
                                        validator(_, value) {
                                            return !value || getFieldValue("password") === value
                                                ? Promise.resolve()
                                                : Promise.reject(new Error("Passwords do not match"));
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
                                rules={[{ required: true, message: "Please enter a username" }]}
                            >
                                <Input />
                            </Form.Item>
                            <Form.Item
                                name="name"
                                label="First Name"
                                rules={[{ required: true, message: "Please enter the first name" }]}
                            >
                                <Input />
                            </Form.Item>
                            <Form.Item
                                name="surname"
                                label="Surname"
                                rules={[{ required: true, message: "Please enter the surname" }]}
                            >
                                <Input />
                            </Form.Item>
                            <Form.Item
                                name="emailAddress"
                                label="Email"
                                rules={[{ required: true, type: "email", message: "Please enter a valid email" }]}
                            >
                                <Input />
                            </Form.Item>
                        </>
                    )}
                </Form>
            </Modal>
        </div>
    );
};

export default UsersPage;
