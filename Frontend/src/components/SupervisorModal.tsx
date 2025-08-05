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
    if (editRecord) {
      form.setFieldsValue(editRecord);
    } else {
      form.resetFields();
    }
  }, [open]);

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();

      const creatorId = sessionStorage.getItem("userId") || "";

      const payload: ISupervisor = {
        id: editRecord?.id,
        name: values.name,
        surname: values.surname,
        username: values.username,
        email: values.email,
        password: values.password,
        contactNumber: values.contactNumber,
        department: values.department,
        creatorUserId: editRecord?.creatorUserId ?? creatorId,
      };

      onSave(payload);
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
            <Title level={5}>Supervisor Info</Title>
            <Form.Item name="name" label="Name" rules={[{ required: true }]}>
              <Input disabled={saving} />
            </Form.Item>
            <Form.Item name="surname" label="Surname" rules={[{ required: true }]}>
              <Input disabled={saving} />
            </Form.Item>
            <Form.Item name="email" label="Email" rules={[{ required: true, type: "email" }]}>
              <Input disabled={saving} />
            </Form.Item>
            <Form.Item name="contactNumber" label="Contact Number" rules={[{ required: true }]}>
              <Input disabled={saving} />
            </Form.Item>

            <Form.Item name="department" label="Department" rules={[{ required: true }]}>
              <Select placeholder="Select Department" disabled={saving}>
                <Option value="Maintenance">Maintenance</Option>
                <Option value="Fabrication">Fabrication</Option>
                <Option value="Diverse Workshop Support">Diverse Workshop Support</Option>
              </Select>
            </Form.Item>
          </Col>

          <Col span={12}>
            <Title level={5}>Account Credentials</Title>
            {editRecord ? (
              <p style={{ color: "rgba(0,0,0,0.45)", fontStyle: "italic" }}>
                Account info cannot be updated here.
              </p>
            ) : (
              <>
                <Form.Item name="username" label="Username" rules={[{ required: true }]}>
                  <Input />
                </Form.Item>
                <Form.Item name="password" label="Password" rules={[{ required: true }]}>
                  <Input.Password />
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
