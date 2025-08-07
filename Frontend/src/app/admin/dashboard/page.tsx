"use client";

import React, { useEffect, useState } from "react";
import {
  Card,
  Row,
  Col,
  Typography,
  Button,
  Pagination,
  message,
  Spin,
} from "antd";
import { BankOutlined, PlusOutlined, MoreOutlined } from "@ant-design/icons";
import { useStyles } from "./style/dashboardStyles";
import { IMunicipality } from "@/providers/municipality-provider/context";
import {
  useMunicipalityActions,
  useMunicipalityState,
} from "@/providers/municipality-provider";
import MunicipalityModal from "@/components/MunicipalityModal";
import useApp from "antd/es/app/useApp";

const { Title, Text } = Typography;

const Dashboard: React.FC = () => {
  const { styles } = useStyles();
  const { municipalities } = useMunicipalityState();
  const { getMunicipalityList, createMunicipality } = useMunicipalityActions();

  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 6;
  const [modalVisible, setModalVisible] = useState(false);
  const [editRecord, setEditRecord] = useState<IMunicipality | null>(null);
  const [loading, setLoading] = useState(true);
  const app = useApp();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      await getMunicipalityList();
      setLoading(false);
    };

    fetchData();
  }, []);

  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const currentMunicipalities = municipalities?.slice(startIndex, endIndex);

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
      app.message.success(`Added Municipality: ${values.name}`);
      getMunicipalityList();
      closeModal();
    } catch (error) {
      console.error("Error saving municipality:", error);
      app.message.error("Failed to save municipality");
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.headerSection}>
        <Title level={2} className={styles.mainTitle}>
          Dashboard
        </Title>
        <Text className={styles.subtitle}>
          Manage your municipalities
        </Text>
      </div>

      {loading ? (
        <div style={{ textAlign: "center", padding: "50px" }}>
          <Spin size="large" style={{ color: "#6b7280 !important" }} />
        </div>
      ) : (
        <>
          <Row gutter={[24, 24]} className={styles.folderGrid}>
            {currentMunicipalities?.map((municipality) => (
              <Col xs={24} sm={12} md={8} key={municipality.id}>
                <Card className={styles.folderCard}>
                  <div className={styles.cardContent}>
                    <div
                      className={styles.folderIcon}
                      style={{ backgroundColor: "#6b6c6dff" }}
                    >
                      <BankOutlined />
                    </div>
                    <div className={styles.folderInfo}>
                      <Title level={5} className={styles.folderTitle}>
                        {municipality.name}
                      </Title>
                      <Text className={styles.folderSubtitle}>
                        Admin: {municipality.contactPerson || "N/A"}
                      </Text>
                    </div>
                  </div>
                  <Button
                    type="text"
                    icon={<MoreOutlined />}
                    className={styles.moreButton}
                    onClick={() => openModal(municipality)}
                  />
                </Card>
              </Col>
            ))}
          </Row>

          <div className={styles.paginationContainer}>
            <Pagination
              current={currentPage}
              pageSize={pageSize}
              total={municipalities?.length}
              onChange={(page) => setCurrentPage(page)}
              showSizeChanger={false}
            />
          </div>
        </>
      )}

      <Button
        type="default"
        shape="circle"
        size="large"
        icon={<PlusOutlined />}
        className={styles.fabButton}
        onClick={() => openModal()}
      />

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