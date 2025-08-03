"use client";

import React from "react";
import { Table, Button, Typography, Card, Space, Avatar } from "antd";
import { PlusOutlined, CarOutlined } from "@ant-design/icons";
import { useRouter } from "next/navigation";
import { useStyles } from "./style/vehiclesStyle";

const { Title } = Typography;

const VehiclesPage: React.FC = () => {
  const { styles } = useStyles();
  const router = useRouter();

  // Example data
  const vehicles = [
    { key: "1", plate: "FZ-120", type: "Truck", status: "Active" },
    { key: "2", plate: "GH-432", type: "Van", status: "In Service" },
    { key: "3", plate: "JK-987", type: "Car", status: "Active" },
  ];

  const columns = [
    {
      title: "Vehicle",
      dataIndex: "plate",
      key: "plate",
      render: (text: string) => (
        <Space>
          <Avatar icon={<CarOutlined />} />
          {text}
        </Space>
      ),
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status: string) => (
        <span style={{ color: status === "Active" ? "#50c878" : "#f5a623" }}>
          {status}
        </span>
      ),
    },
  ];

  return (
    <div>
      {/* Header Section */}
      <div className={styles.pageHeader}>
        <Title level={3} className={styles.pageTitle}>
          Vehicles
        </Title>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => router.push("/municipality/add-vehicle")}
        >
          Add Vehicle
        </Button>
      </div>

      {/* Table Section */}
      <Card className={styles.tableCard}>
        <Table
          columns={columns}
          dataSource={vehicles}
          pagination={{ pageSize: 5 }}
          rowKey="key"
        />
      </Card>
    </div>
  );
};

export default VehiclesPage;
