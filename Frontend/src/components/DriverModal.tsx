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
    Select,
    message,
} from "antd";
import { IDriver } from "@/providers/driver-provider/context";
import { IVehicle } from "@/providers/vehicle-provider/context";
import { useStyles } from "@/app/admin/municipalities/style/municipalitiesStyles";

const { Title } = Typography;
const { Option } = Select;

interface DriverFormValues {
    name?: string;
    surname?: string;
    userName?: string;
    email?: string;
    password?: string;
}

interface DriverModalProps {
    open: boolean;
    onClose: () => void;
    editRecord: IDriver | null;
    onSave: (values: IDriver) => void;
    isViewMode?: boolean;
    vehicles?: IVehicle[];
    selectedVehicleId?: string | null;
    setSelectedVehicleId?: (id: string | null) => void;
    onAssign?: () => void;
    assigning?: boolean;
    onUnassign?: () => void;
    unassigning?: boolean;
    showAssignModal?: boolean;
    setShowAssignModal?: (visible: boolean) => void;
    saving?: boolean;
    onSwitchToEdit: (record: IDriver) => void;
}

const DriverModal: React.FC<DriverModalProps> = ({
    open,
    onClose,
    editRecord,
    onSave,
    isViewMode = false,
    vehicles = [],
    selectedVehicleId,
    setSelectedVehicleId,
    onAssign,
    assigning = false,
    onUnassign,
    unassigning = false,
    showAssignModal = false,
    setShowAssignModal,
    saving = false,
    onSwitchToEdit,
}) => {
    const { styles } = useStyles();
    const [form] = Form.useForm<DriverFormValues>();

    useEffect(() => {
        if (editRecord) {
            form.setFieldsValue({
                name: editRecord.name,
                surname: editRecord.surname,
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

            const payload: IDriver = {
                id: editRecord?.id,
                name: values.name,
                surname: values.surname,
                username: values.userName,
                email: values.email,
                password: values.password,
                assignedVehicleId: editRecord?.assignedVehicleId,
                assignedVehicleFleetNumber: editRecord?.assignedVehicleFleetNumber,
                municipalityId: editRecord?.municipalityId ?? municipalityId,
                municipalityName: editRecord?.municipalityName ?? municipalityName,
                creatorUserId: editRecord?.creatorUserId ?? userId,
                IsActive: true,
            };

            onSave(payload);
        } catch (error) {
            console.error("Validation failed:", error);
            message.error("Please complete all required fields correctly.");
        }
    };

    // The modal width is set to a larger value for better use of space
    const getModalWidth = () => {
        return isViewMode ? 400 : 900;
    };

    return (
        <>
            <Modal
                title={
                    isViewMode
                        ? `Driver: ${editRecord?.name || ""} ${editRecord?.surname || ""}`
                        : editRecord
                            ? "Edit Driver"
                            : "Add Driver"
                }
                open={open && !showAssignModal}
                onCancel={onClose}
                footer={
                    isViewMode
                        ? [
                              <Button
                                  key="edit"
                                  onClick={() => onSwitchToEdit(editRecord as IDriver)}
                              >
                                  Edit
                              </Button>,
                              editRecord?.assignedVehicleId && (
                                  <Button
                                      key="unassign"
                                      danger
                                      onClick={onUnassign}
                                      loading={unassigning}
                                  >
                                      Unassign Vehicle
                                  </Button>
                              ),
                              <Button
                                  key="assign"
                                  type="primary"
                                  onClick={() => setShowAssignModal?.(true)}
                              >
                                  {editRecord?.assignedVehicleId ? "Reassign Vehicle" : "Assign Vehicle"}
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
                width={getModalWidth()}
            >
                {isViewMode ? (
                    <div>
                        <p>
                            <strong>Name:</strong> {editRecord?.name}
                        </p>
                        <p>
                            <strong>Surname:</strong> {editRecord?.surname}
                        </p>
                        <p>
                            <strong>Municipality:</strong> {editRecord?.municipalityName}
                        </p>
                        <p>
                            <strong>Assigned Vehicle:</strong> {editRecord?.assignedVehicleFleetNumber || "None"}
                        </p>
                    </div>
                ) : (
                    <Form
                        form={form}
                        layout="vertical"
                        className={styles.modalForm}
                        autoComplete="off"
                    >
                        {/* Use Ant Design's Row and Col for a responsive grid layout */}
                        <Title level={5}>Driver Info</Title>
                        <Row gutter={16}> {/* Gutter provides space between the columns */}
                            <Col span={12}>
                                <Form.Item
                                    name="name"
                                    label="Name"
                                    rules={[{ required: true, message: "Please enter name" }]}
                                >
                                    <Input disabled={saving} />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item
                                    name="surname"
                                    label="Surname"
                                    rules={[{ required: true, message: "Please enter surname" }]}
                                >
                                    <Input disabled={saving} />
                                </Form.Item>
                            </Col>
                        </Row>

                        {editRecord?.assignedVehicleFleetNumber && (
                            <Form.Item label="Assigned Vehicle">
                                <Input disabled value={editRecord.assignedVehicleFleetNumber} />
                            </Form.Item>
                        )}

                        {!editRecord && (
                            <>
                                <Title level={5}>Account Credentials</Title>
                                <Row gutter={16}>
                                    <Col span={12}>
                                        <Form.Item
                                            name="userName"
                                            label="Username"
                                            rules={[{ required: true, message: "Please enter username" }]}
                                        >
                                            <Input disabled={saving} />
                                        </Form.Item>
                                    </Col>
                                    <Col span={12}>
                                        <Form.Item
                                            name="email"
                                            label="Email"
                                            rules={[
                                                { required: true, message: "Please enter email" },
                                                { type: "email", message: "Please enter a valid email" },
                                            ]}
                                        >
                                            <Input disabled={saving} />
                                        </Form.Item>
                                    </Col>
                                </Row>
                                <Form.Item
                                    name="password"
                                    label="Password"
                                    rules={[{ required: true, message: "Please enter password" }]}
                                >
                                    <Input.Password disabled={saving} />
                                </Form.Item>
                            </>
                        )}
                    </Form>
                )}
            </Modal>
            {/* The assign vehicle modal remains unchanged */}
            <Modal
                title={`Assign Vehicle to ${editRecord?.name || ""} ${editRecord?.surname || ""}`}
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
                        disabled={!selectedVehicleId}
                        loading={assigning}
                    >
                        Assign
                    </Button>,
                ]}
                width={400}
            >
                {vehicles.length === 0 ? (
                    <p>No unassigned vehicles available</p>
                ) : (
                    <Form layout="vertical">
                        <Form.Item label="Select a vehicle">
                            <Select
                                value={selectedVehicleId || undefined}
                                onChange={(value) => setSelectedVehicleId?.(value)}
                            >
                                {vehicles.map((vehicle) => (
                                    <Option key={vehicle.id} value={vehicle.id}>
                                        {vehicle.fleetNumber}
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

export default DriverModal;