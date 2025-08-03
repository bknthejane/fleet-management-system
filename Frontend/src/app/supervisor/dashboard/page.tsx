"use client";

import React from "react";
import { Row, Col, Card, Typography, List, Avatar } from "antd";
import { FileTextOutlined, ToolOutlined } from "@ant-design/icons";
import { useStyles } from "./style/supervisorDashboardStyle";

const { Title, Text } = Typography;

const SupervisorDashboard: React.FC = () => {
  const { styles } = useStyles();

  const totalJobCards = 12;
  const totalMechanics = 5;

  // Sample recent job cards data
  const recentJobCards = [
    {
      id: "JC-001",
      vehicle: "Toyota Hilux",
      issue: "Engine overheating",
      date: "2025-07-28",
    },
    {
      id: "JC-002",
      vehicle: "Ford Ranger",
      issue: "Brake replacement",
      date: "2025-07-27",
    },
    {
      id: "JC-003",
      vehicle: "Isuzu D-Max",
      issue: "Oil change",
      date: "2025-07-26",
    },
  ];

  return (
    <div>
      <Title level={2} style={{ marginBottom: 24 }}>
        Supervisor Dashboard
      </Title>

      <Row gutter={[24, 24]}>
        <Col xs={24} sm={12}>
          <Card hoverable className={styles.dashboardCard}>
            <FileTextOutlined style={{ fontSize: 36, color: "#4a90e2" }} />
            <Title level={4} style={{ marginTop: 12 }}>
              Job Cards
            </Title>
            <Text>{totalJobCards}</Text>
          </Card>
        </Col>

        <Col xs={24} sm={12}>
          <Card hoverable className={styles.dashboardCard}>
            <ToolOutlined style={{ fontSize: 36, color: "#50c878" }} />
            <Title level={4} style={{ marginTop: 12 }}>
              Mechanics
            </Title>
            <Text>{totalMechanics}</Text>
          </Card>
        </Col>
      </Row>

      <Card
        title="Recent Job Cards"
        style={{ marginTop: 32, background: "white" }}
        bordered={false}
      >
        <List
          itemLayout="horizontal"
          dataSource={recentJobCards}
          renderItem={(item) => (
            <List.Item>
              <List.Item.Meta
                avatar={
                  <Avatar
                    style={{ backgroundColor: "#4a90e2" }}
                    icon={<FileTextOutlined />}
                  />
                }
                title={`${item.id} - ${item.vehicle}`}
                description={`Issue: ${item.issue} | Date: ${item.date}`}
              />
            </List.Item>
          )}
        />
      </Card>
    </div>
  );
};

export default SupervisorDashboard;
