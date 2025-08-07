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
import { IJobCard } from "@/providers/jobCard-provider/context";
import { useStyles } from "@/app/admin/municipalities/style/municipalitiesStyles";

const { Title } = Typography;
const { Option } = Select;

interface JobCardModalProps {
  open: boolean;
  onClose: () => void;
  editRecord: IJobCard | null;
  onSave: (values: IJobCard) => void;
  isViewMode?: boolean;
  saving: boolean;
}

const MechanicJobCardModal: React.FC<JobCardModalProps> = ({
  open,
  onClose,
  editRecord,
  onSave,
  isViewMode = false,
  saving,
}) => {
  const { styles } = useStyles();
  const [form] = Form.useForm<IJobCard>();

  useEffect(() => {
    if (editRecord) {
      form.setFieldsValue(editRecord);
    }
  }, [editRecord, open, form]);

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      onSave({ ...editRecord, ...values });
    } catch (error) {
      console.error("Validation failed:", error);
      message.error("Please complete all required fields correctly.");
    }
  };

  const statusOptions = (status?: string) => {
    switch (status) {
      case "Done":
        return ["Closed", "Rejected"];
      case "Assigned":
        return ["Done"];
      default:
        return [];
    }
  };

  return (
    <Modal
      title={
        isViewMode
          ? `Job Card: ${editRecord?.jobCardNumber || ""}`
          : "Update Job Card Status"
      }
      open={open}
      onCancel={onClose}
      destroyOnClose={false} // keep form state unless explicitly cleared
      footer={
        isViewMode ? (
          <Button onClick={() => onSave(editRecord as IJobCard)}>Edit</Button>
        ) : (
          <>
            <Button onClick={onClose} disabled={saving}>
              Cancel
            </Button>
            <Button
              type="primary"
              onClick={handleSubmit}
              loading={saving}
            >
              Update Status
            </Button>
          </>
        )
      }
      width={700}
    >
      <Form
        form={form}
        layout="vertical"
        className={styles.modalForm}
        autoComplete="off"
      >
        <Row gutter={24}>
          <Col span={12}>
            <Title level={5}>Job Card Info</Title>
            <Form.Item name="jobCardNumber" label="JobCard Number">
              <Input disabled />
            </Form.Item>
            <Form.Item name="notes" label="Notes">
              <Input.TextArea disabled />
            </Form.Item>
            <Form.Item name="assignedMechanicName" label="Assigned Mechanic">
              <Input disabled />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Title level={5}>Status</Title>
            <Form.Item name="priority" label="Priority">
              <Select disabled>
                <Option value="Low">Low</Option>
                <Option value="Medium">Medium</Option>
                <Option value="High">High</Option>
              </Select>
            </Form.Item>
            <Form.Item
              name="status"
              label="Status"
              rules={[{ required: true, message: "Please select a status" }]}
            >
              <Select disabled={saving || isViewMode}>
                {statusOptions(editRecord?.status).map((status) => (
                  <Option key={status} value={status}>
                    {status}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
};

export default MechanicJobCardModal;
