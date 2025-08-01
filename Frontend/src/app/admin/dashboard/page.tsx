"use client";

import React, { useState } from "react";
import {
  Card,
  Row,
  Col,
  Typography,
  List,
  Avatar,
  Button,
  Pagination,
  Modal,
  Form,
  Input,
} from "antd";
import { BankOutlined, PlusOutlined, MoreOutlined } from "@ant-design/icons";
import { useStyles } from "./style/dashboardStyles";

const { Title, Text } = Typography;

interface Municipality {
  id: string;
  name: string;
  admin: string;
  address?: string;
  contactPerson?: string;
  email?: string;
  contactNumber?: string;
  adminUserName?: string;
  adminEmail?: string;
  adminPassword?: string;
}

const Dashboard: React.FC = () => {
  const { styles } = useStyles();

  const [allMunicipalities, setAllMunicipalities] = useState<Municipality[]>([
    { id: "01", name: "Mangaung Metro", admin: "John Mokoena" },
    { id: "02", name: "Kopanong Local", admin: "Sarah Khumalo" },
    { id: "03", name: "Mohokare Local", admin: "Palesa Dlamini" },
    { id: "04", name: "Naledi Local", admin: "David Molefe" },
    { id: "05", name: "Tswelopele Local", admin: "Nthabiseng Radebe" },
    { id: "06", name: "Mantsopa Local", admin: "Lebohang Nkoane" },
    { id: "07", name: "Matjhabeng Local", admin: "Sello Phiri" },
    { id: "08", name: "Masilonyana Local", admin: "Karabo Ntuli" },
    { id: "09", name: "Dihlabeng Local", admin: "Rethabile Mothibi" },
  ]);

  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5;
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const currentMunicipalities = allMunicipalities.slice(startIndex, endIndex);

  const recentMunicipalities = allMunicipalities.slice(-4);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [step, setStep] = useState<1 | 2>(1);
  const [form] = Form.useForm();

  const openModal = () => {
    form.resetFields();
    setStep(1);
    setIsModalOpen(true);
  };

  const handleModalCancel = () => {
    setIsModalOpen(false);
    setStep(1);
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

  const handleModalSubmit = () => {
    form
      .validateFields()
      .then((values) => {
        const newMunicipality: Municipality = {
          id: (allMunicipalities.length + 1).toString().padStart(2, "0"),
          name: values.name,
          admin: values.adminUserName || values.contactPerson,
          address: values.address,
          contactPerson: values.contactPerson,
          email: values.email,
          contactNumber: values.contactNumber,
          adminUserName: values.adminUserName,
          adminEmail: values.adminEmail,
          adminPassword: values.adminPassword,
        };
        setAllMunicipalities([newMunicipality, ...allMunicipalities]);
        setIsModalOpen(false);
        setCurrentPage(1);
        setStep(1);
      })
      .catch((info) => {
        console.log("Validate Failed:", info);
      });
  };

  return (
    <div className={styles.container}>
      <div className={styles.headerSection}>
        <Title level={2} className={styles.mainTitle}>
          Municipality Management
        </Title>
        <Text className={styles.subtitle}>
          Manage municipalities and their administrators
        </Text>
      </div>

      <Row gutter={[24, 24]} className={styles.folderGrid}>
        {currentPage === 1 && (
          <Col xs={24} sm={12} md={8} lg={8}>
            <Card className={styles.addFolderCard}>
              <div className={styles.addFolderContent}>
                <Button
                  type="dashed"
                  icon={<PlusOutlined />}
                  className={styles.addButton}
                  size="large"
                  onClick={openModal}
                >
                  Add Municipality
                </Button>
              </div>
            </Card>
          </Col>
        )}

        {currentMunicipalities.map((municipality) => (
          <Col xs={24} sm={12} md={8} lg={8} key={municipality.id}>
            <Card className={styles.folderCard}>
              <div className={styles.folderHeader}>
                <span className={styles.folderId}>{municipality.id}</span>
                <Button
                  type="text"
                  icon={<MoreOutlined />}
                  className={styles.moreButton}
                />
              </div>
              <div
                className={styles.folderIcon}
                style={{ backgroundColor: "#10b981" }}
              >
                <BankOutlined />
              </div>
              <div className={styles.folderInfo}>
                <Title level={5} className={styles.folderTitle}>
                  {municipality.name}
                </Title>
                <Text className={styles.folderSubtitle}>
                  Admin: {municipality.admin}
                </Text>
              </div>
            </Card>
          </Col>
        ))}
      </Row>

      <div style={{ textAlign: "center", marginTop: 30, marginBottom: 30 }}>
        <Pagination
          current={currentPage}
          pageSize={pageSize}
          total={allMunicipalities.length}
          onChange={(page) => setCurrentPage(page)}
        />
      </div>

      <Row gutter={[24, 24]} className={styles.statsSection}>
        <Col xs={24} lg={24}>
          <Card className={styles.recentCard} style={{ padding: 20 }}>
            <div className={styles.cardHeader}>
              <Title level={4}>Recent Municipalities</Title>
              <Button
                type="text"
                icon={<MoreOutlined />}
                className={styles.moreButton}
              />
            </div>
            <List
              dataSource={recentMunicipalities}
              itemLayout="horizontal"
              renderItem={(item) => (
                <List.Item
                  className={styles.fileItem}
                  key={item.id}
                  style={{ padding: "12px 0" }}
                >
                  <div
                    className={styles.fileInfo}
                    style={{ display: "flex", alignItems: "center" }}
                  >
                    <Avatar
                      size={48}
                      style={{
                        backgroundColor: "#10b981",
                        fontSize: 18,
                        fontWeight: 600,
                      }}
                    >
                      {item.name.charAt(0)}
                    </Avatar>
                    <div className={styles.fileDetails} style={{ marginLeft: 16 }}>
                      <Text className={styles.fileName} style={{ fontSize: 16 }}>
                        {item.name}
                      </Text>
                      <div style={{ marginTop: 4 }}>
                        <Text type="secondary">Admin: {item.admin}</Text>
                      </div>
                    </div>
                  </div>
                  <Text className={styles.fileDate}>ID: {item.id}</Text>
                </List.Item>
              )}
            />
          </Card>
        </Col>
      </Row>

      <Modal
        title={step === 1 ? "Add Municipality" : "Add Admin Account"}
        open={isModalOpen}
        onCancel={handleModalCancel}
        footer={
          step === 1
            ? [
                <Button key="cancel" onClick={handleModalCancel}>
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
                <Button key="submit" type="primary" onClick={handleModalSubmit}>
                  Submit
                </Button>,
              ]
        }
        width={700}
      >
        <Form form={form} layout="vertical" preserve={false} autoComplete="off">
          {step === 1 && (
            <>
              <Form.Item
                name="name"
                label="Municipality Name"
                rules={[{ required: true, message: "Please enter municipality name" }]}
              >
                <Input placeholder="Enter municipality name" />
              </Form.Item>

              <Form.Item
                name="address"
                label="Address"
                rules={[{ required: true, message: "Please enter address" }]}
              >
                <Input placeholder="Enter address" />
              </Form.Item>

              <Form.Item
                name="contactPerson"
                label="Contact Person"
                rules={[{ required: true, message: "Please enter contact person" }]}
              >
                <Input placeholder="Enter contact person" />
              </Form.Item>

              <Form.Item
                name="email"
                label="Email"
                rules={[
                  { required: true, message: "Please enter email" },
                  { type: "email", message: "Please enter a valid email" },
                ]}
              >
                <Input placeholder="Enter email" />
              </Form.Item>

              <Form.Item
                name="contactNumber"
                label="Contact Number"
                rules={[{ required: true, message: "Please enter contact number" }]}
              >
                <Input placeholder="Enter contact number" />
              </Form.Item>
            </>
          )}

          {step === 2 && (
            <>
              <Form.Item
                name="adminUserName"
                label="Admin Username"
                rules={[{ required: true, message: "Please enter admin username" }]}
              >
                <Input placeholder="Enter admin username" />
              </Form.Item>

              <Form.Item
                name="adminEmail"
                label="Admin Email"
                rules={[
                  { required: true, message: "Please enter admin email" },
                  { type: "email", message: "Please enter a valid email" },
                ]}
              >
                <Input placeholder="Enter admin email" />
              </Form.Item>

              <Form.Item
                name="adminPassword"
                label="Admin Password"
                rules={[
                  { required: true, message: "Please enter admin password" },
                  { min: 6, message: "Password must be minimum 6 characters" },
                ]}
              >
                <Input.Password placeholder="Enter admin password" />
              </Form.Item>
            </>
          )}
        </Form>
      </Modal>
    </div>
  );
};

export default Dashboard;
