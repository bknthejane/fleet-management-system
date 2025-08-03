"use client";

import React from "react";
import { Table, Typography, Avatar } from "antd";
import { UserOutlined } from "@ant-design/icons";
import type { ColumnsType } from "antd/es/table";
import { useStyles } from "./style/mechanicStyle";

const { Title } = Typography;

interface Mechanic {
  id: string;
  name: string;
  contact: string;
  specialization: string;
  status: "Active" | "Inactive";
}

const MechanicsPage: React.FC = () => {
  const { styles } = useStyles();

  // Sample data - replace with API or database data
  const mechanics: Mechanic[] = [
    {
      id: "M-001",
      name: "John Doe",
      contact: "john.doe@email.com",
      specialization: "Engine Specialist",
      status: "Active",
    },
    {
      id: "M-002",
      name: "Jane Smith",
      contact: "jane.smith@email.com",
      specialization: "Brake Specialist",
      status: "Active",
    },
    {
      id: "M-003",
      name: "Mike Johnson",
      contact: "mike.johnson@email.com",
      specialization: "Oil Change Expert",
      status: "Inactive",
    },
  ];

  const columns: ColumnsType<Mechanic> = [
    {
      title: "Mechanic",
      dataIndex: "name",
      key: "name",
      render: (name: string) => (
        <span>
          <Avatar icon={<UserOutlined />} style={{ marginRight: 8 }} />
          {name}
        </span>
      ),
    },
    {
      title: "Contact",
      dataIndex: "contact",
      key: "contact",
    },
    {
      title: "Specialization",
      dataIndex: "specialization",
      key: "specialization",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      filters: [
        { text: "Active", value: "Active" },
        { text: "Inactive", value: "Inactive" },
      ],
      onFilter: (value: boolean | React.Key, record: Mechanic) => {
        if (typeof value === "string" || typeof value === "boolean") {
          return record.status === value;
        }
        return false;
      },
      render: (status: string) => (
        <span style={{ color: status === "Active" ? "green" : "red" }}>
          {status}
        </span>
      ),
    },
  ];

  return (
    <div>
      <Title level={2} style={{ marginBottom: 24 }}>
        Mechanics
      </Title>

      <Table<Mechanic>
        columns={columns}
        dataSource={mechanics}
        rowKey="id"
        className={styles.table}
        pagination={{ pageSize: 5 }}
      />
    </div>
  );
};

export default MechanicsPage;
