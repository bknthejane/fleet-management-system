import { useEffect, useState } from "react";
import { Modal, Form, Input, Button, Typography, Row, Col, Select } from "antd/es";
import { IIncident } from "@/providers/incident-provider/context";
import { useStyles } from "../app/admin/municipalities/style/municipalitiesStyles";

const { Title } = Typography;
const { Option } = Select;

interface IncidentModalProps {
  open: boolean;
  onClose: () => void;
  editRecord: IIncident | null;
  onSave: (values: IIncident) => void;
  saving?: boolean;
}

// Mapping incidentType → department
const incidentDepartmentMap: Record<string, string> = {
  "Engine Failure": "Maintenance",
  "Routine Service": "Maintenance",
  "Flat Tire": "Maintenance",
  "Tire Replacement": "Maintenance",
  "Wheel Alignment": "Maintenance",
  "Body Damage": "Fabrication",
  "Electrical Issue": "Diverse Workshop Support",
};

const IncidentModal: React.FC<IncidentModalProps> = ({
  open,
  onClose,
  editRecord,
  onSave,
  saving = false,
}) => {
  const { styles } = useStyles();
  const [form] = Form.useForm<IIncident>();

  useEffect(() => {
    if (editRecord) {
      form.setFieldsValue(editRecord);
    } else {
      form.resetFields();
    }
  }, [open]);

  const handleIncidentTypeChange = (value: string) => {
    const department = incidentDepartmentMap[value] || "";
    form.setFieldsValue({ department });
  };

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      const creatorId = sessionStorage.getItem("userId") || "";

      const payload: IIncident = {
        id: editRecord?.id,
        description: values.description,
        incidentType: values.incidentType,
        status: "Submitted",
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
      title={editRecord ? "Edit Incident" : "Add Incident"}
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
            <Title level={5}>Incident Info</Title>

            <Form.Item name="incidentType" label="Incident Type" rules={[{ required: true }]}>
              <Select
                placeholder="Select Incident Type"
                disabled={saving}
                onChange={handleIncidentTypeChange}
              >
                {Object.keys(incidentDepartmentMap).map((type) => (
                  <Option key={type} value={type}>
                    {type}
                  </Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item name="department" label="Department" rules={[{ required: true }]}>
              <Input disabled value={form.getFieldValue("department")} />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Title level={5}>Description</Title>
            <Form.Item name="description" label="Description" rules={[{ required: true }]}>
              <Input.TextArea rows={6} disabled={saving} placeholder="Enter incident details..." />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
};

export default IncidentModal;
