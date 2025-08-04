"use client";

import React from "react";
import { Card, Row, Col, Typography, List } from "antd";
import { ToolOutlined, CarOutlined } from "@ant-design/icons";
import { useStyles } from "./style/mechanicDashboardStyle";

const { Title } = Typography;

interface JobCard {
  id: string;
  vehicle: string;
  status: string;
}

const MechanicDashboard: React.FC = () => {
  const { styles } = useStyles();

  const totalJobCards = 12;
  const totalVehicles = 7;

  const recentJobCards: JobCard[] = [
    { id: "JC-101", vehicle: "Toyota Hilux", status: "In Progress" },
    { id: "JC-102", vehicle: "Ford Ranger", status: "Completed" },
    { id: "JC-103", vehicle: "Isuzu D-Max", status: "Pending" },
  ];

  return (
    <div>
      <Title level={2} style={{ marginBottom: 24 }}>
        Welcome, Mechanic
      </Title>

      <Row gutter={[24, 24]}>
        <Col xs={24} sm={12} md={8}>
          <Card hoverable className={styles.dashboardCard}>
            <ToolOutlined style={{ fontSize: 36, color: "#4a90e2" }} />
            <Title level={4} style={{ marginTop: 12 }}>
              Job Cards
            </Title>
            <div>{totalJobCards}</div>
          </Card>
        </Col>

        <Col xs={24} sm={12} md={8}>
          <Card hoverable className={styles.dashboardCard}>
            <CarOutlined style={{ fontSize: 36, color: "#50c878" }} />
            <Title level={4} style={{ marginTop: 12 }}>
              Vehicles Assigned
            </Title>
            <div>{totalVehicles}</div>
          </Card>
        </Col>
      </Row>

      <Card title="Recent Job Cards" className={styles.recentJobsCard}>
        <List
          dataSource={recentJobCards}
          renderItem={(job) => (
            <List.Item>
              <div className={styles.listItem}>
                <span>{job.id}</span>
                <span>{job.vehicle}</span>
                <span
                  style={{
                    color:
                      job.status === "Completed"
                        ? "green"
                        : job.status === "In Progress"
                        ? "#f5a623"
                        : "red",
                  }}
                >
                  {job.status}
                </span>
              </div>
            </List.Item>
          )}
        />
      </Card>
    </div>
  );
};

export default MechanicDashboard;
