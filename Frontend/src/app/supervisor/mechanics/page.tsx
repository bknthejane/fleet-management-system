"use client";

import React, { useState, useEffect } from "react";
import { Table, Typography, Avatar, message, Modal, Space, Button, Card } from "antd";
import { UserOutlined } from "@ant-design/icons";
import type { ColumnsType } from "antd/es/table";
import { useStyles } from "./style/mechanicStyle";
import { IJobCard } from "@/providers/jobCard-provider/context";
import { IMechanic } from "@/providers/mechanic-provider/context";
import { useMechanicState, useMechanicActions } from "@/providers/mechanic-provider";
import { useJobCardState, useJobCardActions } from "@/providers/jobCard-provider";
import MechanicModal from "@/components/MechanicModal";


const { Title } = Typography;

const MechanicsPage: React.FC = () => {
  const { styles } = useStyles();

  const { mechanics } = useMechanicState();
  const { jobCards } = useJobCardState();
  const { getJobCardList, createJobCard, updateJobCard, deleteJobCard } = useJobCardActions();
  const { getMechanicList, createMechanic, updateMechanic, deleteMechanic } = useMechanicActions();

  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [assigning, setAssigning] = useState(false);
  const [unassigning, setUnassigning] = useState(false);

  const [mechanicModalVisible, setMechanicModalVisible] = useState(false);
  const [editRecord, setEditRecord] = useState<IMechanic | null>(null);

  const [viewModalVisible, setViewModalVisible] = useState(false);
  const [selectedMechanic, setSelectedMechanic] = useState<IMechanic | null>(null);

  const [assignModalVisible, setAssignModalVisible] = useState(false);
  const [selectedJobCardId, setSelectedJobCardId] = useState<string | null>(null);

  const [municipalityId, setMunicipalityId] = useState<string>("");
  const [supervisorId, setSupervisorId] = useState<string>("");

  useEffect(() => {
    const storedMunicipalityId = sessionStorage.getItem("municipalityId") || "";
    setMunicipalityId(storedMunicipalityId);

    const storedSupervisorId = sessionStorage.getItem("supervisorId") || "";
    setSupervisorId(storedSupervisorId);

    if (storedMunicipalityId && storedSupervisorId) {
      getMechanicList();
      getJobCardList();
    }
  }, []);

  const openMechanicModal = (record?: IMechanic) => {
    setEditRecord(record || null);
    setMechanicModalVisible(true);
  };

  const closeMechanicModal = (record?: IMechanic) => {
    setMechanicModalVisible(false);
    setEditRecord(null);
  }

  const handleSaveMechanic = async (values: IMechanic) => {
    setSaving(true);
    try {
      const userId = sessionStorage.getItem("userId") || "";
      const municipalityId = sessionStorage.getItem("municipalityId") || "";
      const municipalityName = sessionStorage.getItem("municipalityName") || "";
      const supervisorId = sessionStorage.getItem("supervisorId") || "";

      const mechanic: IMechanic = {
        ...values,
        id: editRecord?.id,
        creatorUserId: editRecord?.creatorUserId ?? userId,
        municipalityId: editRecord?.municipalityId ?? municipalityId,
        municipalityName: editRecord?.municipalityName ?? municipalityName,
        supervisorId: editRecord?.supervisorId ?? supervisorId,
        assignedJobCardId: editRecord?.assignedJobCardId,
      };

      if (editRecord) {
        await updateMechanic(mechanic);
        message.success(`Updated Mechanic: ${mechanic.name}`);
      } else {
        await createMechanic(mechanic);
        message.success(`Added Mechanic: ${mechanic.name}`);
      }

      await getMechanicList();
      closeMechanicModal();
    } catch (error) {
      console.error("Error saving mechanic:", error);
      message.error("Failed to save mechanic");
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteMechanic = (id?: string) => {
    if (!id) return;

    Modal.confirm({
      title: "Are you sure you want to delete this mechanic?",
      okText: "Delete",
      okType: "danger",
      onOk: async () => {
        setDeleting(true);
        try {
          await deleteMechanic(id);
          message.success("Mechanic deleted successfully");
          await getMechanicList();
        } catch (error) {
          console.error("Delete error:", error);
          message.error("Failed to delete mechanic");
        } finally {
          setDeleting(false);
        }
      },
    });
  };

  const openViewModal = (mechanic: IMechanic) => {
    setSelectedMechanic(mechanic);
    setViewModalVisible(true);
  }

  const handleAssignJobCard = async () => {
    if (!selectedMechanic || !selectedJobCardId) return;

    setAssigning(true);
    try {
      const selectedJobCard = jobCards?.find((j) => j.id === selectedJobCardId);
      if (!selectedJobCard) {
        message.error("Selected job card not found.");
        return;
      }

      await updateMechanic({
        ...selectedMechanic,
        assignedJobCardId: selectedJobCard.id,
        assignedJobCardNumber: selectedJobCard.jobCardNumber,
      });

      await updateJobCard({
        ...selectedMechanic,
        assignedMechanicId: selectedMechanic.id,
      });

      message.success("Job Card assigned successfully!");
      await Promise.all([getMechanicList(), getJobCardList()]);
      setAssignModalVisible(false);
      setSelectedJobCardId(null);
      setViewModalVisible(false);
    } catch (error) {
      console.error("Error assigning job card:", error);
      message.error("Failed to assign job card");
    } finally {
      setAssigning(false);
    }
  };

  const handleUnassignJobCard = async () => {
    if (!selectedMechanic) return;

    setUnassigning(true);
    try {
      const jobCardToUnassign = jobCards?.find(
        (j) => j.id === selectedMechanic.assignedJobCardId
      );

      await updateMechanic({
        ...selectedMechanic,
        assignedJobCardId: undefined,
      });

      if (jobCardToUnassign) {
        await updateJobCard({
          ...jobCardToUnassign,
          assignedMechanicId: undefined,
        });
      }

      message.success("Job Card unassigned successfully!");
      await Promise.all([getMechanicList(), getJobCardList()]);
      setViewModalVisible(false);
    } catch (error) {
      console.error("Error unassigning job card:", error);
      message.error("Failed to unassign job card");
    } finally {
      setUnassigning(false);
    }
  };

  const filteredMechanics = mechanics?.filter((mec) => mec.supervisorId?.toString() === supervisorId) || [];

  const unassignedJobCards: IJobCard[] = jobCards?.filter((jc) => !jc.assignedMechanicId && jc.supervisorId?.toString() === supervisorId) || [];

  const columns: ColumnsType<IMechanic> = [
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
    { title: "Department", key: "department", render: (_, record) => record.department || "-" },
    { title: "Municipality Name", key: "municipalityName", render: (_, record) => record.municipalityName || "-" },
    { title: "Assigned Job Card", key: "assignedJobCardNumber", render: (_, record) => record.assignedJobCardNumber || "-" },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Space>
          <Button type="link" onClick={() => openViewModal(record)}>
            View
          </Button>
          <Button danger type="link" loading={deleting} onClick={() => handleDeleteMechanic(record.id)}>
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <div className={styles.pageHeader}>
        <Title level={3} className={styles.pageTitle}>
          Mechanics
        </Title>
        <Button type="primary" onClick={() => openMechanicModal()}>
          Add Driver
        </Button>
      </div>

      <Card className={styles.tableCard}>
        <Table
          columns={columns}
          dataSource={filteredMechanics}
          pagination={{ pageSize: 5 }}
          rowKey="id"
          loading={!mechanics}
        />
      </Card>

      <MechanicModal
        open={mechanicModalVisible || viewModalVisible || assignModalVisible}
        onClose={() => {
          setMechanicModalVisible(false);
          setViewModalVisible(false);
          setAssignModalVisible(false);
        }}
        editRecord={editRecord || selectedMechanic}
        onSave={(mechanic) => {
          if (viewModalVisible) {
            setEditRecord(mechanic);
            setMechanicModalVisible(true);
            setViewModalVisible(false);
          } else {
            handleSaveMechanic(mechanic);
          }
        }}
        isViewMode={viewModalVisible}
        jobCards={unassignedJobCards}
        selectedJobCardId={selectedJobCardId}
        setSelectedJobCardId={setSelectedJobCardId}
        onAssign={handleAssignJobCard}
        assigning={assigning}
        onUnassign={handleUnassignJobCard}
        unassigning={unassigning}
        showAssignModal={assignModalVisible}
        setShowAssignModal={setAssignModalVisible}
        saving={saving}
      />
    </div>
  );
};

export default MechanicsPage;
