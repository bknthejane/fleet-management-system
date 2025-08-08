"use client";

import React, { useState, useEffect } from "react";
import { Table, Typography, Button, Space, message, Card, Input } from "antd";
import type { ColumnsType } from "antd/es/table";
import { useStyles } from "./style/mechanicJobCardStyle";
import { IJobCard } from "@/providers/jobCard-provider/context";
import { useJobCardState, useJobCardActions } from "@/providers/jobCard-provider";
import MechanicJobCardModal from "@/components/MechanicJobCardModal";

const { Title } = Typography;
const { Search } = Input;

const MechanicJobCards: React.FC = () => {
  const { styles } = useStyles();

  const { jobCards } = useJobCardState();
  const { getJobCardList, createJobCard, updateJobCard } = useJobCardActions();

  const [jobCardModalVisible, setJobCardModalVisible] = useState(false);
  const [viewModalVisible, setViewModalVisible] = useState(false);

  const [editRecord, setEditRecord] = useState<IJobCard | null>(null);
  const [selectedJobCard, setSelectedJobCard] = useState<IJobCard | null>(null);
  const [selectedMechanicId, setSelectedMechanicId] = useState<string | null>(null);

  const [saving, setSaving] = useState(false);
  const [searchText, setSearchText] = useState("");

  const [mechanicId, setMechanicId] = useState<string>("");

  useEffect(() => {
    const storedMechanicId = sessionStorage.getItem("mechanicId") || "";
    setMechanicId(storedMechanicId);

    if (storedMechanicId) {
      getJobCardList();
    }
  }, []);

  const openJobCardModal = (record?: IJobCard) => {
    setEditRecord(record || null);
    setJobCardModalVisible(true);
  };

  const openViewModal = (jobCard: IJobCard) => {
    setSelectedJobCard(jobCard);
    setSelectedMechanicId(jobCard.assignedMechanicId || null);
    setViewModalVisible(true);
  };

  const closeAllModals = () => {
    setJobCardModalVisible(false);
    setViewModalVisible(false);
    setEditRecord(null);
    setSelectedJobCard(null);
  };

  const handleSaveJobCard = async (values: IJobCard) => {
    setSaving(true);
    try {
      const userId = sessionStorage.getItem("userId") || "";
      const vehicleId = sessionStorage.getItem("vehicleId") || "";
      const driverId = sessionStorage.getItem("driverId") || "";
      const supervisorId = sessionStorage.getItem("supervisorId") || "";
      const mechanicId = sessionStorage.getItem("mechanicId") || "";

      const jobCard: IJobCard = {
        ...values,
        id: editRecord?.id,
        creatorUserId: editRecord?.creatorUserId ?? userId,
        supervisorId: editRecord?.supervisorId ?? supervisorId,
        vehicleId: editRecord?.vehicleId ?? vehicleId,
        driverId: editRecord?.driverId ?? driverId,
        incidentId: editRecord?.incidentId,
        assignedMechanicId: editRecord?.assignedMechanicId ?? mechanicId,
      };

      if (editRecord) {
        await updateJobCard(jobCard);
        message.success(`Updated JobCard: ${jobCard.jobCardNumber}`);
      } else {
        await createJobCard(jobCard);
        message.success(`Added JobCard: ${jobCard.jobCardNumber}`);
      }

      await getJobCardList();
      closeAllModals();
    } catch (error) {
      console.error("Error saving JobCard:", error);
      message.error("Failed to save JobCard");
    } finally {
      setSaving(false);
    }
  };

  const filteredJobCards = (jobCards || []).filter((jc) => {
    if (jc.assignedMechanicId?.toString() !== mechanicId) return false;

    if (!searchText) return true;
    const lowerSearch = searchText.toLowerCase();
    return (
      (jc.jobCardNumber?.toLowerCase().includes(lowerSearch) ?? false) ||
      (jc.notes?.toLowerCase().includes(lowerSearch) ?? false) ||
      (jc.priority?.toLowerCase().includes(lowerSearch) ?? false) ||
      (jc.status?.toLowerCase().includes(lowerSearch) ?? false) ||
      (jc.assignedMechanicName?.toLowerCase().includes(lowerSearch) ?? false)
    );
  });

  const columns: ColumnsType<IJobCard> = [
    { title: "JobCard Number", key: "jobCardNumber", render: (_, r) => r.jobCardNumber || "-" },
    { title: "Notes", key: "notes", render: (_, r) => r.notes || "-" },
    { title: "Priority", key: "priority", render: (_, r) => r.priority || "-" },
    { title: "Status", key: "status", render: (_, r) => r.status || "-" },
    { title: "Assigned Mechanic", key: "assignedMechanic", render: (_, r) => r.assignedMechanicName || "-" },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Space>
          <Button type="link" onClick={() => openViewModal(record)} disabled={saving}>
            View
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div style={{ backgroundColor: "#f5f7fa", minHeight: "100vh", padding: "24px" }}>
      <div className={styles.pageHeader}>
        <Title level={3} className={styles.pageTitle}>
          Job Cards
        </Title>

        <div className={styles.headerControls}>
          <Search
            placeholder="Search job cards"
            allowClear
            onChange={(e) => setSearchText(e.target.value)}
            onSearch={(value) => setSearchText(value)}
            className={styles.searchInput}
            disabled={saving}
          />
        </div>
      </div>

      <Card className={styles.tableCard}>
        <Table
          columns={columns}
          dataSource={filteredJobCards}
          rowKey="id"
          pagination={{ pageSize: 5 }}
          bordered
          loading={!jobCards}
          scroll={{ x: "max-content" }}
        />
      </Card>

      <MechanicJobCardModal
        open={jobCardModalVisible || viewModalVisible}
        onClose={closeAllModals}
        editRecord={editRecord || selectedJobCard}
        onSave={(jobCard) => {
          if (viewModalVisible) {
            setEditRecord(jobCard);
            setJobCardModalVisible(true);
            setViewModalVisible(false);
          } else {
            handleSaveJobCard(jobCard);
          }
        }}
        isViewMode={viewModalVisible}
        saving={saving}
      />
    </div>
  );
};

export default MechanicJobCards;
