"use client";

import React, { useEffect, useState } from "react";
import {
    Table,
    Button,
    Typography,
    Card,
    Space,
    Avatar,
    message,
    Input
} from "antd";
import { CarOutlined, EyeOutlined, PlusOutlined } from "@ant-design/icons";
import { useStyles } from "./style/vehiclesStyle";
import { IVehicle } from "@/providers/vehicle-provider/context";
import { IDriver } from "@/providers/driver-provider/context";
import { useVehicleState, useVehicleActions } from "@/providers/vehicle-provider";
import { useDriverState, useDriverActions } from "@/providers/driver-provider";
import { ColumnsType } from "antd/es/table";
import VehicleModal from "@/components/VehicleModal";

const { Title } = Typography;
const { Search } = Input;

const VehiclesPage: React.FC = () => {
    const { styles } = useStyles();

    const { vehicles } = useVehicleState();
    const { drivers } = useDriverState();
    const { getVehicleList, createVehicle, updateVehicle, deleteVehicle } = useVehicleActions();
    const { getDriverList, updateDriver } = useDriverActions();

    const [vehicleModalVisible, setVehicleModalVisible] = useState(false);
    const [viewModalVisible, setViewModalVisible] = useState(false);
    const [assignModalVisible, setAssignModalVisible] = useState(false);

    const [editRecord, setEditRecord] = useState<IVehicle | null>(null);
    const [selectedVehicle, setSelectedVehicle] = useState<IVehicle | null>(null);
    const [selectedDriverId, setSelectedDriverId] = useState<string | null>(null);
    const [searchText, setSearchText] = useState("");

    const [saving, setSaving] = useState(false);
    const [assigning, setAssigning] = useState(false);
    const [unassigning, setUnassigning] = useState(false);
    const [deleting, setDeleting] = useState(false);

    const [municipalityId, setMunicipalityId] = useState<string>("");

    useEffect(() => {
        const storedMunicipalityId = sessionStorage.getItem("municipalityId") || "";
        setMunicipalityId(storedMunicipalityId);

        if (storedMunicipalityId) {
            getVehicleList();
            getDriverList();
        }
    }, []);

    const openVehicleModal = (record?: IVehicle) => {
        setEditRecord(record || null);
        setVehicleModalVisible(true);
    };

    const openViewModal = (vehicle: IVehicle) => {
        setSelectedVehicle(vehicle);
        setSelectedDriverId(vehicle.assignedDriverId || null);
        setViewModalVisible(true);
    };

    const closeAllModals = () => {
        setVehicleModalVisible(false);
        setViewModalVisible(false);
        setAssignModalVisible(false);
        setEditRecord(null);
        setSelectedVehicle(null);
    };

    const handleSaveVehicle = async (values: IVehicle) => {
        setSaving(true);
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
                assignedDriverId: editRecord?.assignedDriverId,
            };

            if (editRecord) {
                await updateVehicle(vehicle);
                message.success(`Updated Vehicle: ${vehicle.fleetNumber}`);
            } else {
                await createVehicle(vehicle);
                message.success(`Added Vehicle: ${vehicle.fleetNumber}`);
            }

            await getVehicleList();
            closeAllModals();
        } catch (error) {
            console.error("Error saving vehicle:", error);
            message.error("Failed to save vehicle");
        } finally {
            setSaving(false);
        }
    };

    const handleDeleteVehicle = (id?: string) => {
        if (!id) return;

        import("antd").then(({ Modal }) => {
            Modal.confirm({
                title: "Are you sure you want to delete this vehicle?",
                okText: "Delete",
                okType: "danger",
                onOk: async () => {
                    setDeleting(true);
                    try {
                        await deleteVehicle(id);
                        await getVehicleList();
                        message.success("Vehicle deleted successfully");
                    } catch (error) {
                        console.error("Delete error:", error);
                        message.error("Failed to delete vehicle");
                    } finally {
                        setDeleting(false);
                    }
                },
            });
        });
    };

    const handleAssignDriver = async () => {
        if (!selectedVehicle || !selectedDriverId) return;

        setAssigning(true);
        try {
            await updateVehicle({
                ...selectedVehicle,
                assignedDriverId: selectedDriverId,
            });

            const driver = drivers?.find((d) => d.id === selectedDriverId);
            if (driver) {
                await updateDriver({
                    ...driver,
                    assignedVehicleId: selectedVehicle.id,
                });
            }

            message.success("Driver assigned successfully!");
            await Promise.all([getVehicleList(), getDriverList()]);
            setAssignModalVisible(false);
            setSelectedDriverId(null);
            setViewModalVisible(false);
        } catch (error) {
            console.error("Error assigning driver:", error);
            message.error("Failed to assign driver");
        } finally {
            setAssigning(false);
        }
    };

    const handleUnassignDriver = async () => {
        if (!selectedVehicle || !selectedVehicle.assignedDriverId) return;

        setUnassigning(true);
        try {
            const driver = drivers?.find((d) => d.id === selectedVehicle.assignedDriverId);
            await updateVehicle({
                ...selectedVehicle,
                assignedDriverId: undefined,
            });

            if (driver) {
                await updateDriver({
                    ...driver,
                    assignedVehicleId: undefined,
                });
            }

            message.success("Driver unassigned successfully!");
            await Promise.all([getVehicleList(), getDriverList()]);
            setViewModalVisible(false);
        } catch (error) {
            console.error("Error unassigning driver:", error);
            message.error("Failed to unassign driver");
        } finally {
            setUnassigning(false);
        }
    };

    const filteredVehicles =
        vehicles?.filter((veh) => veh.municipalityId?.toString() === municipalityId)
            .filter((veh) => {
                const lowerCaseSearch = searchText.toLowerCase();
                return (
                    veh.fleetNumber?.toLowerCase().includes(lowerCaseSearch) ||
                    veh.registrationNumber?.toLowerCase().includes(lowerCaseSearch) ||
                    veh.model?.toLowerCase().includes(lowerCaseSearch) ||
                    veh.make?.toLowerCase().includes(lowerCaseSearch) ||
                    veh.licenseExpiry?.toLowerCase().includes(lowerCaseSearch) ||
                    veh.assignedDriverName?.toLowerCase().includes(lowerCaseSearch)
                );
            }) || [];

    const unassignedDrivers: IDriver[] =
        drivers?.filter(
            (d) => !d.assignedVehicleId && d.municipalityId?.toString() === municipalityId
        ) || [];

    const columns: ColumnsType<IVehicle> = [
        {
            title: "Fleet Number",
            dataIndex: "fleetNumber",
            key: "fleetNumber",
            render: (_, record) => (
                <Space>
                    <Avatar icon={<CarOutlined />} />
                    {record.fleetNumber}
                </Space>
            ),
        },
        { title: "Registration Number", key: "registrationNumber", render: (_, r) => r.registrationNumber || "-" },
        { title: "Model", key: "model", render: (_, r) => r.model || "-" },
        { title: "Make", key: "make", render: (_, r) => r.make || "-" },
        { title: "License Expiry", key: "licenseExpiry", render: (_, r) => r.licenseExpiry || "-" },
        { title: "Assigned Driver", key: "assignedDriverName", render: (_, r) => r.assignedDriverName || "-" },
        { title: "Municipality", key: "municipalityName", render: (_, r) => r.municipalityName || "-" },
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
                    Vehicles
                </Title>
                <Space className={styles.headerControls}>
                    <Search
                        placeholder="Search vehicles"
                        allowClear
                        onSearch={(value) => setSearchText(value)}
                        onChange={(e) => setSearchText(e.target.value)}
                        className={styles.searchBar}
                    />
                    <Button
                        type="primary"
                        icon={<PlusOutlined />}
                        onClick={() => openVehicleModal()}
                        className={styles.addButton}
                    >
                        Add Vehicle
                    </Button>
                </Space>
            </div>

            <Card className={styles.tableCard}>
                <Table
                    columns={columns}
                    dataSource={filteredVehicles}
                    rowKey="id"
                    pagination={{ pageSize: 5 }}
                    bordered
                    loading={!vehicles}
                    scroll={{ x: 'max-content' }}
                />
            </Card>

            <VehicleModal
                open={vehicleModalVisible || viewModalVisible || assignModalVisible}
                onClose={closeAllModals}
                editRecord={editRecord || selectedVehicle}
                onSave={(vehicle) => {
                    if (viewModalVisible) {
                        setEditRecord(vehicle);
                        setVehicleModalVisible(true);
                        setViewModalVisible(false);
                    } else {
                        handleSaveVehicle(vehicle);
                    }
                }}
                isViewMode={viewModalVisible}
                drivers={unassignedDrivers}
                selectedDriverId={selectedDriverId}
                setSelectedDriverId={setSelectedDriverId}
                onAssign={handleAssignDriver}
                assigning={assigning}
                onUnassign={handleUnassignDriver}
                unassigning={unassigning}
                showAssignModal={assignModalVisible}
                setShowAssignModal={setAssignModalVisible}
                saving={saving}
            />
        </div>
    );
};

export default VehiclesPage;