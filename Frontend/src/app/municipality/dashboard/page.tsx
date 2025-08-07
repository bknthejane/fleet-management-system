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
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const storedUserName = sessionStorage.getItem("loggedInUser") || "";
        const storedMunicipalityId = sessionStorage.getItem("municipalityId") || "";
        const storedMunicipalityName = sessionStorage.getItem("municipalityName") || "";

        setLoggedInUser(storedUserName);
        setMunicipalityId(storedMunicipalityId);
        setMunicipalityName(storedMunicipalityName);

        const fetchData = async () => {
            if (storedMunicipalityId) {
                await Promise.all([
                    getSupervisorList(),
                    getDriverList(),
                    getVehicleList(),
                ]);
            }
            setLoading(false);
        };

        fetchData();
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
        <div style={{ backgroundColor: '#f5f7fa', minHeight: '100vh', padding: '24px' }}>
            <Card className={styles.welcomeCard}>
                <Title level={3} style={{ marginBottom: 4 }}>
                    Welcome Back{loggedInUser ? `, ${loggedInUser}` : ""}!
                </Title>
                <Text className={styles.secondaryText}>
                    {municipalityName ? `${municipalityName} | ` : ""}
                    Today is {currentDate}
                </Text>
            </Card>

            <Row gutter={[24, 24]} style={{ marginTop: 24 }}>
                <Col xs={24} sm={12} md={8}>
                    <Card hoverable className={styles.dashboardCard} loading={loading}>
                        <TeamOutlined className={styles.cardIcon} />
                        <Text className={styles.cardText}>{totalSupervisors}</Text>
                        <Title level={4} className={styles.cardTitle}>
                            Supervisors
                        </Title>
                        <div>
                            <Text className={styles.secondaryText}>Active Supervisors</Text>
                        </div>
                    </Card>
                </Col>

                <Col xs={24} sm={12} md={8}>
                    <Card hoverable className={styles.dashboardCard} loading={loading}>
                        <UserOutlined className={styles.cardIcon} />
                        <Text className={styles.cardText}>{totalDrivers}</Text>
                        <Title level={4} className={styles.cardTitle}>
                            Drivers
                        </Title>
                        <div>
                            <Text className={styles.secondaryText}>Registered Drivers</Text>
                        </div>
                    </Card>
                </Col>

                <Col xs={24} sm={12} md={8}>
                    <Card hoverable className={styles.dashboardCard} loading={loading}>
                        <CarOutlined className={styles.cardIcon} />
                        <Text className={styles.cardText}>{totalVehicles}</Text>
                        <Title level={4} className={styles.cardTitle}>
                            Vehicles
                        </Title>
                        <div>
                            <Text className={styles.secondaryText}>Fleet Vehicles</Text>
                        </div>
                    </Card>
                </Col>
            </Row>

            <Card className={styles.infoCard} style={{ marginTop: 32 }}>
                <InfoCircleOutlined style={{ fontSize: 20, color: "#9ca3af", marginRight: 8 }} />
                <Text className={styles.secondaryText}>
                    Keep your fleet and user data updated regularly to ensure smooth operations.
                </Text>
            </Card>
        </div>
    );
};

export default DashboardPage;