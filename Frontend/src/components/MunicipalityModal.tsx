import { useEffect } from "react";
import { Modal, Form, Input, Button, Typography, Row, Col } from "antd/es";
import { IMunicipality } from "@/providers/municipality-provider/context";
import { useStyles } from "../app/admin/municipalities/style/municipalitiesStyles";

const { Title } = Typography;

interface MunicipalityModalProps {
  open: boolean;
  onClose: () => void;
  editRecord: IMunicipality | null;
  onSave: (values: IMunicipality) => void;
}

const MunicipalityModal: React.FC<MunicipalityModalProps> = ({
  open,
  onClose,
  editRecord,
  onSave,
}) => {
  const { styles } = useStyles();
  const [form] = Form.useForm<IMunicipality>();

  useEffect(() => {
    if (editRecord) {
      form.setFieldsValue(editRecord);
    } else {
      form.resetFields();
    }
  }, [editRecord, open]);

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();

      const creatorId = sessionStorage.getItem("userId") || "";

      const payload: IMunicipality = {
        id: editRecord?.id,
        name: values.name,
        address: values.address,
        contactPerson: values.contactPerson,
        email: values.email,
        contactNumber: values.contactNumber,
        adminUserName: values.adminUserName,
        adminEmail: values.adminEmail,
        adminPassword: values.adminPassword,
        creatorUserId: editRecord?.creatorUserId ?? creatorId,
      };

      onSave(payload);
    } catch (error) {
      console.error("Validation failed:", error);
    }
  };

  return (
    <Modal
      title={editRecord ? "Edit Municipality" : "Add Municipality"}
      open={open}
      onCancel={onClose}
      footer={[
        <Button key="cancel" onClick={onClose}>Cancel</Button>,
        <Button key="submit" type="primary" onClick={handleSubmit}>Submit</Button>,
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
            <Title level={5}>Municipality Info</Title>
            <Form.Item name="name" label="Name" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
            <Form.Item name="address" label="Address" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
            <Form.Item name="contactPerson" label="Contact Person" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
            <Form.Item name="email" label="Email" rules={[{ required: true, type: "email" }]}>
              <Input />
            </Form.Item>
            <Form.Item name="contactNumber" label="Contact Number" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Title level={5}>Admin Account Info</Title>
            <Form.Item name="adminUserName" label="Admin Username" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
            <Form.Item name="adminEmail" label="Admin Email" rules={[{ required: true, type: "email" }]}>
              <Input />
            </Form.Item>
            <Form.Item name="adminPassword" label="Admin Password" rules={[{ required: true, min: 6 }]}>
              <Input.Password />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
};

export default MunicipalityModal;
