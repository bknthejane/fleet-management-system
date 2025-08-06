"use client";

import React, { useState, useEffect } from "react";
import { Card, Row, Col, Typography, Button, Modal, Form, Input, Table, message, Space } from "antd";
import { AlertOutlined, PlusOutlined } from "@ant-design/icons";
import type { ColumnsType } from "antd/es/table";
import { useStyles } from "./style/driverDashboardStyle";
import { IIncident } from "@/providers/incident-provider/context";
import { useIncidentState, useIncidentActions } from "@/providers/incident-provider";
import IncidentModal from "@/components/IncidentModal";

const { Title } = Typography;

const DriverDashboard: React.FC = () => {
  const { styles } = useStyles();

  const { incidents } = useIncidentState();
  const { getIncidentList, createIncident, updateIncident, deleteIncident } = useIncidentActions();

  const [modalVisible, setModalVisible] = useState(false);
  const [editRecord, setEditRecord] = useState<IIncident | null>(null);

  const [municipalityId, setMunicipalityId] = useState<string>("");
  const [vehicleId, setVehicleId] = useState<string>("");
  const [driverId, setDriverId] = useState<string>("");

  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const storedMunicipalityId = sessionStorage.getItem("municipalityId") || "";
    setMunicipalityId(storedMunicipalityId);

    const storedDriverId = sessionStorage.getItem("driverId") || "";
    setDriverId(storedDriverId);

    const storedVehicleId = sessionStorage.getItem("vehicleId") || "";
    setVehicleId(storedVehicleId);

    if (storedMunicipalityId && storedDriverId && storedDriverId) {
      getIncidentList();
    }
  }, []);

  const openModal = (record?: IIncident) => {
    setEditRecord(record || null);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setEditRecord(null);
  };

  const handleSaveIncident = async (values: IIncident) => {
    setSaving(true);
    try {
      const userId = sessionStorage.getItem("userId") || "";
      const municipalityId = sessionStorage.getItem("municipalityId") || "";
      const municipalityName = sessionStorage.getItem("municipalityName") || "";
      const vehicleId = sessionStorage.getItem("vehicleId") || "";
      const driverId = sessionStorage.getItem("driverId") || "";

      const incident: IIncident = {
        ...values,
        id: editRecord?.id,
        creatorUserId: editRecord?.creatorUserId ?? userId,
        municipalityId: editRecord?.municipalityId ?? municipalityId,
        municipalityName: editRecord?.municipalityName ?? municipalityName,
        vehicleId: editRecord?.vehicleId ?? vehicleId,
        driverId: editRecord?.driverId ?? driverId,
      };

      if (editRecord) {
        await updateIncident(incident);
        message.success(`Updated Incident`);
      } else {
        await createIncident(incident);
        message.success(`Created Incident`);
      }

      await getIncidentList();
      closeModal();
    } catch (error) {
      console.error("Error saving incident:", error);
      message.error("Failed to save incident");
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteIncident = (id?: string) => {
    if (!id) return;

    Modal.confirm({
      title: "Are you sure you want to delete this incident?",
      okText: "Delete",
      okType: "danger",
      onOk: async () => {
        setDeleting(true);
        try {
          await deleteIncident(id);
          message.success("Incident deleted successfully");
          await getIncidentList();
        } catch (error) {
          console.error("Delete error:", error);
          message.error("Failed to delete incident");
        } finally {
          setDeleting(false);
        }
      },
    });
  };

  const filteredIncidents = incidents?.filter(
    (inc) => inc.municipalityId?.toString() === municipalityId && inc.driverId?.toString() === driverId && inc.vehicleId?.toString() === vehicleId
  ) || [];

  const columns: ColumnsType<IIncident> = [
    { title: "Description", key: "description", render: (_, record) => record.description || "-" },
    { title: "Incident Type", key: "incidentType", render: (_, record) => record.incidentType || "-" },
    { title: "Status", key: "status", render: (_, record) => record.status || "-" },
    { title: "Department", key: "department", render: (_, record) => record.department || "-" },
    { title: "Date Reported", key: "dateReported", render: (_, record) => record.dateReported || "-" },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Space>
          <Button type="link" onClick={() => openModal(record)} disabled={saving || deleting}>
            Edit
          </Button>
          <Button
            danger
            type="link"
            onClick={() => handleDeleteIncident(record.id)}
            loading={deleting}
            disabled={saving}
          >
            Delete
          </Button>
        </Space>
      ),
    },
  ]

  return (
    <div>
      <Title level={2} style={{ marginBottom: 24 }}>
        Driver Dashboard
      </Title>

      <Row gutter={24}>
        <Col xs={24} sm={12} md={8}>
          <Card className={styles.dashboardCard}>
            <AlertOutlined style={{ fontSize: 36, color: "#ff4d4f" }} />
            <Title level={4} style={{ marginTop: 12 }}>Total Incidents</Title>
            <p style={{ fontSize: 24 }}>{incidents?.length}</p>
          </Card>
        </Col>
        <Col xs={24} sm={12} md={8}>
          <Card className={styles.dashboardCard}>
            <AlertOutlined style={{ fontSize: 36, color: "#faad14" }} />
            <Title level={4} style={{ marginTop: 12 }}>Pending Incidents</Title>
            <p style={{ fontSize: 24 }}>{incidents?.filter(i => i.status === "Submitted").length}</p>
          </Card>
        </Col>
        <Col xs={24} sm={12} md={8}>
          <Card className={styles.dashboardCard}>
            <AlertOutlined style={{ fontSize: 36, color: "#52c41a" }} />
            <Title level={4} style={{ marginTop: 12 }}>Resolved Incidents</Title>
            <p style={{ fontSize: 24 }}>{incidents?.filter(i => i.status === "Closed").length}</p>
          </Card>
        </Col>
      </Row>
      
      <br></br>

      <div className={styles.pageHeader}>
        <Title level={3} className={styles.pageTitle}>
          Recent Incidents
        </Title>
      </div>

      <Card className={styles.tableCard}>
        <Table
          columns={columns}
          dataSource={filteredIncidents}
          rowKey="id"
          pagination={{ pageSize: 5 }}
          bordered
          loading={!incidents}
        />
      </Card>

      <IncidentModal
        open={modalVisible}
        onClose={closeModal}
        editRecord={editRecord}
        onSave={handleSaveIncident}
        saving={saving}
      />
    </div>
  );
};

export default DriverDashboard;
