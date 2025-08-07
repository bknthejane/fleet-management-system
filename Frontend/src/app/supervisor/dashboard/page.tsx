"use client";

import React from "react";
import { Row, Col, Card, Typography, List, Avatar } from "antd";
import { FileTextOutlined, ToolOutlined } from "@ant-design/icons";
import { useStyles } from "./style/supervisorDashboardStyle";
import { useJobCardState, useJobCardActions } from "@/providers/jobCard-provider";
import { useMechanicState, useMechanicActions } from "@/providers/mechanic-provider";

const { Title, Text } = Typography;

const SupervisorDashboard: React.FC = () => {
  const { styles } = useStyles();

  const { jobCards } = useJobCardState();
  const { mechanics } = useMechanicState();

  const totalJobCards = jobCards?.length || 0;
  const totalMechanics = mechanics?.length || 0;

  const recentJobCards = [...(jobCards ?? [])]
    .sort((a, b) => new Date(b.dateOpened ?? "").getTime() - new Date(a.dateOpened ?? "").getTime())
    .slice(0, 5);



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
                title={`${item.jobCardNumber ?? "No JobCard Number"}`}
                description={`Issue: ${item.notes ?? "No issue"} | Date: ${item.dateOpened
                    ? new Date(item.dateOpened).toLocaleDateString("en-ZA", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })
                    : "Unknown Date"
                  } | Assigined Mechanic: ${item.assignedMechanicName ?? "Unassigned"}`}
              />
            </List.Item>
          )}
        />

      </Card>
    </div>
  );
};

export default SupervisorDashboard;
