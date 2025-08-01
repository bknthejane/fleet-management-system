"use client";

import React, { useState } from "react";
import {
  Table,
  Button,
  Card,
  Typography,
  Modal,
  Form,
  Input,
  Space,
} from "antd";
import { PlusOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { useStyles } from "./style/municipalitiesStyles";

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

const MunicipalitiesPage: React.FC = () => {
  const { styles } = useStyles();
  const [form] = Form.useForm();

  const [municipalities, setMunicipalities] = useState<Municipality[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [currentMunicipality, setCurrentMunicipality] = useState<Municipality | null>(null);
  
  const [step, setStep] = useState<1 | 2>(1);

  const openModal = (record?: Municipality) => {
    if (record) {
      setIsEditMode(true);
      setCurrentMunicipality(record);
      form.setFieldsValue(record);
      setStep(1);
    } else {
      setIsEditMode(false);
      setCurrentMunicipality(null);
      form.resetFields();
      setStep(1);
    }
    setIsModalOpen(true);
  };

  const handleNextStep = async () => {
    try {
      await form.validateFields([
        "name",
        "address",
        "contactPerson",
        "email",
        "contactNumber",
      ]);
      setStep(2);
    } catch {

    }
  };

  const handlePrevStep = () => {
    setStep(1);
  };

  const handleSave = () => {
    form
      .validateFields()
      .then((values) => {
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
        }
        setIsModalOpen(false);
        setStep(1);
      })
      .catch(() => {
        
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
      render: (_: unknown, record: Municipality) => (
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
          <Button
            type="primary"
            icon={<PlusOutlined />}
            className={styles.addButton}
            onClick={() => openModal()}
          >
            Add Municipality
          </Button>
        </div>

        <Table
          columns={columns}
          dataSource={municipalities}
          rowKey="id"
          pagination={{ pageSize: 5 }}
          className={styles.table}
          bordered
        />
      </Card>

      <Modal
        title={isEditMode ? "Edit Municipality" : "Add Municipality"}
        open={isModalOpen}
        onCancel={() => {
          setIsModalOpen(false);
          setStep(1);
        }}
        footer={
          step === 1
            ? [
                <Button key="cancel" onClick={() => { setIsModalOpen(false); setStep(1); }}>
                  Cancel
                </Button>,
                <Button key="next" type="primary" onClick={handleNextStep}>
                  Next
                </Button>,
              ]
            : [
                <Button key="back" onClick={handlePrevStep}>
                  Back
                </Button>,
                <Button key="submit" type="primary" onClick={handleSave}>
                  Submit
                </Button>,
              ]
        }
        width={700}
      >
        <Form form={form} layout="vertical" className={styles.modalForm} preserve={false} autoComplete="off">
          {step === 1 && (
            <>
              <Title level={5}>Municipality Info</Title>
              <Form.Item
                name="name"
                label="Name"
                rules={[{ required: true, message: "Please enter municipality name" }]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="address"
                label="Address"
                rules={[{ required: true, message: "Please enter address" }]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="contactPerson"
                label="Contact Person"
                rules={[{ required: true, message: "Please enter contact person" }]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="email"
                label="Email"
                rules={[
                  { required: true, message: "Please enter email" },
                  { type: "email", message: "Please enter a valid email" },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="contactNumber"
                label="Contact Number"
                rules={[{ required: true, message: "Please enter contact number" }]}
              >
                <Input />
              </Form.Item>
            </>
          )}

          {step === 2 && (
            <>
              <Title level={5} style={{ marginTop: 16 }}>
                Admin Account Info
              </Title>
              <Form.Item
                name="adminUserName"
                label="Admin Username"
                rules={[{ required: true, message: "Please enter admin username" }]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="adminEmail"
                label="Admin Email"
                rules={[
                  { required: true, message: "Please enter admin email" },
                  { type: "email", message: "Please enter a valid email" },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="adminPassword"
                label="Admin Password"
                rules={[
                  { required: true, message: "Please enter admin password" },
                  { min: 6, message: "Password must be minimum 6 characters" },
                ]}
              >
                <Input.Password />
              </Form.Item>
            </>
          )}
        </Form>
      </Modal>
    </div>
  );
};

export default MunicipalitiesPage;
