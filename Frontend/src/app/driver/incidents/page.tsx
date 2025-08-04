"use client";

import React from "react";
import { Table, Typography, Tag } from "antd";
import type { ColumnsType } from "antd/es/table";
import { useStyles } from "./style/driverIncidentStyle";

const { Title } = Typography;

interface Incident {
  id: string;
  description: string;
  status: "Pending" | "Resolved";
  dateReported: string;
}

const DriverIncidentsPage: React.FC = () => {
  const { styles } = useStyles();

  const incidents: Incident[] = [
    { id: "INC-001", description: "Flat tire", status: "Resolved", dateReported: "2025-08-01" },
    { id: "INC-002", description: "Engine overheating", status: "Pending", dateReported: "2025-08-02" },
  ];

  const columns: ColumnsType<Incident> = [
    { title: "Incident ID", dataIndex: "id", key: "id" },
    { title: "Description", dataIndex: "description", key: "description" },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status: Incident["status"]) => (
        <Tag color={status === "Resolved" ? "green" : "orange"}>{status}</Tag>
      ),
    },
    { title: "Date Reported", dataIndex: "dateReported", key: "dateReported" },
  ];

  return (
    <div>
      <Title level={2} style={{ marginBottom: 24 }}>All Incidents</Title>
      <Table<Incident> columns={columns} dataSource={incidents} rowKey="id" className={styles.table} />
    </div>
  );
};

export default DriverIncidentsPage;
