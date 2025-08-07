import { useEffect } from "react";
import { Modal, Form, Input, Button, Typography, Row, Col, Select } from "antd/es";
import { ISupervisor } from "@/providers/supervisor-provider/context";
import { useStyles } from "../app/admin/municipalities/style/municipalitiesStyles";

const { Title } = Typography;
const { Option } = Select;

interface SupervisorModalProps {
    open: boolean;
    onClose: () => void;
    editRecord: ISupervisor | null;
    onSave: (values: ISupervisor) => void;
    saving?: boolean;
}

const SupervisorModal: React.FC<SupervisorModalProps> = ({
    open,
    onClose,
    editRecord,
    onSave,
    saving = false,
}) => {
    const { styles } = useStyles();
    const [form] = Form.useForm<ISupervisor>();

    useEffect(() => {
        if (open) {
            if (editRecord) {
                form.setFieldsValue(editRecord);
            } else {
                form.resetFields();
            }
        }
    }, [open, editRecord, form]);

    const handleSubmit = async () => {
        try {
            const values = await form.validateFields();
            onSave(values);
        } catch (error) {
            console.error("Validation failed:", error);
        }
    };

    return (
        <Modal
            title={editRecord ? "Edit Supervisor" : "Add Supervisor"}
            open={open}
            onCancel={onClose}
            footer={[
                <Button key="cancel" onClick={onClose} disabled={saving}>
                    Cancel
                </Button>,
                <Button key="submit" type="primary" onClick={handleSubmit} loading={saving}>
                    Submit
                </Button>,
            ]}
            width={700} // Reduced width as there's only one column now
        >
            <Form
                form={form}
                layout="vertical"
                className={styles.modalForm}
                autoComplete="off"
            >
                <Row gutter={32}>
                    <Col span={24}> {/* Changed span to 24 for full width */}
                        <Title level={5}>Supervisor Information</Title>
                        <Form.Item name="name" label="Name" rules={[{ required: true, message: "Name is required" }]}>
                            <Input disabled={saving} placeholder="Enter name" />
                        </Form.Item>
                        <Form.Item name="surname" label="Surname" rules={[{ required: true, message: "Surname is required" }]}>
                            <Input disabled={saving} placeholder="Enter surname" />
                        </Form.Item>
                        <Form.Item name="email" label="Email" rules={[{ required: true, type: "email", message: "Enter a valid email" }]}>
                            <Input disabled={saving} placeholder="Enter email" />
                        </Form.Item>
                        <Form.Item name="contactNumber" label="Contact Number" rules={[{ required: true, message: "Contact number is required" }]}>
                            <Input disabled={saving} placeholder="Enter contact number" />
                        </Form.Item>
                        <Form.Item name="department" label="Department" rules={[{ required: true, message: "Department is required" }]}>
                            <Select placeholder="Select Department" disabled={saving}>
                                <Option value="Maintenance">Maintenance</Option>
                                <Option value="Fabrication">Fabrication</Option>
                                <Option value="Diverse Workshop Support">Diverse Workshop Support</Option>
                            </Select>
                        </Form.Item>

                        {!editRecord && (
                            <>
                                <Form.Item name="username" label="Username" rules={[{ required: true, message: "Username is required" }]}>
                                    <Input disabled={saving} placeholder="Enter username" />
                                </Form.Item>
                                <Form.Item name="password" label="Password" rules={[{ required: true, message: "Password is required" }]}>
                                    <Input.Password disabled={saving} placeholder="Enter password" />
                                </Form.Item>
                            </>
                        )}
                    </Col>
                </Row>
            </Form>
        </Modal>
    );
};

export default SupervisorModal;