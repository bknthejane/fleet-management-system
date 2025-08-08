"use client";

import React, { useEffect, useState } from "react";
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
  const { getJobCardList } = useJobCardActions();
  const { getMechanicList } = useMechanicActions();

  const [loggedInUser, setLoggedInUser] = useState<string>("");
  const [municipalityId, setMunicipalityId] = useState<string>("");
  const [municipalityName, setMunicipalityName] = useState<string>("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUserName = sessionStorage.getItem("loggedInUser") || "";
    const storedMunicipalityId = sessionStorage.getItem("municipalityId") || "";
    const storedMunicipalityName = sessionStorage.getItem("municipalityName") || "";

    setLoggedInUser(storedUserName);
    setMunicipalityId(storedMunicipalityId);
    setMunicipalityName(storedMunicipalityName);

    const fetchData = async () => {
      setLoading(true);
      try {
        await Promise.all([
          getJobCardList(),
          getMechanicList()
        ]);
      } catch (error) {
        console.error("Failed to fetch dashboard data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const totalJobCards = jobCards?.length || 0;
  const totalMechanics = mechanics?.length || 0;

  const currentDate = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const recentJobCards = [...(jobCards ?? [])]
    .sort((a, b) => new Date(b.dateOpened ?? "").getTime() - new Date(a.dateOpened ?? "").getTime())
    .slice(0, 5);

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

      <Row gutter={[24, 24]}>
        <Col xs={24} sm={12}>
          <Card hoverable className={styles.dashboardCard} loading={loading}>
            <FileTextOutlined style={{ fontSize: 36, color: "#4a90e2" }} />
            <Text className={styles.cardText}>  {totalJobCards}</Text>
            <Title level={4} style={{ marginTop: 12 }}>
              Job Cards
            </Title>
          </Card>
        </Col>

        <Col xs={24} sm={12}>
          <Card hoverable className={styles.dashboardCard} loading={loading}>
            <ToolOutlined style={{ fontSize: 36, color: "#50c878" }} />
            <Text className={styles.cardText}>  {totalMechanics}</Text>
            <Title level={4} style={{ marginTop: 12 }}>
              Mechanics
            </Title>
          </Card>
        </Col>
      </Row>

      <Card
        title="Recent Job Cards"
        style={{ marginTop: 32, background: "white" }}
        loading={loading}
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
                description={`Issue: ${item.notes ?? "No issue"} | Date: ${
                  item.dateOpened
                    ? new Date(item.dateOpened).toLocaleDateString("en-ZA", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })
                    : "Unknown Date"
                } | Assigned Mechanic: ${item.assignedMechanicName ?? "Unassigned"}`}
              />
            </List.Item>
          )}
        />
      </Card>
    </div>
  );
};

export default SupervisorDashboard;
