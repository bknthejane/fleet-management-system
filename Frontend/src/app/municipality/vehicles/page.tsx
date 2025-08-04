"use client";

import React, { useEffect, useState } from "react";
import { Table, Button, Typography, Card, Space, Avatar, message, Modal } from "antd";
import { PlusOutlined, CarOutlined } from "@ant-design/icons";
import { useRouter } from "next/navigation";
import { useStyles } from "./style/vehiclesStyle";
import { IVehicle } from "@/providers/vehicle-provider/context";
import { useVehicleState, useVehicleActions } from "@/providers/vehicle-provider";
import { ColumnsType } from "antd/es/table";
import VehicleModal from "@/components/VehicleModal";

const { Title } = Typography;

const VehiclesPage: React.FC = () => {
  const { styles } = useStyles();
  const router = useRouter();

  const { vehicles } = useVehicleState();
  const { getVehicleList, createVehicle, updateVehicle, deleteVehicle } = useVehicleActions();

  const [modalVisible, setModalVisible] = useState(false);
  const [editRecord, setEditRecord] = useState<IVehicle | null>(null);

  const [municipalityId, setMunicipalityId] = useState<string>("");

  useEffect(() => {
    const storedMunicipalityId = sessionStorage.getItem("municipalityId") || "";
    setMunicipalityId(storedMunicipalityId);

    if (storedMunicipalityId) {
      getVehicleList();
    }
  }, ['']);

  const openModal = (record?: IVehicle) => {
    setEditRecord(record || null);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setEditRecord(null);
  };

  const handleSaveVehicle = async (values: IVehicle) => {
    try {
      const userId = sessionStorage.getItem("userId") || "";
      const municipalityId = sessionStorage.getItem("municipalityId") || "";
      const municipalityName = sessionStorage.getItem("municipalityName") || "";

      const vehicle: IVehicle = {
        ...values,
        id: editRecord?.id,
        creatorUserId: editRecord?.creatorUserId ?? userId,
        municipalityId: editRecord?.municipalityId ?? municipalityId,
        municipalityName: editRecord?.municipalityName ?? municipalityName,
      };

      if (editRecord) {
        await updateVehicle(vehicle);
        message.success(`Updated Vehicle: ${vehicle.fleetNumber}`)
      } else {
        await createVehicle(vehicle)
        message.success(`Added Vehicle: ${vehicle.fleetNumber}`);
      }

      getVehicleList();
      closeModal();
    } catch (error) {
      console.error("Error saving vehicle:", error);
      message.error("Failed to save vehicle");
    }
  };

  const handleDeleteVehicle = (id?: string) => {
    if (!id) return;

    Modal.confirm({
      title: "Are you sure you want to delete this vehicle?",
      okText: "Delete",
      okType: "danger",
      onOk: async () => {
        await deleteVehicle(id);
        message.success("Vehicle deleted successfully");
        getVehicleList();
      },
    });
  };

  const filteredVehicles = vehicles?.filter(
    (veh) => veh.municipalityId?.toString() === municipalityId
  ) || [];

  const columns: ColumnsType<IVehicle> = [
    {
      title: "Fleet Number",
      dataIndex: "name",
      key: "name",
      render: (_, record) => (
        <Space>
          <Avatar icon={<CarOutlined />} />
          {record.fleetNumber}
        </Space>
      ),
    },
    { title: "Registration Number", key: "registrationNumber", render: (_, record) => record.registrationNumber || "-" },
    { title: "Model", key: "model", render: (_, record) => record.model || "-" },
    { title: "Make", key: "make", render: (_, record) => record.make || "-" },
    { title: "License Exipiry", key: "licenseExpiry", render: (_, record) => record.licenseExpiry || "-" },
    { title: "Assigned Driver", key: "assignedDriverName", render: (_, record) => record.assignedDriverName || "-" },
    { title: "Assigned Municipality", key: "municipalityName", render: (_, record) => record.municipalityName || "-" },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Space>
          <Button type="link" onClick={() => openModal(record)}>Edit</Button>
          <Button danger type="link" onClick={() => handleDeleteVehicle(record.id)}>Delete</Button>
        </Space>
      ),
    },
  ]

  return (
    <div>
      <div className={styles.pageHeader}>
        <Title level={3} className={styles.pageTitle}>
          Vehicles
        </Title>
        <Button type="primary" onClick={() => openModal()}>
          Add Vechicle
        </Button>
      </div>

       <Card className={styles.tableCard}>
        <Table
          columns={columns}
          dataSource={filteredVehicles}
          rowKey="id"
          pagination={{ pageSize: 5 }}
          bordered
        />
      </Card>

      <VehicleModal
        open={modalVisible}
        onClose={closeModal}
        editRecord={editRecord}
        onSave={handleSaveVehicle}
      />
    </div>
  );
};

export default VehiclesPage;
