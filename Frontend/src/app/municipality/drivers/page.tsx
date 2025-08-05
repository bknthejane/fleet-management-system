"use client";

import React, { useState, useEffect } from "react";
import {
  Table,
  Button,
  Typography,
  Card,
  Space,
  Avatar,
  message,
  Modal,
} from "antd";
import { UserOutlined } from "@ant-design/icons";
import { useStyles } from "./style/driversStyle";
import { IDriver } from "@/providers/driver-provider/context";
import { IVehicle } from "@/providers/vehicle-provider/context";
import { useDriverState, useDriverActions } from "@/providers/driver-provider";
import { useVehicleState, useVehicleActions } from "@/providers/vehicle-provider";
import { useUserActions } from "@/providers/user-provider";
import { ColumnsType } from "antd/es/table";
import DriverModal from "@/components/DriverModal";

const { Title } = Typography;

const DriversPage: React.FC = () => {
  const { styles } = useStyles();

  const { drivers } = useDriverState();
  const { vehicles } = useVehicleState();
  const { getDriverList, createDriver, updateDriver, deleteDriver } = useDriverActions();
  const { getVehicleList, updateVehicle } = useVehicleActions();
  // const { updateUser, getUser } = useUserActions();

  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [assigning, setAssigning] = useState(false);
  const [unassigning, setUnassigning] = useState(false);

  const [driverModalVisible, setDriverModalVisible] = useState(false);
  const [editRecord, setEditRecord] = useState<IDriver | null>(null);

  const [viewModalVisible, setViewModalVisible] = useState(false);
  const [selectedDriver, setSelectedDriver] = useState<IDriver | null>(null);

  const [assignModalVisible, setAssignModalVisible] = useState(false);
  const [selectedVehicleId, setSelectedVehicleId] = useState<string | null>(null);

  const [municipalityId, setMunicipalityId] = useState<string>("");

  useEffect(() => {
    const storedMunicipalityId = sessionStorage.getItem("municipalityId") || "";
    setMunicipalityId(storedMunicipalityId);

    if (storedMunicipalityId) {
      getDriverList();
      getVehicleList();
    }
  }, []);

  const openDriverModal = (record?: IDriver) => {
    setEditRecord(record || null);
    setDriverModalVisible(true);
  };

  const closeDriverModal = () => {
    setDriverModalVisible(false);
    setEditRecord(null);
  };

  const handleSaveDriver = async (values: IDriver) => {
    setSaving(true);
    try {
      const userId = sessionStorage.getItem("userId") || "";
      const municipalityId = sessionStorage.getItem("municipalityId") || "";
      const municipalityName = sessionStorage.getItem("municipalityName") || "";

      const driver: IDriver = {
        ...values,
        id: editRecord?.id,
        creatorUserId: editRecord?.creatorUserId ?? userId,
        municipalityId: editRecord?.municipalityId ?? municipalityId,
        municipalityName: editRecord?.municipalityName ?? municipalityName,
        assignedVehicleId: editRecord?.assignedVehicleId,
      };

      if (editRecord) {
        await updateDriver(driver);
        message.success(`Updated Driver: ${driver.name}`);
      } else {
        await createDriver(driver);
        message.success(`Added Driver: ${driver.name}`);
      }

      await getDriverList();
      closeDriverModal();
    } catch (error) {
      console.error("Error saving driver:", error);
      message.error("Failed to save driver");
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteDriver = (id?: string) => {
    if (!id) return;

    Modal.confirm({
      title: "Are you sure you want to delete this driver?",
      okText: "Delete",
      okType: "danger",
      onOk: async () => {
        setDeleting(true);
        try {
          await deleteDriver(id);
          await getDriverList();
          message.success("Driver deleted successfully");
        } catch (error) {
          console.error("Delete error:", error);
          message.error("Failed to delete driver");
        } finally {
          setDeleting(false);
        }
      },
    });
  };

  const openViewModal = (driver: IDriver) => {
    setSelectedDriver(driver);
    setViewModalVisible(true);
  };

  const handleAssignVehicle = async () => {
    if (!selectedDriver || !selectedVehicleId) return;

    setAssigning(true);
    try {
      const selectedVehicle = vehicles?.find((v) => v.id === selectedVehicleId);
      if (!selectedVehicle) {
        message.error("Selected vehicle not found.");
        return;
      }

      await updateDriver({
        ...selectedDriver,
        assignedVehicleId: selectedVehicle.id,
        assignedVehicleFleetNumber: selectedVehicle.fleetNumber,
      });

      await updateVehicle({
        ...selectedVehicle,
        assignedDriverId: selectedDriver.id,
      });

      message.success("Vehicle assigned successfully!");
      await Promise.all([getDriverList(), getVehicleList()]);
      setAssignModalVisible(false);
      setSelectedVehicleId(null);
      setViewModalVisible(false);
    } catch (error) {
      console.error("Error assigning vehicle:", error);
      message.error("Failed to assign vehicle");
    } finally {
      setAssigning(false);
    }
  };


  const handleUnassignVehicle = async () => {
    if (!selectedDriver || !selectedDriver.assignedVehicleId) return;

    setUnassigning(true);
    try {
      const vehicleToUnassign = vehicles?.find(
        (v) => v.id === selectedDriver.assignedVehicleId
      );

      await updateDriver({
        ...selectedDriver,
        assignedVehicleId: undefined,
      });

      if (vehicleToUnassign) {
        await updateVehicle({
          ...vehicleToUnassign,
          assignedDriverId: undefined,
        });
      }

      message.success("Vehicle unassigned successfully!");
      await Promise.all([getDriverList(), getVehicleList()]);
      setViewModalVisible(false);
    } catch (error) {
      console.error("Error unassigning vehicle:", error);
      message.error("Failed to unassign vehicle");
    } finally {
      setUnassigning(false);
    }
  };

  const filteredDrivers =
    drivers?.filter((dri) => dri.municipalityId?.toString() === municipalityId) || [];

  const unassignedVehicles: IVehicle[] =
    vehicles?.filter(
      (v) => !v.assignedDriverId && v.municipalityId?.toString() === municipalityId
    ) || [];

  const columns: ColumnsType<IDriver> = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (_, record) => (
        <Space>
          <Avatar icon={<UserOutlined />} />
          {record.name}
        </Space>
      ),
    },
    { title: "Surname", key: "surname", render: (_, record) => record.surname || "-" },
    {
      title: "Municipality Name",
      key: "municipalityName",
      render: (_, record) => record.municipalityName || "-",
    },
    {
      title: "Assigned Vehicle",
      key: "assignedVehicleFleetNumber",
      render: (_, record) => record.assignedVehicleFleetNumber || "-",
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Space>
          <Button type="link" onClick={() => openViewModal(record)}>
            View
          </Button>
          <Button danger type="link" loading={deleting} onClick={() => handleDeleteDriver(record.id)}>
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <div className={styles.pageHeader}>
        <Title level={3} className={styles.pageTitle}>
          Drivers
        </Title>
        <Button type="primary" onClick={() => openDriverModal()}>
          Add Driver
        </Button>
      </div>

      <Card className={styles.tableCard}>
        <Table
          columns={columns}
          dataSource={filteredDrivers}
          pagination={{ pageSize: 5 }}
          rowKey="id"
          loading={!drivers}
        />
      </Card>

      <DriverModal
        open={driverModalVisible || viewModalVisible || assignModalVisible}
        onClose={() => {
          setDriverModalVisible(false);
          setViewModalVisible(false);
          setAssignModalVisible(false);
        }}
        editRecord={editRecord || selectedDriver}
        onSave={(driver) => {
          if (viewModalVisible) {
            setEditRecord(driver);
            setDriverModalVisible(true);
            setViewModalVisible(false);
          } else {
            handleSaveDriver(driver);
          }
        }}
        isViewMode={viewModalVisible}
        vehicles={unassignedVehicles}
        selectedVehicleId={selectedVehicleId}
        setSelectedVehicleId={setSelectedVehicleId}
        onAssign={handleAssignVehicle}
        assigning={assigning}
        onUnassign={handleUnassignVehicle}
        unassigning={unassigning}
        showAssignModal={assignModalVisible}
        setShowAssignModal={setAssignModalVisible}
        saving={saving}
      />
    </div>
  );
};

export default DriversPage;
