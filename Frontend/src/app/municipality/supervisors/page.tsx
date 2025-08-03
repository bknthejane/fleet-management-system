"use client";

import React from "react";
import { Table, Button, Typography, Card, Space, Avatar } from "antd";
import { PlusOutlined, UserOutlined } from "@ant-design/icons";
import { useRouter } from "next/navigation";
import { useStyles } from "./style/supervisorsStyle";

const { Title } = Typography;

const SupervisorsPage: React.FC = () => {
  const { styles } = useStyles();
  const router = useRouter();

  // Example data
  const supervisors = [
    { key: "1", name: "John Smith", email: "john.smith@email.com", department: "Transport" },
    { key: "2", name: "Mary Johnson", email: "mary.j@email.com", department: "Logistics" },
    { key: "3", name: "Robert Brown", email: "robert.b@email.com", department: "Maintenance" },
  ];

  const columns = [
    {
      title: "Supervisor",
      dataIndex: "name",
      key: "name",
      render: (text: string) => (
        <Space>
          <Avatar icon={<UserOutlined />} />
          {text}
        </Space>
      ),
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Department",
      dataIndex: "department",
      key: "department",
    },
  ];

  return (
    <div>
      {/* Header Section */}
      <div className={styles.pageHeader}>
        <Title level={3} className={styles.pageTitle}>
          Supervisors
        </Title>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => router.push("/municipality/add-supervisor")}
        >
          Add Supervisor
        </Button>
      </div>

      {/* Table Section */}
      <Card className={styles.tableCard}>
        <Table
          columns={columns}
          dataSource={supervisors}
          pagination={{ pageSize: 5 }}
          rowKey="key"
        />
      </Card>
    </div>
  );
};

export default SupervisorsPage;
