"use client";

import React, { useEffect, useState } from "react";
import { Table, Typography, message, Modal, Space, Button, Card, Input } from "antd";
import type { ColumnsType } from "antd/es/table";
import { useStyles } from "./style/driverIncidentStyle";
import { IIncident } from "@/providers/incident-provider/context";
import { useIncidentActions, useIncidentState } from "@/providers/incident-provider";
import IncidentModal from "@/components/IncidentModal";
import useApp from "antd/es/app/useApp";

const { Title } = Typography;
const { Search } = Input;

const DriverIncidentsPage: React.FC = () => {
  const { styles } = useStyles();

  const { incidents } = useIncidentState();
  const { getIncidentList, createIncident, updateIncident } = useIncidentActions();

  const [modalVisible, setModalVisible] = useState(false);
  const [editRecord, setEditRecord] = useState<IIncident | null>(null);

  const [municipalityId, setMunicipalityId] = useState<string>("");
  const [vehicleId, setVehicleId] = useState<string>("");
  const [driverId, setDriverId] = useState<string>("");

  const [saving, setSaving] = useState(false);

  const [searchText, setSearchText] = useState("");
  const app = useApp();
  

  useEffect(() => {
    const storedMunicipalityId = sessionStorage.getItem("municipalityId") || "";
    setMunicipalityId(storedMunicipalityId);

    const storedDriverId = sessionStorage.getItem("driverId") || "";
    setDriverId(storedDriverId);

    const storedVehicleId = sessionStorage.getItem("vehicleId") || "";
    setVehicleId(storedVehicleId);

    if (storedMunicipalityId && storedDriverId && storedVehicleId) {
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
      const municipalityIdFromStorage = sessionStorage.getItem("municipalityId") || "";
      const municipalityName = sessionStorage.getItem("municipalityName") || "";
      const vehicleIdFromStorage = sessionStorage.getItem("vehicleId") || "";
      const driverIdFromStorage = sessionStorage.getItem("driverId") || "";

      const incident: IIncident = {
        ...values,
        id: editRecord?.id,
        creatorUserId: editRecord?.creatorUserId ?? userId,
        municipalityId: editRecord?.municipalityId ?? municipalityIdFromStorage,
        municipalityName: editRecord?.municipalityName ?? municipalityName,
        vehicleId: editRecord?.vehicleId ?? vehicleIdFromStorage,
        driverId: editRecord?.driverId ?? driverIdFromStorage,
      };

      if (editRecord) {
        await updateIncident(incident);
        app.message.success(`Updated Incident`);
      } else {
        await createIncident(incident);
        app.message.success(`Created Incident`);
      }

      await getIncidentList();
      closeModal();
    } catch (error) {
      console.error("Error saving incident:", error);
      app.message.error("Failed to save incident");
    } finally {
      setSaving(false);
    }
  };

  const filteredIncidents = (incidents || []).filter((inc) => {
    if (
      inc.municipalityId?.toString() !== municipalityId ||
      inc.driverId?.toString() !== driverId ||
      inc.vehicleId?.toString() !== vehicleId
    )
      return false;

    if (!searchText) return true;

    const lowerSearch = searchText.toLowerCase();

    return (
      (inc.description?.toLowerCase().includes(lowerSearch) ?? false) ||
      (inc.incidentType?.toLowerCase().includes(lowerSearch) ?? false) ||
      (inc.department?.toLowerCase().includes(lowerSearch) ?? false) ||
      (inc.status?.toLowerCase().includes(lowerSearch) ?? false)
    );
  });

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
          <Button type="link" onClick={() => openModal(record)} disabled={saving}>
            Edit
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div style={{ backgroundColor: "#f5f7fa", minHeight: "100vh", padding: "24px" }}>
      <div className={styles.pageHeader}>
        <Title level={3} className={styles.pageTitle}>
          Incidents
        </Title>

        <div className={styles.headerControls}>
          <Search
            placeholder="Search incidents"
            allowClear
            onChange={(e) => setSearchText(e.target.value)}
            onSearch={(value) => setSearchText(value)}
            className={styles.searchInput}
            disabled={saving}
          />
          <Button
            type="primary"
            className={styles.addButton}
            onClick={() => openModal()}
            disabled={saving}
          >
            Create Incident
          </Button>
        </div>
      </div>

      <Card className={styles.tableCard}>
        <Table
          columns={columns}
          dataSource={filteredIncidents}
          rowKey="id"
          pagination={{ pageSize: 5 }}
          bordered
          loading={!incidents}
          scroll={{ x: "max-content" }}
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

export default DriverIncidentsPage;
