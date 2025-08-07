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
import { IMechanic } from "@/providers/mechanic-provider/context";
import { useStyles } from "@/app/admin/municipalities/style/municipalitiesStyles";

const { Title } = Typography;
const { Option } = Select;

interface JobCardModalProps {
  open: boolean;
  onClose: () => void;
  editRecord: IJobCard | null;
  onSave: (values: IJobCard) => void;
  isViewMode?: boolean;
  mechanics: IMechanic[];
  selectedMechanicId: string | null;
  setSelectedMechanicId: (id: string | null) => void;
  onAssign: () => void;
  onUnassign: () => void;
  assigning: boolean;
  unassigning: boolean;
  showAssignModal: boolean;
  setShowAssignModal: (value: boolean) => void;
  saving: boolean;
}

const JobCardModal: React.FC<JobCardModalProps> = ({
  open,
  onClose,
  editRecord,
  onSave,
  isViewMode = false,
  mechanics,
  selectedMechanicId,
  setSelectedMechanicId,
  onAssign,
  onUnassign,
  assigning,
  unassigning,
  showAssignModal,
  setShowAssignModal,
  saving,
}) => {
  const { styles } = useStyles();
  const [form] = Form.useForm<IJobCard>();

  useEffect(() => {
    if (editRecord) {
      form.setFieldsValue(editRecord);
    } else {
      form.resetFields();
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
    <>
      <Modal
        title={
          isViewMode
            ? `Job Card: ${editRecord?.jobCardNumber || ""}`
            : editRecord
            ? "Edit Job Card"
            : "Add Job Card"
        }
        open={open && !showAssignModal}
        onCancel={onClose}
        footer={
          isViewMode ? (
            <>
              <Button onClick={() => onSave(editRecord as IJobCard)}>Edit</Button>
              {editRecord?.assignedMechanicId && (
                <Button danger onClick={onUnassign} loading={unassigning}>
                  Unassign Mechanic
                </Button>
              )}
              <Button
                type="primary"
                onClick={() => setShowAssignModal(true)}
              >
                {editRecord?.assignedMechanicId ? "Reassign" : "Assign Mechanic"}
              </Button>
            </>
          ) : (
            <>
              <Button key="cancel" onClick={onClose} disabled={saving}>
                Cancel
              </Button>
              <Button key="submit" type="primary" onClick={handleSubmit} loading={saving}>
                Submit
              </Button>
            </>
          )
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
              <Title level={5}>Job Card Info</Title>
              <Form.Item
                name="jobCardNumber"
                label="JobCard Number"
              >
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
              <Title level={5}>Status & Priority</Title>
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

      <Modal
        title={`Assign Mechanic to ${editRecord?.jobCardNumber || ""}`}
        open={showAssignModal}
        onCancel={() => setShowAssignModal(false)}
        footer={[
          <Button key="cancel" onClick={() => setShowAssignModal(false)}>
            Cancel
          </Button>,
          <Button
            key="assign"
            type="primary"
            onClick={async () => {
              if (editRecord) {
                // force status to "Assigned" before calling assign
                form.setFieldsValue({ status: "Assigned" });
              }
              await onAssign();
            }}
            disabled={!selectedMechanicId}
            loading={assigning}
          >
            Assign
          </Button>,
        ]}
      >
        {mechanics.length === 0 ? (
          <p>No unassigned mechanics available</p>
        ) : (
          <Form layout="vertical">
            <Form.Item label="Select Mechanic">
              <Select
                value={selectedMechanicId || undefined}
                onChange={(value) => setSelectedMechanicId(value)}
                placeholder="Select a mechanic"
              >
                {mechanics.map((mech) => (
                  <Option key={mech.id} value={mech.id}>
                    {mech.name}
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

export default JobCardModal;
