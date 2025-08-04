import { useEffect } from "react";
import { Modal, Form, Input, Button, Typography, Row, Col, Select, DatePicker } from "antd/es";
import dayjs, { Dayjs } from "dayjs";
import { IVehicle } from "@/providers/vehicle-provider/context";
import { useStyles } from "../app/admin/municipalities/style/municipalitiesStyles";

const { Title } = Typography;

interface VehicleFormValues {
  id?: string;
  fleetNumber?: string;
  registrationNumber?: string;
  make?: string;
  model?: string;
  licenseExpiry?: Dayjs | null;
  municipalityId?: string;
  municipalityName?: string;
  assignedDriverId?: string;
}

interface VehicleModalProps {
  open: boolean;
  onClose: () => void;
  editRecord: IVehicle | null;
  onSave: (values: IVehicle) => void;
}

const VehicleModal: React.FC<VehicleModalProps> = ({
  open,
  onClose,
  editRecord,
  onSave,
}) => {
  const { styles } = useStyles();
  const [form] = Form.useForm<VehicleFormValues>();

  useEffect(() => {
    if (editRecord) {
      form.setFieldsValue({
        ...editRecord,
        licenseExpiry: editRecord.licenseExpiry
          ? dayjs(editRecord.licenseExpiry)
          : null,
      });
    } else {
      form.resetFields();
    }
  }, [editRecord, open]);

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      const creatorId = sessionStorage.getItem("userId") || "";

      // ✅ Convert form values to backend payload
      const payload: IVehicle = {
        id: editRecord?.id,
        fleetNumber: values.fleetNumber,
        registrationNumber: values.registrationNumber,
        make: values.make,
        model: values.model,
        licenseExpiry: values.licenseExpiry
          ? values.licenseExpiry.toISOString()
          : undefined,
        assignedDriverId: values.assignedDriverId,
        municipalityName: values.municipalityName,
        creatorUserId: editRecord?.creatorUserId ?? creatorId,
      };

      onSave(payload);
    } catch (error) {
      console.error("Validation failed:", error);
    }
  };

  return (
    <Modal
      title={editRecord ? "Edit Vehicle" : "Add Vehicle"}
      open={open}
      onCancel={onClose}
      footer={[
        <Button key="cancel" onClick={onClose}>
          Cancel
        </Button>,
        <Button key="submit" type="primary" onClick={handleSubmit}>
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
            <Title level={5}>Vehicle Info</Title>
            <Form.Item
              name="fleetNumber"
              label="Fleet Number"
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="registrationNumber"
              label="Registration Number"
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>
            <Form.Item name="make" label="Make" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
            <Form.Item name="model" label="Model" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
            <Form.Item
              name="licenseExpiry"
              label="License Expiry"
              rules={[{ required: true }]}
            >
              <DatePicker style={{ width: "100%" }} />
            </Form.Item>
          </Col>

          {editRecord && (
            <Col span={12}>
              <Title level={5}>Assignment</Title>
              <Form.Item
                name="assignedDriverId"
                label="Assigned Driver"
                rules={[{ required: true }]}
              >
                <Input placeholder="Driver ID" />
              </Form.Item>
            </Col>
          )}
        </Row>
      </Form>
    </Modal>
  );
};

export default VehicleModal;
