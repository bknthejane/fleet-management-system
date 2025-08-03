"use client";

import React, { useEffect, useState } from "react";
import {
  Card,
  Row,
  Col,
  Typography,
  List,
  Avatar,
  Button,
  Pagination,
  message,
} from "antd";
import { BankOutlined, PlusOutlined, MoreOutlined } from "@ant-design/icons";
import { useStyles } from "./style/dashboardStyles";
import { IMunicipality } from "@/providers/municipality-provider/context";
import { useMunicipalityActions, useMunicipalityState } from "@/providers/municipality-provider";
import MunicipalityModal from "@/components/MunicipalityModal";

const { Title, Text } = Typography;

const Dashboard: React.FC = () => {
  const { styles } = useStyles();

  const { municipalities } = useMunicipalityState();
  const { getMunicipalityList, createMunicipality } = useMunicipalityActions();

  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5;
  const [modalVisible, setModalVisible] = useState(false);
  const [editRecord, setEditRecord] = useState<IMunicipality | null>(null);

  // Fetch municipalities on load
  useEffect(() => {
    getMunicipalityList();
  }, []);

  // Pagination
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const currentMunicipalities = municipalities?.slice(startIndex, endIndex);
  const recentMunicipalities = municipalities?.slice(-4);

  // Modal handling
  const openModal = (record?: IMunicipality) => {
    setEditRecord(record || null);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setEditRecord(null);
  };

  const handleSaveMunicipality = async (values: IMunicipality) => {
    try {
      const creatorId = sessionStorage.getItem("userId") || "";

      const newMunicipality: IMunicipality = {
        ...values,
        id: editRecord?.id || "",
        creatorUserId: editRecord?.creatorUserId || creatorId,
      };

      await createMunicipality(newMunicipality);
      message.success(`Added Municipality: ${values.name}`);
      getMunicipalityList();
      closeModal();
    } catch (error) {
      console.error("Error saving municipality:", error);
      message.error("Failed to save municipality");
    }
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

      {/* Municipality Cards */}
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
                  onClick={() => openModal()}
                >
                  Add Municipality
                </Button>
              </div>
            </Card>
          </Col>
        )}

        {currentMunicipalities?.map((municipality) => (
          <Col xs={24} sm={12} md={8} lg={8} key={municipality.id}>
            <Card className={styles.folderCard}>
              <div className={styles.folderHeader}>
                <span className={styles.folderId}></span>
                <Button
                  type="text"
                  icon={<MoreOutlined />}
                  className={styles.moreButton}
                  onClick={() => openModal(municipality)}
                />
              </div>
              <div className={styles.folderIcon} style={{ backgroundColor: "#10b981" }}>
                <BankOutlined />
              </div>
              <div className={styles.folderInfo}>
                <Title level={5} className={styles.folderTitle}>
                  {municipality.name}
                </Title>
                <Text className={styles.folderSubtitle}>
                  Admin: {municipality.adminUserName || municipality.contactPerson || "N/A"}
                </Text>
              </div>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Pagination */}
      <div style={{ textAlign: "center", marginTop: 30, marginBottom: 30 }}>
        <Pagination
          current={currentPage}
          pageSize={pageSize}
          total={municipalities?.length}
          onChange={(page) => setCurrentPage(page)}
        />
      </div>

      {/* Recent Municipalities */}
      <Row gutter={[24, 24]} className={styles.statsSection}>
        <Col xs={24} lg={24}>
          <Card className={styles.recentCard} style={{ padding: 20 }}>
            <div className={styles.cardHeader}>
              <Title level={4}>Recent Municipalities</Title>
              <Button type="text" icon={<MoreOutlined />} className={styles.moreButton} />
            </div>
            <List
              dataSource={recentMunicipalities}
              itemLayout="horizontal"
              renderItem={(item) => (
                <List.Item className={styles.fileItem} key={item.id} style={{ padding: "12px 0" }}>
                  <div className={styles.fileInfo} style={{ display: "flex", alignItems: "center" }}>
                    <Avatar
                      size={48}
                      style={{
                        backgroundColor: "#10b981",
                        fontSize: 18,
                        fontWeight: 600,
                      }}
                    >
                      {item.name?.charAt(0)}
                    </Avatar>
                    <div className={styles.fileDetails} style={{ marginLeft: 16 }}>
                      <Text className={styles.fileName} style={{ fontSize: 16 }}>
                        {item.name}
                      </Text>
                      <div style={{ marginTop: 4 }}>
                        <Text type="secondary">
                          Admin: {item.adminUserName || item.contactPerson || "N/A"}
                        </Text>
                      </div>
                    </div>
                  </div>
                </List.Item>
              )}
            />
          </Card>
        </Col>
      </Row>

      {/* Reuse MunicipalityModal */}
      <MunicipalityModal
        open={modalVisible}
        onClose={closeModal}
        editRecord={editRecord}
        onSave={handleSaveMunicipality}
      />
    </div>
  );
};

export default Dashboard;
