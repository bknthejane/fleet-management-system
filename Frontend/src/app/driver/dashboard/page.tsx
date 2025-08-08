"use client";

import React, { useState, useEffect } from "react";
import {
  Card,
  Row,
  Col,
  Typography,
  Button,
  Modal,
  message,
} from "antd";
import { AlertOutlined, PlusOutlined } from "@ant-design/icons";
import { useStyles } from "./style/driverDashboardStyle";
import { IIncident } from "@/providers/incident-provider/context";
import { useIncidentState, useIncidentActions } from "@/providers/incident-provider";
import IncidentModal from "@/components/IncidentModal";

const { Title, Text } = Typography;

const DriverDashboard: React.FC = () => {
  const { styles } = useStyles();

  const { incidents } = useIncidentState();
  const { getIncidentList, createIncident, updateIncident, deleteIncident } = useIncidentActions();

  const [modalVisible, setModalVisible] = useState(false);
  const [editRecord, setEditRecord] = useState<IIncident | null>(null);

  const [municipalityId, setMunicipalityId] = useState<string>("");
  const [municipalityName, setMunicipalityName] = useState<string>("");
  const [driverId, setDriverId] = useState<string>("");
  const [vehicleId, setVehicleId] = useState<string>("");
  const [loggedInUser, setLoggedInUser] = useState<string>("");

  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setMunicipalityId(sessionStorage.getItem("municipalityId") || "");
    setMunicipalityName(sessionStorage.getItem("municipalityName") || "");
    setDriverId(sessionStorage.getItem("driverId") || "");
    setVehicleId(sessionStorage.getItem("vehicleId") || "");
    setLoggedInUser(sessionStorage.getItem("loggedInUser") || "");

    const fetchData = async () => {
      setLoading(true);
      try {
        if (
          sessionStorage.getItem("municipalityId") &&
          sessionStorage.getItem("driverId") &&
          sessionStorage.getItem("vehicleId")
        ) {
          await getIncidentList();
        }
      } catch (error) {
        console.error("Failed to fetch incidents:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
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
      const municipalityNameFromStorage = sessionStorage.getItem("municipalityName") || "";
      const vehicleIdFromStorage = sessionStorage.getItem("vehicleId") || "";
      const driverIdFromStorage = sessionStorage.getItem("driverId") || "";

      const incident: IIncident = {
        ...values,
        id: editRecord?.id,
        creatorUserId: editRecord?.creatorUserId ?? userId,
        municipalityId: editRecord?.municipalityId ?? municipalityIdFromStorage,
        municipalityName: editRecord?.municipalityName ?? municipalityNameFromStorage,
        vehicleId: editRecord?.vehicleId ?? vehicleIdFromStorage,
        driverId: editRecord?.driverId ?? driverIdFromStorage,
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

  const filteredIncidents =
    incidents?.filter(
      (inc) =>
        inc.municipalityId?.toString() === municipalityId &&
        inc.driverId?.toString() === driverId &&
        inc.vehicleId?.toString() === vehicleId
    ) || [];

  const currentDate = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div>
      <Card className={styles.welcomeCard}>
        <Title level={3} style={{ marginBottom: 4 }}>
          Welcome Back{loggedInUser ? `, ${loggedInUser}` : ""}!
        </Title>
        <Text className={styles.secondaryText}>
          {municipalityName ? `${municipalityName} | ` : ""}
          Today is {currentDate}
        </Text>
      </Card>

      <br />

      <Row gutter={24}>
        <Col xs={24} sm={12} md={8}>
          <Card className={styles.dashboardCard} loading={loading}>
            <AlertOutlined style={{ fontSize: 36, color: "#ff4d4f" }} />
            <Title level={4} style={{ marginTop: 12 }}>
              Total Incidents
            </Title>
            <p style={{ fontSize: 24, margin: 0 }}>{incidents?.length || 0}</p>
          </Card>
        </Col>
        <Col xs={24} sm={12} md={8}>
          <Card className={styles.dashboardCard} loading={loading}>
            <AlertOutlined style={{ fontSize: 36, color: "#faad14" }} />
            <Title level={4} style={{ marginTop: 12 }}>
              Pending Incidents
            </Title>
            <p style={{ fontSize: 24, margin: 0 }}>
              {incidents?.filter((i) => i.status === "Submitted" || i.status === "Assigned").length || 0}
            </p>
          </Card>
        </Col>
        <Col xs={24} sm={12} md={8}>
          <Card className={styles.dashboardCard} loading={loading}>
            <AlertOutlined style={{ fontSize: 36, color: "#52c41a" }} />
            <Title level={4} style={{ marginTop: 12 }}>
              Resolved Incidents
            </Title>
            <p style={{ fontSize: 24, margin: 0 }}>
              {incidents?.filter((i) => i.status === "Closed").length || 0}
            </p>
          </Card>
        </Col>
      </Row>

      <Button
        type="primary"
        shape="circle"
        size="large"
        icon={<PlusOutlined />}
        className={styles.fabButton}
        onClick={() => openModal()}
        disabled={saving || deleting}
        aria-label="Add new incident"
      />

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
