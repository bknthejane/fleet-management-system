"use client";

import React, { useState } from "react";
import { Card, Row, Col, Typography, Button, Modal, Form, Input, Table } from "antd";
import { AlertOutlined, PlusOutlined } from "@ant-design/icons";
import type { ColumnsType } from "antd/es/table";
import { useStyles } from "./style/driverDashboardStyle";

const { Title } = Typography;

interface Incident {
  id: string;
  description: string;
  status: string;
  dateReported: string;
}

const DriverDashboard: React.FC = () => {
  const { styles } = useStyles();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();

  const incidents: Incident[] = [
    { id: "INC-001", description: "Flat tire", status: "Resolved", dateReported: "2025-08-01" },
    { id: "INC-002", description: "Engine overheating", status: "Pending", dateReported: "2025-08-02" },
  ];

  const columns: ColumnsType<Incident> = [
    { title: "Incident ID", dataIndex: "id", key: "id" },
    { title: "Description", dataIndex: "description", key: "description" },
    { title: "Status", dataIndex: "status", key: "status" },
    { title: "Date Reported", dataIndex: "dateReported", key: "dateReported" },
  ];

  const handleLogIncident = () => {
    form.resetFields();
    setIsModalVisible(true);
  };

  const handleSubmit = () => {
    form.validateFields().then(values => {
      console.log("New Incident:", values);
      setIsModalVisible(false);
    });
  };

  return (
    <div>
      <Title level={2} style={{ marginBottom: 24 }}>
        Driver Dashboard
      </Title>

      <Row gutter={24}>
        <Col xs={24} sm={12} md={8}>
          <Card className={styles.dashboardCard}>
            <AlertOutlined style={{ fontSize: 36, color: "#ff4d4f" }} />
            <Title level={4} style={{ marginTop: 12 }}>Total Incidents</Title>
            <p style={{ fontSize: 24 }}>{incidents.length}</p>
          </Card>
        </Col>
        <Col xs={24} sm={12} md={8}>
          <Card className={styles.dashboardCard}>
            <AlertOutlined style={{ fontSize: 36, color: "#faad14" }} />
            <Title level={4} style={{ marginTop: 12 }}>Pending Incidents</Title>
            <p style={{ fontSize: 24 }}>{incidents.filter(i => i.status === "Pending").length}</p>
          </Card>
        </Col>
        <Col xs={24} sm={12} md={8}>
          <Card className={styles.dashboardCard}>
            <AlertOutlined style={{ fontSize: 36, color: "#52c41a" }} />
            <Title level={4} style={{ marginTop: 12 }}>Resolved Incidents</Title>
            <p style={{ fontSize: 24 }}>{incidents.filter(i => i.status === "Resolved").length}</p>
          </Card>
        </Col>
      </Row>

      <div style={{ marginTop: 40, marginBottom: 16, display: "flex", justifyContent: "space-between" }}>
        <Title level={4}>Recent Incidents</Title>
        <Button type="primary" icon={<PlusOutlined />} onClick={handleLogIncident}>
          Log Incident
        </Button>
      </div>

      <Table<Incident> columns={columns} dataSource={incidents} rowKey="id" pagination={false} className={styles.table} />

      <Modal
        title="Log New Incident"
        open={isModalVisible}
        onOk={handleSubmit}
        onCancel={() => setIsModalVisible(false)}
        okText="Submit"
      >
        <Form form={form} layout="vertical">
          <Form.Item name="description" label="Incident Description" rules={[{ required: true }]}>
            <Input.TextArea rows={3} placeholder="Describe the incident..." />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default DriverDashboard;
