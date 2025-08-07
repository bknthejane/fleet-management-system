"use client";

import React, { useState, useEffect } from "react";
import {
    Table,
    Button,
    Typography,
    Card,
    Space,
    Avatar,
    Input
} from "antd";
import { UserOutlined, PlusOutlined, EyeOutlined } from "@ant-design/icons";
import { useStyles } from "./style/driversStyle";
import { IDriver } from "@/providers/driver-provider/context";
import { IVehicle } from "@/providers/vehicle-provider/context";
import { useDriverState, useDriverActions } from "@/providers/driver-provider";
import { useVehicleState, useVehicleActions } from "@/providers/vehicle-provider";
import { ColumnsType } from "antd/es/table";
import DriverModal from "@/components/DriverModal";
import useApp from "antd/es/app/useApp";

const { Title } = Typography;
const { Search } = Input;

const DriversPage: React.FC = () => {
    const { styles } = useStyles();

    const { drivers } = useDriverState();
    const { vehicles } = useVehicleState();
    const { getDriverList, createDriver, updateDriver } = useDriverActions();
    const { getVehicleList, updateVehicle } = useVehicleActions();

    const [saving, setSaving] = useState(false);
    const [assigning, setAssigning] = useState(false);
    const [unassigning, setUnassigning] = useState(false);

    
    const [modalOpen, setModalOpen] = useState(false);
    const [editRecord, setEditRecord] = useState<IDriver | null>(null);
    const [isViewMode, setIsViewMode] = useState(false);

    const [assignModalVisible, setAssignModalVisible] = useState(false);
    const [selectedVehicleId, setSelectedVehicleId] = useState<string | null>(null);
    const [searchText, setSearchText] = useState("");

    const [municipalityId, setMunicipalityId] = useState<string>("");
    const app = useApp();

    useEffect(() => {
        const storedMunicipalityId = sessionStorage.getItem("municipalityId") || "";
        setMunicipalityId(storedMunicipalityId);

        if (storedMunicipalityId) {
            getDriverList();
            getVehicleList();
        }
    }, []);

    const openCreateModal = () => {
        setEditRecord(null);
        setIsViewMode(false);
        setModalOpen(true);
    };

    const openEditModal = (record: IDriver) => {
        setEditRecord(record);
        setIsViewMode(false);
        setModalOpen(true);
    };

    const openViewModal = (record: IDriver) => {
        setEditRecord(record);
        setIsViewMode(true);
        setModalOpen(true);
    };

    const closeModal = () => {
        setModalOpen(false);
        setEditRecord(null);
        setIsViewMode(false);
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
                assignedVehicleFleetNumber: editRecord?.assignedVehicleFleetNumber,
            };

            if (editRecord) {
                await updateDriver(driver);
                app.message.success(`Updated Driver: ${driver.name}`);
            } else {
                await createDriver(driver);
                app.message.success(`Added Driver: ${driver.name}`);
            }

            await getDriverList();
            closeModal();
        } catch (error) {
            console.error("Error saving driver:", error);
            app.message.error("Failed to save driver");
        } finally {
            setSaving(false);
        }
    };

    const handleAssignVehicle = async () => {
        if (!editRecord || !selectedVehicleId) return;

        setAssigning(true);
        try {
            const selectedVehicle = vehicles?.find((v) => v.id === selectedVehicleId);
            if (!selectedVehicle) {
                app.message.error("Selected vehicle not found.");
                return;
            }

            await updateDriver({
                ...editRecord,
                assignedVehicleId: selectedVehicle.id,
                assignedVehicleFleetNumber: selectedVehicle.fleetNumber,
            });

            await updateVehicle({
                ...selectedVehicle,
                assignedDriverId: editRecord.id,
            });

            app.message.success("Vehicle assigned successfully!");
            await Promise.all([getDriverList(), getVehicleList()]);
            setAssignModalVisible(false);
            setSelectedVehicleId(null);
            closeModal();
        } catch (error) {
            console.error("Error assigning vehicle:", error);
            app.message.error("Failed to assign vehicle");
        } finally {
            setAssigning(false);
        }
    };

    const handleUnassignVehicle = async () => {
        if (!editRecord || !editRecord.assignedVehicleId) return;

        setUnassigning(true);
        try {
            const vehicleToUnassign = vehicles?.find(
                (v) => v.id === editRecord.assignedVehicleId
            );

            await updateDriver({
                ...editRecord,
                assignedVehicleId: undefined,
            });

            if (vehicleToUnassign) {
                await updateVehicle({
                    ...vehicleToUnassign,
                    assignedDriverId: undefined,
                });
            }

            app.message.success("Vehicle unassigned successfully!");
            await Promise.all([getDriverList(), getVehicleList()]);
            closeModal();
        } catch (error) {
            console.error("Error unassigning vehicle:", error);
            app.message.error("Failed to unassign vehicle");
        } finally {
            setUnassigning(false);
        }
    };

    const handleSwitchToEdit = (record: IDriver) => {
        setIsViewMode(false);
    };

    const filteredDrivers =
        drivers?.filter((dri) => dri.municipalityId?.toString() === municipalityId)
            .filter((dri) => {
                const lowerCaseSearch = searchText.toLowerCase();
                return (
                    dri.name?.toLowerCase().includes(lowerCaseSearch) ||
                    dri.surname?.toLowerCase().includes(lowerCaseSearch) ||
                    dri.municipalityName?.toLowerCase().includes(lowerCaseSearch) ||
                    dri.assignedVehicleFleetNumber?.toLowerCase().includes(lowerCaseSearch)
                );
            }) || [];

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
                    <Button
                        type="link"
                        icon={<EyeOutlined />}
                        onClick={() => openViewModal(record)}
                        className={styles.viewButton}
                    >
                        View
                    </Button>
                </Space>
            ),
        },
    ];

    return (
        <div style={{ backgroundColor: '#f5f7fa', minHeight: '100vh', padding: '24px' }}>
            <div className={styles.pageHeader}>
                <Title level={3} className={styles.pageTitle}>
                    Drivers
                </Title>
                <Space className={styles.headerControls}>
                    <Search
                        placeholder="Search drivers"
                        allowClear
                        onSearch={(value) => setSearchText(value)}
                        onChange={(e) => setSearchText(e.target.value)}
                        className={styles.searchBar}
                    />
                    <Button
                        type="primary"
                        icon={<PlusOutlined />}
                        onClick={openCreateModal}
                        className={styles.addButton}
                    >
                        Add Driver
                    </Button>
                </Space>
            </div>

            <Card className={styles.tableCard}>
                <Table
                    columns={columns}
                    dataSource={filteredDrivers}
                    pagination={{ pageSize: 5 }}
                    rowKey="id"
                    loading={!drivers}
                    scroll={{ x: 'max-content' }}
                />
            </Card>

            <DriverModal
                open={modalOpen}
                onClose={closeModal}
                editRecord={editRecord}
                onSave={handleSaveDriver}
                isViewMode={isViewMode}
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
                onSwitchToEdit={handleSwitchToEdit}
            />
        </div>
    );
};

export default DriversPage;