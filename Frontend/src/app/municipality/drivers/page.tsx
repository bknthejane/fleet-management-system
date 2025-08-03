"use client";

import React from "react";
import { Table, Button, Typography, Card, Space, Avatar } from "antd";
import { PlusOutlined, IdcardOutlined } from "@ant-design/icons";
import { useRouter } from "next/navigation";
import { useStyles } from "./style/driversStyle";

const { Title } = Typography;

const DriversPage: React.FC = () => {
  const { styles } = useStyles();
  const router = useRouter();

  // Example data
  const drivers = [
    { key: "1", name: "James Carter", email: "j.carter@email.com", license: "B12345" },
    { key: "2", name: "Anna White", email: "anna.w@email.com", license: "C98765" },
    { key: "3", name: "Michael Green", email: "m.green@email.com", license: "D54321" },
  ];

  const columns = [
    {
      title: "Driver",
      dataIndex: "name",
      key: "name",
      render: (text: string) => (
        <Space>
          <Avatar icon={<IdcardOutlined />} />
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
      title: "License No.",
      dataIndex: "license",
      key: "license",
    },
  ];

  return (
    <div>
      {/* Header Section */}
      <div className={styles.pageHeader}>
        <Title level={3} className={styles.pageTitle}>
          Drivers
        </Title>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => router.push("/municipality/add-driver")}
        >
          Add Driver
        </Button>
      </div>

      {/* Table Section */}
      <Card className={styles.tableCard}>
        <Table
          columns={columns}
          dataSource={drivers}
          pagination={{ pageSize: 5 }}
          rowKey="key"
        />
      </Card>
    </div>
  );
};

export default DriversPage;
