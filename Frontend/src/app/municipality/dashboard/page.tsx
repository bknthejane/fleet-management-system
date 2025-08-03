"use client";

import React from "react";
import { Row, Col, Card, Typography } from "antd";
import {
  TeamOutlined,
  UserOutlined,
  CarOutlined,
  InfoCircleOutlined,
} from "@ant-design/icons";
import { useStyles } from "./style/municipalityDashboardStyle";

const { Title, Text } = Typography;

const DashboardPage: React.FC = () => {
  const { styles } = useStyles();

  // Example data
  const totalSupervisors = 8;
  const totalDrivers = 20;
  const totalVehicles = 35;

  const currentDate = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div>
      {/* Welcome Banner */}
      <Card className={styles.welcomeCard}>
        <div>
          <Title level={3} style={{ marginBottom: 4 }}>
            Welcome Back, Municipality Admin!
          </Title>
          <Text type="secondary">Today is {currentDate}</Text>
        </div>
      </Card>

      {/* Stats Tiles */}
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

      {/* Simple Info Banner */}
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
