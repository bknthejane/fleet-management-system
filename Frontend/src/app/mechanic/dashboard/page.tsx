"use client";

import React, { useState, useEffect } from "react";
import { Card, Row, Col, Typography } from "antd";
import { ToolOutlined } from "@ant-design/icons";
import { useStyles } from "./style/mechanicDashboardStyle";
import { useJobCardState, useJobCardActions } from "@/providers/jobCard-provider";

const { Title, Text } = Typography;

const MechanicDashboard: React.FC = () => {
  const { styles } = useStyles();

  const { jobCards } = useJobCardState();
  const { getJobCardList } = useJobCardActions();

  const [municipalityName, setMunicipalityName] = useState("");
  const [loggedInUser, setLoggedInUser] = useState("Mechanic");
  const [mechanicId, setMechanicId] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setMunicipalityName(sessionStorage.getItem("municipalityName") || "");
    setLoggedInUser(sessionStorage.getItem("loggedInUser") || "Mechanic");
    setMechanicId(sessionStorage.getItem("mechanicId") || "");

    async function fetchData() {
      setLoading(true);
      try {
        await getJobCardList();
      } catch (error) {
        console.error("Failed to fetch job cards:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  const filteredJobCards = jobCards?.filter((jc) => jc.assignedMechanicId === mechanicId) || [];

  const totalJobCards = filteredJobCards.length;
  const pendingJobCards = filteredJobCards.filter(jc => jc.status === "Pending").length;
  const completedJobCards = filteredJobCards.filter(jc => jc.status === "Completed").length;

  const currentDate = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div>
      <Card className={styles.welcomeCard} loading={loading}>
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
          <Card hoverable className={styles.dashboardCard} loading={loading}>
            <ToolOutlined style={{ fontSize: 36, color: "#4a90e2" }} />
            <Title level={4} style={{ marginTop: 12 }}>
              Total Job Cards
            </Title>
            <p style={{ fontSize: 24, margin: 0 }}>{totalJobCards}</p>
          </Card>
        </Col>

        <Col xs={24} sm={12} md={8}>
          <Card
            hoverable
            className={styles.dashboardCard}
            loading={loading}
            style={{ borderColor: "#faad14" }}
          >
            <ToolOutlined style={{ fontSize: 36, color: "#faad14" }} />
            <Title level={4} style={{ marginTop: 12 }}>
              Pending Job Cards
            </Title>
            <p style={{ fontSize: 24, margin: 0 }}>{pendingJobCards}</p>
          </Card>
        </Col>

        <Col xs={24} sm={12} md={8}>
          <Card
            hoverable
            className={styles.dashboardCard}
            loading={loading}
            style={{ borderColor: "#52c41a" }}
          >
            <ToolOutlined style={{ fontSize: 36, color: "#52c41a" }} />
            <Title level={4} style={{ marginTop: 12 }}>
              Completed Job Cards
            </Title>
            <p style={{ fontSize: 24, margin: 0 }}>{completedJobCards}</p>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default MechanicDashboard;
