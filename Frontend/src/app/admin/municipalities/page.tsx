"use client";

import React, { useState, useContext, useEffect } from "react";
import { Table, Button, Card, Typography, Modal, Form, Input, Space } from "antd";
import { PlusOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { useStyles } from "./style/municipalitiesStyles";
import { SearchContext } from "../layout";

const { Title } = Typography;

interface Municipality {
  id: string;
  name: string;
  address: string;
  contactPerson: string;
  email: string;
  contactNumber: string;
  adminUserName: string;
  adminEmail: string;
  adminPassword: string;
}

interface MunicipalitiesPageProps {
  onAddUser: (user: { id: string; name: string; email: string; role: string }) => void;
}

const MunicipalitiesPage: React.FC<MunicipalitiesPageProps> = ({ onAddUser }) => {
  const { styles } = useStyles();
  const [form] = Form.useForm();

  const [municipalities, setMunicipalities] = useState<Municipality[]>([]);
  const [filteredMunicipalities, setFilteredMunicipalities] = useState<Municipality[]>([]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [currentMunicipality, setCurrentMunicipality] = useState<Municipality | null>(null);

  const { searchQuery } = useContext(SearchContext);

  useEffect(() => {
    if (!searchQuery) {
      setFilteredMunicipalities(municipalities);
    } else {
      const lowerSearch = searchQuery.toLowerCase();
      setFilteredMunicipalities(
        municipalities.filter(
          (m) =>
            m.name.toLowerCase().includes(lowerSearch) ||
            m.address.toLowerCase().includes(lowerSearch) ||
            m.contactPerson.toLowerCase().includes(lowerSearch) ||
            m.email.toLowerCase().includes(lowerSearch) ||
            m.contactNumber.toLowerCase().includes(lowerSearch) ||
            m.adminUserName.toLowerCase().includes(lowerSearch) ||
            m.adminEmail.toLowerCase().includes(lowerSearch)
        )
      );
    }
  }, [searchQuery, municipalities]);

  const openModal = (record?: Municipality) => {
    if (record) {
      setIsEditMode(true);
      setCurrentMunicipality(record);
      form.setFieldsValue(record);
    } else {
      setIsEditMode(false);
      setCurrentMunicipality(null);
      form.resetFields();
    }
    setIsModalOpen(true);
  };

  const handleSave = () => {
    form.validateFields().then((values) => {
      if (isEditMode && currentMunicipality) {
        setMunicipalities(
          municipalities.map((m) =>
            m.id === currentMunicipality.id ? { ...currentMunicipality, ...values } : m
          )
        );
      } else {
        const newId = (municipalities.length + 1).toString().padStart(2, "0");
        const newMunicipality = { id: newId, ...values };
        setMunicipalities([...municipalities, newMunicipality]);

        onAddUser({
          id: newId,
          name: values.contactPerson,
          email: values.adminEmail,
          role: "Municipality Admin",
        });
      }
      setIsModalOpen(false);
    });
  };

  const handleDelete = (id: string) => {
    Modal.confirm({
      title: "Are you sure you want to delete this municipality?",
      okText: "Delete",
      okType: "danger",
      onOk: () => setMunicipalities(municipalities.filter((m) => m.id !== id)),
    });
  };

  const columns = [
    { title: "Name", dataIndex: "name", key: "name" },
    { title: "Address", dataIndex: "address", key: "address" },
    { title: "Contact Person", dataIndex: "contactPerson", key: "contactPerson" },
    { title: "Email", dataIndex: "email", key: "email" },
    { title: "Contact Number", dataIndex: "contactNumber", key: "contactNumber" },
    {
      title: "Actions",
      key: "actions",
      render: (_: any, record: Municipality) => (
        <Space>
          <Button icon={<EditOutlined />} onClick={() => openModal(record)} />
          <Button danger icon={<DeleteOutlined />} onClick={() => handleDelete(record.id)} />
        </Space>
      ),
    },
  ];

  return (
    <div className={styles.container}>
      <Card className={styles.card}>
        <div className={styles.headerSection}>
          <Title level={3} className={styles.title}>
            Municipalities
          </Title>
          <Button type="primary" icon={<PlusOutlined />} className={styles.addButton} onClick={() => openModal()}>
            Add Municipality
          </Button>
        </div>

        <Table
          columns={columns}
          dataSource={filteredMunicipalities}
          rowKey="id"
          pagination={{ pageSize: 5 }}
          className={styles.table}
          bordered
        />
      </Card>

      <Modal
        title={isEditMode ? "Edit Municipality" : "Add Municipality"}
        open={isModalOpen}
        onOk={handleSave}
        onCancel={() => setIsModalOpen(false)}
        width={700}
      >
        <Form form={form} layout="vertical" className={styles.modalForm}>
          <Title level={5}>Municipality Info</Title>
          <Form.Item name="name" label="Name" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="address" label="Address" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="contactPerson" label="Contact Person" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="email" label="Email" rules={[{ required: true, type: "email" }]}>
            <Input />
          </Form.Item>
          <Form.Item name="contactNumber" label="Contact Number" rules={[{ required: true }]}>
            <Input />
          </Form.Item>

          <Title level={5} style={{ marginTop: 16 }}>
            Admin Account Info
          </Title>
          <Form.Item name="adminUserName" label="Admin Username" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="adminEmail" label="Admin Email" rules={[{ required: true, type: "email" }]}>
            <Input />
          </Form.Item>
          <Form.Item name="adminPassword" label="Admin Password" rules={[{ required: true, min: 6 }]}>
            <Input.Password />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default MunicipalitiesPage;
