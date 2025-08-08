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
    Space
} from "antd";
import { IMechanic } from "@/providers/mechanic-provider/context";
import { IJobCard } from "@/providers/jobCard-provider/context";
import { useStyles } from "@/app/admin/municipalities/style/municipalitiesStyles";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";

const { Title } = Typography;
const { Option } = Select;

interface MechanicFormValues {
    name?: string;
    surname?: string;
    userName?: string;
    email?: string;
    password?: string;
}

interface MechanicModalProps {
    open: boolean;
    onClose: () => void;
    editRecord: IMechanic | null;
    onSave: (values: IMechanic) => void;

    isViewMode?: boolean;
    jobCards?: IJobCard[];
    selectedJobCardId?: string | null;
    setSelectedJobCardId?: (id: string | null) => void;
    onAssign?: () => void;
    assigning?: boolean;
    onUnassign?: () => void;
    unassigning?: boolean;
    showAssignModal?: boolean;
    setShowAssignModal?: (visible: boolean) => void;
    saving?: boolean;
    onSwitchToEdit: (record: IMechanic) => void;
}

const MechanicModal: React.FC<MechanicModalProps> = ({
    open,
    onClose,
    editRecord,
    onSave,
    isViewMode = false,
    jobCards = [],
    selectedJobCardId,
    setSelectedJobCardId,
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
    const [form] = Form.useForm<MechanicFormValues>();

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
            const supervisorId = sessionStorage.getItem("supervisorId") || "";

            const payload: IMechanic = {
                id: editRecord?.id,
                name: values.name,
                surname: values.surname,
                username: values.userName,
                email: values.email,
                password: values.password,
                assignedJobCardId: editRecord?.assignedJobCardId,
                assignedJobCardNumber: editRecord?.assignedJobCardNumber,
                municipalityId: editRecord?.municipalityId ?? municipalityId,
                municipalityName: editRecord?.municipalityName ?? municipalityName,
                supervisorId: editRecord?.supervisorId ?? supervisorId,
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
                        ? `Mechanic: ${editRecord?.name || ""} ${editRecord?.surname || ""}`
                        : editRecord
                            ? "Edit Mechanic"
                            : "Add Mechanic"
                }
                open={open && !showAssignModal}
                onCancel={onClose}
                footer={
                    isViewMode
                        ? [
                            <Space key="view-actions">
                                <Button
                                    key="edit"
                                    icon={<EditOutlined />}
                                    onClick={() => onSwitchToEdit(editRecord as IMechanic)}
                                >
                                    Edit
                                </Button>
                                {editRecord?.assignedJobCardId && (
                                    <Button
                                        key="unassign"
                                        danger
                                        onClick={onUnassign}
                                        loading={unassigning}
                                    >
                                        Unassign Job Card
                                    </Button>
                                )}
                                <Button
                                    key="assign"
                                    type="primary"
                                    onClick={() => setShowAssignModal?.(true)}
                                >
                                    {editRecord?.assignedJobCardId ? "Reassign Job Card" : "Assign Job Card"}
                                </Button>
                            </Space>
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
                width={700}
            >
                <Form
                    form={form}
                    layout="vertical"
                    className={styles.modalForm}
                    autoComplete="off"
                >
                    <Row gutter={32}>
                        <Col span={24}>
                            <Title level={5}>Driver Info</Title>
                            <Form.Item
                                name="name"
                                label="Name"
                                rules={[{ required: true, message: "Please enter name" }]}
                            >
                                <Input disabled={saving || isViewMode} />
                            </Form.Item>
                            <Form.Item
                                name="surname"
                                label="Surname"
                                rules={[{ required: true, message: "Please enter surname" }]}
                            >
                                <Input disabled={saving || isViewMode} />
                            </Form.Item>

                            {editRecord?.assignedJobCardNumber && (
                                <Form.Item label="Assigned JobCard">
                                    <Input
                                        disabled
                                        value={editRecord.assignedJobCardNumber}
                                    />
                                </Form.Item>
                            )}
                        </Col>
                        {!editRecord && (
                            <Col span={24}>
                                <Title level={5}>Account Credentials</Title>
                                <Form.Item
                                    name="userName"
                                    label="Username"
                                    rules={[{ required: true, message: "Please enter username" }]}
                                >
                                    <Input disabled={saving || isViewMode} />
                                </Form.Item>
                                <Form.Item
                                    name="email"
                                    label="Email"
                                    rules={[
                                        { required: true, message: "Please enter email" },
                                        { type: "email", message: "Please enter a valid email" },
                                    ]}
                                >
                                    <Input disabled={saving || isViewMode} />
                                </Form.Item>
                                <Form.Item
                                    name="password"
                                    label="Password"
                                    rules={[{ required: true, message: "Please enter password" }]}
                                >
                                    <Input.Password disabled={saving || isViewMode} />
                                </Form.Item>
                            </Col>
                        )}
                    </Row>
                </Form>
            </Modal>

            <Modal
                title={`Assign Job Card to ${editRecord?.name || ""} ${editRecord?.surname || ""}`}
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
                        disabled={!selectedJobCardId}
                        loading={assigning}
                    >
                        Assign
                    </Button>,
                ]}
            >
                {jobCards.length === 0 ? (
                    <p>No unassigned vehicles available</p>
                ) : (
                    <Form layout="vertical">
                        <Form.Item label="Select a job card">
                            <Select
                                value={selectedJobCardId || undefined}
                                onChange={(value) => setSelectedJobCardId?.(value)}
                            >
                                {jobCards.map((jobCard) => (
                                    <Option key={jobCard.id} value={jobCard.id}>
                                        {jobCard.jobCardNumber}
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

export default MechanicModal;