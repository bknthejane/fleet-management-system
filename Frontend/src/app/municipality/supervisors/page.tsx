"use client";

import React, { useState, useEffect } from "react";
import { Table, Button, Typography, Card, Space, Avatar, message, Modal } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { useStyles } from "./style/supervisorsStyle";
import { ISupervisor } from "@/providers/supervisor-provider/context";
import { useSupervisorState, useSupervisorActions } from "@/providers/supervisor-provider";
import { ColumnsType } from "antd/es/table";
import SupervisorModal from "@/components/SupervisorModal";

const { Title } = Typography;

const SupervisorsPage: React.FC = () => {
  const { styles } = useStyles();

  const { supervisors } = useSupervisorState();
  const { getSupervisorList, createSupervisor, updateSupervisor, deleteSupervisor } = useSupervisorActions();

  const [modalVisible, setModalVisible] = useState(false);
  const [editRecord, setEditRecord] = useState<ISupervisor | null>(null);

  const [municipalityId, setMunicipalityId] = useState<string>("");

  useEffect(() => {
    const storedMunicipalityId = sessionStorage.getItem("municipalityId") || "";
    setMunicipalityId(storedMunicipalityId);

    if (storedMunicipalityId) {
      getSupervisorList();
    }
  }, ['']);

  const openModal = (record?: ISupervisor) => {
    setEditRecord(record || null);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setEditRecord(null);
  };

  const handleSaveSupervisor = async (values: ISupervisor) => {
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
        message.success(`Updated Supervisor: ${supervisor.name}`);
      } else {
        await createSupervisor(supervisor);
        message.success(`Added Supervisor: ${supervisor.name}`);
      }

      getSupervisorList();
      closeModal();
    } catch (error) {
      console.error("Error saving supervisor:", error);
      message.error("Failed to save supervisor");
    }
  };

  const handleDeleteSupervisor = (id?: string) => {
    if (!id) return;

    Modal.confirm({
      title: "Are you sure you want to delete this supervisor?",
      okText: "Delete",
      okType: "danger",
      onOk: async () => {
        await deleteSupervisor(id);
        message.success("Supervisor deleted successfully");
        getSupervisorList();
      },
    });
  };

  const filteredSupervisors = supervisors?.filter(
    (sup) => sup.municipalityId?.toString() === municipalityId
  ) || [];

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
          <Button type="link" onClick={() => openModal(record)}>Edit</Button>
          <Button danger type="link" onClick={() => handleDeleteSupervisor(record.id)}>Delete</Button>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <div className={styles.pageHeader}>
        <Title level={3} className={styles.pageTitle}>
          Supervisors
        </Title>

        <Button type="primary" onClick={() => openModal()}>
          Add Supervisor
        </Button>
      </div>

      <Card className={styles.tableCard}>
        <Table
          columns={columns}
          dataSource={filteredSupervisors}
          rowKey="id"
          pagination={{ pageSize: 5 }}
          bordered
        />
      </Card>

      <SupervisorModal
        open={modalVisible}
        onClose={closeModal}
        editRecord={editRecord}
        onSave={handleSaveSupervisor}
      />
    </div>
  );
};

export default SupervisorsPage;
