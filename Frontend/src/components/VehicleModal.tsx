"use client";

import React, { useEffect } from "react";
import {
    Modal,
    Form,
    Input,
    Button,
    Row,
    Col,
    Typography,
    DatePicker,
    Select,
    message,
} from "antd";
import { Dayjs } from "dayjs";
import dayjs from "dayjs";
import { IVehicle } from "@/providers/vehicle-provider/context";
import { IDriver } from "@/providers/driver-provider/context";
import { useStyles } from "@/app/admin/municipalities/style/municipalitiesStyles";

const { Title } = Typography;
const { Option } = Select;

interface VehicleFormValues {
    fleetNumber?: string;
    registrationNumber?: string;
    make?: string;
    model?: string;
    licenseExpiry?: Dayjs | null;
    assignedDriverName?: string;
}

interface VehicleModalProps {
    open: boolean;
    onClose: () => void;
    editRecord: IVehicle | null;
    onSave: (values: IVehicle) => void;

    isViewMode?: boolean;
    drivers?: IDriver[];
    selectedDriverId?: string | null;
    setSelectedDriverId?: (id: string | null) => void;
    onAssign?: () => void;
    assigning?: boolean;
    onUnassign?: () => void;
    unassigning?: boolean;
    showAssignModal?: boolean;
    setShowAssignModal?: (visible: boolean) => void;
    saving?: boolean;
}

const VehicleModal: React.FC<VehicleModalProps> = ({
    open,
    onClose,
    editRecord,
    onSave,
    isViewMode = false,
    drivers = [],
    selectedDriverId,
    setSelectedDriverId,
    onAssign,
    assigning = false,
    onUnassign,
    unassigning = false,
    showAssignModal = false,
    setShowAssignModal,
    saving = false,
}) => {
    const { styles } = useStyles();
    const [form] = Form.useForm<VehicleFormValues>();

    useEffect(() => {
        if (editRecord) {
            form.setFieldsValue({
                fleetNumber: editRecord.fleetNumber,
                registrationNumber: editRecord.registrationNumber,
                make: editRecord.make,
                model: editRecord.model,
                licenseExpiry: editRecord.licenseExpiry ? dayjs(editRecord.licenseExpiry) : null,
                assignedDriverName: editRecord.assignedDriverName || "",
            });
        } else {
            form.resetFields();
        }
    }, [editRecord, open, form]);

    const handleSubmit = async () => {
        try {
            const values = await form.validateFields();
            const userId = sessionStorage.getItem("userId") || "";
            const municipalityId = sessionStorage.getItem("municipalityId") || "";
            const municipalityName = sessionStorage.getItem("municipalityName") || "";

            const payload: IVehicle = {
                id: editRecord?.id,
                fleetNumber: values.fleetNumber,
                registrationNumber: values.registrationNumber,
                make: values.make,
                model: values.model,
                licenseExpiry: values.licenseExpiry
                    ? values.licenseExpiry.toISOString()
                    : undefined,
                assignedDriverId: editRecord?.assignedDriverId,
                assignedDriverName: editRecord?.assignedDriverName,
                municipalityId: editRecord?.municipalityId ?? municipalityId,
                municipalityName: editRecord?.municipalityName ?? municipalityName,
                creatorUserId: editRecord?.creatorUserId ?? userId,
            };

            onSave(payload);
        } catch (error) {
            console.error("Validation failed:", error);
            message.error("Please complete all required fields correctly.");
        }
    };

    return (
        <>
            <Modal
                title={
                    isViewMode
                        ? `Vehicle: ${editRecord?.fleetNumber || ""}`
                        : editRecord
                            ? "Edit Vehicle"
                            : "Add Vehicle"
                }
                open={open && !showAssignModal}
                onCancel={onClose}
                footer={
                    isViewMode
                        ? [
                            <Button
                                key="edit"
                                onClick={() => {
                                    onSave(editRecord as IVehicle);
                                }}
                            >
                                Edit
                            </Button>,
                            editRecord?.assignedDriverId && (
                                <Button key="unassign" danger onClick={onUnassign} loading={unassigning}>
                                    Unassign Driver
                                </Button>
                            ),
                            <Button
                                key="assign"
                                type="primary"
                                onClick={() => setShowAssignModal?.(true)}
                            >
                                {editRecord?.assignedDriverId ? "Reassign Driver" : "Assign Driver"}
                            </Button>,
                        ]
                        : [
                            <Button key="cancel" onClick={onClose} disabled={saving}>
                                Cancel
                            </Button>,
                            <Button
                                key="submit"
                                type="primary"
                                onClick={handleSubmit}
                                loading={saving}
                            >
                                Submit
                            </Button>,
                        ]
                }
                width={900}
            >
                <Form
                    form={form}
                    layout="vertical"
                    className={styles.modalForm}
                    autoComplete="off"
                >
                    <Row gutter={32}>
                        <Col span={12}>
                            <Title level={5}>Vehicle Info</Title>
                            <Form.Item
                                name="fleetNumber"
                                label="Fleet Number"
                                rules={[{ required: true, message: "Please enter fleet number" }]}
                            >
                                <Input disabled={saving || isViewMode} />
                            </Form.Item>
                            <Form.Item
                                name="registrationNumber"
                                label="Registration Number"
                                rules={[
                                    { required: true, message: "Please enter registration number" },
                                ]}
                            >
                                <Input disabled={saving || isViewMode} />
                            </Form.Item>
                            <Form.Item
                                name="licenseExpiry"
                                label="License Expiry"
                                rules={[{ required: true, message: "Please select expiry date" }]}
                            >
                                <DatePicker
                                    style={{ width: "100%" }}
                                    disabled={saving || isViewMode}
                                />
                            </Form.Item>
                            <Form.Item name="assignedDriverName" label="Assigned Driver">
                                <Input disabled />
                            </Form.Item>
                        </Col>

                        <Col span={12}>
                            <Title level={5}>Make & Model</Title>
                            <Form.Item
                                name="make"
                                label="Make"
                                rules={[{ required: true, message: "Please enter make" }]}
                            >
                                <Input disabled={saving || isViewMode} />
                            </Form.Item>
                            <Form.Item
                                name="model"
                                label="Model"
                                rules={[{ required: true, message: "Please enter model" }]}
                            >
                                <Input disabled={saving || isViewMode} />
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
            </Modal>

            <Modal
                title={`Assign Driver to ${editRecord?.fleetNumber || ""}`}
                open={showAssignModal}
                onCancel={() => setShowAssignModal?.(false)}
                footer={[
                    <Button key="cancel" onClick={() => setShowAssignModal?.(false)}>
                        Cancel
                    </Button>,
                    <Button
                        key="assign"
                        type="primary"
                        onClick={onAssign}
                        disabled={!selectedDriverId}
                        loading={assigning}
                    >
                        Assign
                    </Button>,
                ]}
            >
                {drivers.length === 0 ? (
                    <p>No unassigned drivers available</p>
                ) : (
                    <Form layout="vertical">
                        <Form.Item label="Select Driver">
                            <Select
                                value={selectedDriverId || undefined}
                                onChange={(value) => setSelectedDriverId?.(value)}
                                placeholder="Select a driver"
                            >
                                {drivers.map((driver) => (
                                    <Option key={driver.id} value={driver.id}>
                                        {driver.name} {driver.surname}
                                    </Option>
                                ))}
                            </Select>
                        </Form.Item>
                    </Form>
                )}
            </Modal>
        </>
    );
};

export default VehicleModal;
