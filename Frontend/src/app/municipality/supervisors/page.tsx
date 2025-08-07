"use client";

import React, { useState, useEffect } from "react";
import { Table, Button, Typography, Card, Space, Avatar, Input } from "antd";
import { UserOutlined, PlusOutlined, EditOutlined } from "@ant-design/icons";
import { useStyles } from "./style/supervisorsStyle";
import { ISupervisor } from "@/providers/supervisor-provider/context";
import { useSupervisorState, useSupervisorActions } from "@/providers/supervisor-provider";
import { ColumnsType } from "antd/es/table";
import SupervisorModal from "@/components/SupervisorModal";
import useApp from "antd/es/app/useApp";

const { Title } = Typography;
const { Search } = Input;

const SupervisorsPage: React.FC = () => {
    const { styles } = useStyles();

    const { supervisors } = useSupervisorState();
    const { getSupervisorList, createSupervisor, updateSupervisor } = useSupervisorActions();

    const [modalVisible, setModalVisible] = useState(false);
    const [editRecord, setEditRecord] = useState<ISupervisor | null>(null);
    const [searchText, setSearchText] = useState("");

    const [municipalityId, setMunicipalityId] = useState<string>("");

    const [saving, setSaving] = useState(false);
    const app = useApp();

    useEffect(() => {
        const storedMunicipalityId = sessionStorage.getItem("municipalityId") || "";
        setMunicipalityId(storedMunicipalityId);

        if (storedMunicipalityId) {
            getSupervisorList();
        }
    }, []);

    const openModal = (record?: ISupervisor) => {
        setEditRecord(record || null);
        setModalVisible(true);
    };

    const closeModal = () => {
        setModalVisible(false);
        setEditRecord(null);
    };

    const handleSaveSupervisor = async (values: ISupervisor) => {
        setSaving(true);
        try {
            const userId = sessionStorage.getItem("userId") || "";
            const municipalityId = sessionStorage.getItem("municipalityId") || "";
            const municipalityName = sessionStorage.getItem("municipalityName") || "";

            const supervisor: ISupervisor = {
                ...values,
                id: editRecord?.id,
                creatorUserId: editRecord?.creatorUserId ?? userId,
                municipalityId: editRecord?.municipalityId ?? municipalityId,
                municipalityName: editRecord?.municipalityName ?? municipalityName,
            };

            if (editRecord) {
                await updateSupervisor(supervisor);
                app.message.success(`Updated Supervisor: ${supervisor.name}`);
            } else {
                await createSupervisor(supervisor);
                app.message.success(`Added Supervisor: ${supervisor.name}`);
            }

            await getSupervisorList();
            closeModal();
        } catch (error) {
            console.error("Error saving supervisor:", error);
            app.message.error("Failed to save supervisor");
        } finally {
            setSaving(false);
        }
    };

    const filteredSupervisors = supervisors
        ?.filter((sup) => sup.municipalityId?.toString() === municipalityId)
        .filter((sup) => {
            const lowerCaseSearch = searchText.toLowerCase();
            return (
                sup.name?.toLowerCase().includes(lowerCaseSearch) ||
                sup.surname?.toLowerCase().includes(lowerCaseSearch) ||
                sup.email?.toLowerCase().includes(lowerCaseSearch) ||
                sup.contactNumber?.toLowerCase().includes(lowerCaseSearch) ||
                sup.department?.toLowerCase().includes(lowerCaseSearch)
            );
        }) || [];

    const columns: ColumnsType<ISupervisor> = [
        {
            title: "Name",
            dataIndex: "name",
            key: "name",
            render: (_, record) => (
                <Space>
                    <Avatar icon={<UserOutlined />} />
                    {record.name}
                </Space>
            ),
        },
        { title: "Surname", key: "surname", render: (_, record) => record.surname || "-" },
        { title: "Email", key: "email", render: (_, record) => record.email || "-" },
        { title: "Contact Number", key: "contactNumber", render: (_, record) => record.contactNumber || "-" },
        { title: "Department", key: "department", render: (_, record) => record.department || "-" },
        {
            title: "Actions",
            key: "actions",
            render: (_, record) => (
                <Space>
                    <Button
                        type="link"
                        icon={<EditOutlined />}
                        onClick={() => openModal(record)}
                        disabled={saving}
                        className={styles.tableActionButton}
                    >
                        Edit
                    </Button>
                </Space>
            ),
        },
    ];

    return (
        <div style={{ backgroundColor: '#f5f7fa', minHeight: '100vh', padding: '24px' }}>
            <div className={styles.pageHeader}>
                <Title level={3} className={styles.pageTitle}>
                    Supervisors
                </Title>
                <Space className={styles.headerControls}>
                    <Search
                        placeholder="Search supervisors"
                        allowClear
                        onSearch={setSearchText}
                        onChange={(e) => setSearchText(e.target.value)}
                        className={styles.searchBar}
                    />
                    <Button
                        type="primary"
                        icon={<PlusOutlined />}
                        onClick={() => openModal()}
                        disabled={saving}
                        className={styles.addButton}
                    >
                        Add Supervisor
                    </Button>
                </Space>
            </div>

            <Card className={styles.tableCard}>
                <Table
                    columns={columns}
                    dataSource={filteredSupervisors}
                    rowKey="id"
                    pagination={{ pageSize: 5 }}
                    bordered
                    loading={!supervisors}
                    scroll={{ x: 'max-content' }}
                />
            </Card>

            <SupervisorModal
                open={modalVisible}
                onClose={closeModal}
                editRecord={editRecord}
                onSave={handleSaveSupervisor}
                saving={saving}
            />
        </div>
    );
};

export default SupervisorsPage;