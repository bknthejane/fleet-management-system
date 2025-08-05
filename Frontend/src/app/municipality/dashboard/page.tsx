"use client";

import React, { useEffect, useState } from "react";
import { Row, Col, Card, Typography } from "antd";
import {
  TeamOutlined,
  UserOutlined,
  CarOutlined,
  InfoCircleOutlined,
} from "@ant-design/icons";
import { useStyles } from "./style/municipalityDashboardStyle";

import { useSupervisorActions, useSupervisorState } from "@/providers/supervisor-provider";
import { useDriverActions, useDriverState } from "@/providers/driver-provider";
import { useVehicleActions, useVehicleState } from "@/providers/vehicle-provider";

const { Title, Text } = Typography;

const DashboardPage: React.FC = () => {
  const { styles } = useStyles();

  const { supervisors } = useSupervisorState();
  const { getSupervisorList } = useSupervisorActions();

  const { drivers } = useDriverState();
  const { getDriverList } = useDriverActions();

  const { vehicles } = useVehicleState();
  const { getVehicleList } = useVehicleActions();

  const [loggedInUser, setLoggedInUser] = useState<string>("");
  const [municipalityId, setMunicipalityId] = useState<string>("");
  const [municipalityName, setMunicipalityName] = useState<string>("");

  useEffect(() => {
    const storedUserName = sessionStorage.getItem("loggedInUser") || "";
    const storedMunicipalityId = sessionStorage.getItem("municipalityId") || "";
    const storedMunicipalityName = sessionStorage.getItem("municipalityName") || "";

    setLoggedInUser(storedUserName);
    setMunicipalityId(storedMunicipalityId);
    setMunicipalityName(storedMunicipalityName);

    if (storedMunicipalityId) {
      getSupervisorList();
      getDriverList();
      getVehicleList();
    }
  }, []);

  const municipalitySupervisors = supervisors?.filter(
    (sup) => sup.municipalityId?.toString() === municipalityId
  ) || [];

  const municipalityDrivers = drivers?.filter(
    (driver) => driver.municipalityId?.toString() === municipalityId
  ) || [];

  const municipalityVehicles = vehicles?.filter(
    (vehicle) => vehicle.municipalityId?.toString() === municipalityId
  ) || [];

  const totalSupervisors = municipalitySupervisors.length;
  const totalDrivers = municipalityDrivers.length;
  const totalVehicles = municipalityVehicles.length;

  const currentDate = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div>
      <Card className={styles.welcomeCard}>
        <div>
          <Title level={3} style={{ marginBottom: 4 }}>
            Welcome Back{loggedInUser ? `, ${loggedInUser}` : ""}!
          </Title>
          <Text type="secondary">
            {municipalityName ? `${municipalityName} | ` : ""}
            Today is {currentDate}
          </Text>
        </div>
      </Card>

      <Row gutter={[24, 24]} style={{ marginTop: 24 }}>
        <Col xs={24} sm={12} md={8}>
          <Card hoverable className={styles.dashboardCard}>
            <TeamOutlined style={{ fontSize: 36, color: "#4a90e2" }} />
            <Title level={4} style={{ marginTop: 12 }}>
              Supervisors
            </Title>
            <Text strong style={{ fontSize: 18 }}>{totalSupervisors}</Text>
            <div>
              <Text type="secondary">Active Supervisors</Text>
            </div>
          </Card>
        </Col>

        <Col xs={24} sm={12} md={8}>
          <Card hoverable className={styles.dashboardCard}>
            <UserOutlined style={{ fontSize: 36, color: "#50c878" }} />
            <Title level={4} style={{ marginTop: 12 }}>
              Drivers
            </Title>
            <Text strong style={{ fontSize: 18 }}>{totalDrivers}</Text>
            <div>
              <Text type="secondary">Registered Drivers</Text>
            </div>
          </Card>
        </Col>

        <Col xs={24} sm={12} md={8}>
          <Card hoverable className={styles.dashboardCard}>
            <CarOutlined style={{ fontSize: 36, color: "#f5a623" }} />
            <Title level={4} style={{ marginTop: 12 }}>
              Vehicles
            </Title>
            <Text strong style={{ fontSize: 18 }}>{totalVehicles}</Text>
            <div>
              <Text type="secondary">Fleet Vehicles</Text>
            </div>
          </Card>
        </Col>
      </Row>

      <Card className={styles.infoCard} style={{ marginTop: 32 }}>
        <InfoCircleOutlined style={{ fontSize: 20, color: "#4a90e2", marginRight: 8 }} />
        <Text type="secondary">
          Keep your fleet and user data updated regularly to ensure smooth operations.
        </Text>
      </Card>
    </div>
  );
};

export default DashboardPage;
