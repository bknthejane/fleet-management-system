"use client";

import React from "react";
import { Table, Typography, Button, Space } from "antd";
import type { ColumnsType } from "antd/es/table";
import { useStyles } from "./style/jobCardStyle";

const { Title } = Typography;

interface JobCard {
  id: string;
  vehicle: string;
  issue: string;
  status: string;
  assignedMechanic: string;
  dateCreated: string;
}

const JobCardsPage: React.FC = () => {
  const { styles } = useStyles();

  const jobCards: JobCard[] = [
    {
      id: "JC-001",
      vehicle: "Toyota Hilux",
      issue: "Engine overheating",
      status: "In Progress",
      assignedMechanic: "John Doe",
      dateCreated: "2025-07-28",
    },
    {
      id: "JC-002",
      vehicle: "Ford Ranger",
      issue: "Brake replacement",
      status: "Completed",
      assignedMechanic: "Jane Smith",
      dateCreated: "2025-07-25",
    },
    {
      id: "JC-003",
      vehicle: "Isuzu D-Max",
      issue: "Oil change",
      status: "Pending",
      assignedMechanic: "Mike Johnson",
      dateCreated: "2025-07-20",
    },
  ];

  const columns: ColumnsType<JobCard> = [
    {
      title: "Job Card ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Vehicle",
      dataIndex: "vehicle",
      key: "vehicle",
    },
    {
      title: "Issue",
      dataIndex: "issue",
      key: "issue",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      filters: [
        { text: "Pending", value: "Pending" },
        { text: "In Progress", value: "In Progress" },
        { text: "Completed", value: "Completed" },
      ],
      onFilter: (value, record) => record.status === value,
    },
    {
      title: "Assigned Mechanic",
      dataIndex: "assignedMechanic",
      key: "assignedMechanic",
    },
    {
      title: "Date Created",
      dataIndex: "dateCreated",
      key: "dateCreated",
    },
    {
      title: "Actions",
      key: "actions",
      render: () => (
        <Space size="middle">
          <Button type="link">View</Button>
          <Button type="link" danger>
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <Title level={2} style={{ marginBottom: 24 }}>
        Job Cards
      </Title>

      <Table<JobCard>
        columns={columns}
        dataSource={jobCards}
        rowKey="id"
        className={styles.table}
        pagination={{ pageSize: 5 }}
      />
    </div>
  );
};

export default JobCardsPage;
