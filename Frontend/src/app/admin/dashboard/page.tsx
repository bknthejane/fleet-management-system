"use client";

import React, { useState } from "react";
import { Card, Row, Col, Typography, List, Avatar, Button, Pagination } from "antd";
import {
  BankOutlined,
  PlusOutlined,
  MoreOutlined,
} from "@ant-design/icons";
import { useStyles } from "./style/dashboardStyles";

const { Title, Text } = Typography;

const Dashboard: React.FC = () => {
  const { styles } = useStyles();

  // Example municipalities
  const allMunicipalities = [
    { id: "01", name: "Mangaung Metro", admin: "John Mokoena" },
    { id: "02", name: "Kopanong Local", admin: "Sarah Khumalo" },
    { id: "03", name: "Mohokare Local", admin: "Palesa Dlamini" },
    { id: "04", name: "Naledi Local", admin: "David Molefe" },
    { id: "05", name: "Tswelopele Local", admin: "Nthabiseng Radebe" },
    { id: "06", name: "Mantsopa Local", admin: "Lebohang Nkoane" },
    { id: "07", name: "Matjhabeng Local", admin: "Sello Phiri" },
    { id: "08", name: "Masilonyana Local", admin: "Karabo Ntuli" },
    { id: "09", name: "Dihlabeng Local", admin: "Rethabile Mothibi" },
  ];

  // Pagination for main municipalities grid
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5; // 6 cards per page
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const currentMunicipalities = allMunicipalities.slice(startIndex, endIndex);

  // Recent municipalities (last 4)
  const recentMunicipalities = allMunicipalities.slice(-4);

  return (
    <div className={styles.container}>
      {/* Header */}
      <div className={styles.headerSection}>
        <Title level={2} className={styles.mainTitle}>
          Municipality Management
        </Title>
        <Text className={styles.subtitle}>
          Manage municipalities and their administrators
        </Text>
      </div>

      {/* Municipalities Grid */}
      <Row gutter={[24, 24]} className={styles.folderGrid}>
        {/* Only show Add Municipality card on the first page */}
        {currentPage === 1 && (
          <Col xs={24} sm={12} md={8} lg={8}>
            <Card className={styles.addFolderCard}>
              <div className={styles.addFolderContent}>
                <Button
                  type="dashed"
                  icon={<PlusOutlined />}
                  className={styles.addButton}
                  size="large"
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
                <Button type="text" icon={<MoreOutlined />} className={styles.moreButton} />
              </div>
              <div className={styles.folderIcon} style={{ backgroundColor: "#10b981" }}>
                <BankOutlined />
              </div>
              <div className={styles.folderInfo}>
                <Title level={5} className={styles.folderTitle}>
                  {municipality.name}
                </Title>
                <Text className={styles.folderSubtitle}>Admin: {municipality.admin}</Text>
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
          total={allMunicipalities.length}
          onChange={(page) => setCurrentPage(page)}
        />
      </div>

      {/* Recent Municipalities - Full Width */}
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
                      {item.name.charAt(0)}
                    </Avatar>
                    <div className={styles.fileDetails} style={{ marginLeft: 16 }}>
                      <Text className={styles.fileName} style={{ fontSize: 16 }}>{item.name}</Text>
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
    </div>
  );
};

export default Dashboard;
