"use client";

import React, { useState, useEffect } from "react";
import {
  Table,
  Typography,
  Avatar,
  message,
  Modal,
  Space,
  Button,
  Card,
  Input,
  Form
} from "antd";
import { UserOutlined, PlusOutlined, EyeOutlined, LockOutlined } from "@ant-design/icons";
import type { ColumnsType } from "antd/es/table";
import { useStyles } from "./style/mechanicStyle";
import { IJobCard } from "@/providers/jobCard-provider/context";
import { IMechanic } from "@/providers/mechanic-provider/context";
import { IUser } from "@/providers/user-provider/context";
import { useMechanicState, useMechanicActions } from "@/providers/mechanic-provider";
import { useJobCardState, useJobCardActions } from "@/providers/jobCard-provider";
import { useUserState, useUserActions } from "@/providers/user-provider";
import MechanicModal from "@/components/MechanicModal";
import useApp from "antd/es/app/useApp";

const { Title } = Typography;
const { Search } = Input;

const MechanicsPage: React.FC = () => {
  const { styles } = useStyles();
  const app = useApp();

  const { mechanics } = useMechanicState();
  const { jobCards } = useJobCardState();
  const { getJobCardList, updateJobCard } = useJobCardActions();
  const { getMechanicList, createMechanic, updateMechanic } = useMechanicActions();
  const { changePassword } = useUserActions();

  const [saving, setSaving] = useState(false);
  const [assigning, setAssigning] = useState(false);
  const [unassigning, setUnassigning] = useState(false);
  const [searchText, setSearchText] = useState("");

  const [mechanicModalVisible, setMechanicModalVisible] = useState(false);
  const [editRecord, setEditRecord] = useState<IMechanic | null>(null);

  const [viewModalVisible, setViewModalVisible] = useState(false);
  const [selectedMechanic, setSelectedMechanic] = useState<IMechanic | null>(null);

  const [assignModalVisible, setAssignModalVisible] = useState(false);
  const [selectedJobCardId, setSelectedJobCardId] = useState<string | null>(null);

  const [municipalityId, setMunicipalityId] = useState<string>("");
  const [supervisorId, setSupervisorId] = useState<string>("");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPasswordModal, setIsPasswordModal] = useState(false);
  const [currentMechanic, setCurrentMechanic] = useState<IMechanic | null>(null);
  const [form] = Form.useForm();

  useEffect(() => {
    const storedMunicipalityId = sessionStorage.getItem("municipalityId") || "";
    setMunicipalityId(storedMunicipalityId);

    const storedSupervisorId = sessionStorage.getItem("supervisorId") || "";
    setSupervisorId(storedSupervisorId);

    if (storedMunicipalityId && storedSupervisorId) {
      getMechanicList();
      getJobCardList();
    }
  }, []);

  const openCreateModal = () => {
    setEditRecord(null);
    setMechanicModalVisible(true);
  };

  const openViewModal = (mechanic: IMechanic) => {
    setSelectedMechanic(mechanic);
    setViewModalVisible(true);
  };

  const closeAllModals = () => {
    setMechanicModalVisible(false);
    setViewModalVisible(false);
    setAssignModalVisible(false);
    setEditRecord(null);
    setSelectedMechanic(null);

    setIsModalOpen(false);
    setCurrentMechanic(null);
    form.resetFields();
  };

  const handleSaveMechanic = async (values: IMechanic) => {
    setSaving(true);
    try {
      const userId = sessionStorage.getItem("userId") || "";
      const municipalityId = sessionStorage.getItem("municipalityId") || "";
      const municipalityName = sessionStorage.getItem("municipalityName") || "";
      const supervisorId = sessionStorage.getItem("supervisorId") || "";

      const mechanic: IMechanic = {
        ...values,
        id: editRecord?.id,
        creatorUserId: editRecord?.creatorUserId ?? userId,
        municipalityId: editRecord?.municipalityId ?? municipalityId,
        municipalityName: editRecord?.municipalityName ?? municipalityName,
        supervisorId: editRecord?.supervisorId ?? supervisorId,
        assignedJobCardId: editRecord?.assignedJobCardId,
      };

      if (editRecord) {
        await updateMechanic(mechanic);
        app.message.success(`Updated Mechanic: ${mechanic.name}`);
      } else {
        await createMechanic(mechanic);
        app.message.success(`Added Mechanic: ${mechanic.name}`);
      }

      await getMechanicList();
      closeAllModals();
    } catch (error) {
      console.error("Error saving mechanic:", error);
      app.message.error("Failed to save mechanic");
    } finally {
      setSaving(false);
    }
  };

  const handleAssignJobCard = async () => {
    if (!selectedMechanic || !selectedJobCardId) return;

    setAssigning(true);
    try {
      const selectedJobCard = jobCards?.find((j) => j.id === selectedJobCardId);
      if (!selectedJobCard) {
        app.message.error("Selected job card not found.");
        return;
      }

      await updateMechanic({
        ...selectedMechanic,
        assignedJobCardId: selectedJobCard.id,
        assignedJobCardNumber: selectedJobCard.jobCardNumber,
      });

      await updateJobCard({
        ...selectedJobCard,
        assignedMechanicId: selectedMechanic.id,
        assignedMechanicName: selectedMechanic.name + " " + selectedMechanic.surname,
        status: "Assigned"
      });

      app.message.success("Job Card assigned successfully!");
      await Promise.all([getMechanicList(), getJobCardList()]);
      setAssignModalVisible(false);
      setSelectedJobCardId(null);
      closeAllModals();
    } catch (error) {
      console.error("Error assigning job card:", error);
      app.message.error("Failed to assign job card");
    } finally {
      setAssigning(false);
    }
  };

  const handleUnassignJobCard = async () => {
    if (!selectedMechanic) return;

    setUnassigning(true);
    try {
      const jobCardToUnassign = jobCards?.find(
        (j) => j.id === selectedMechanic.assignedJobCardId
      );

      await updateMechanic({
        ...selectedMechanic,
        assignedJobCardId: undefined,
        assignedJobCardNumber: undefined,
      });

      if (jobCardToUnassign) {
        await updateJobCard({
          ...jobCardToUnassign,
          assignedMechanicId: undefined,
          assignedMechanicName: undefined,
          status: "Open"
        });
      }

      app.message.success("Job Card unassigned successfully!");
      await Promise.all([getMechanicList(), getJobCardList()]);
      closeAllModals();
    } catch (error) {
      console.error("Error unassigning job card:", error);
      app.message.error("Failed to unassign job card");
    } finally {
      setUnassigning(false);
    }
  };

  const handleSwitchToEdit = (record: IMechanic) => {
    setViewModalVisible(false);
    setEditRecord(record);
    setMechanicModalVisible(true);
  }

  const openEditModal = (mechanic: IMechanic) => {
    setCurrentMechanic(mechanic);
    setIsPasswordModal(false);
    form.setFieldsValue({
      name: mechanic.name,
      surname: mechanic.surname,
      email: mechanic.email,
      department: mechanic.department,
      municipalityName: mechanic.municipalityName,
    });
    setIsModalOpen(true);
  };

  const openPasswordModal = (mechanic: IMechanic) => {
    setCurrentMechanic(mechanic);
    setIsPasswordModal(true);
    form.resetFields();
    setIsModalOpen(true);
  };

  const handleSubmit = async () => {
    if (!currentMechanic) return;

    try {
      const values = await form.validateFields();

      if (isPasswordModal) {
        const payload = {
          userId: currentMechanic.userId,
          newPassword: values.password,
          adminPassword: prompt("Please enter your supervisor password to confirm:"),
        };

        if (!payload.adminPassword) {
          app.message.error("Password change cancelled. Supervisor password is required.");
          return;
        }

        await changePassword(payload);
        app.message.success(`Password updated for ${currentMechanic.name}`);
      } else {
        const updatedMechanic = {
          ...currentMechanic,
          ...values,
        };
        await updateMechanic(updatedMechanic);
        app.message.success(`Mechanic updated: ${currentMechanic.name}`);
      }

      await getMechanicList();
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error:", error);
      app.message.error("An error occurred. Please try again.");
    }
  };

  const filteredMechanics = mechanics
    ?.filter((mec) => mec.supervisorId?.toString() === supervisorId)
    .filter((mec) => {
      const lowerCaseSearch = searchText.toLowerCase();
      return (
        mec.name?.toLowerCase().includes(lowerCaseSearch) ||
        mec.surname?.toLowerCase().includes(lowerCaseSearch) ||
        mec.email?.toLowerCase().includes(lowerCaseSearch) ||
        mec.department?.toLowerCase().includes(lowerCaseSearch) ||
        mec.assignedJobCardNumber?.toLowerCase().includes(lowerCaseSearch)
      );
    }) || [];

  const unassignedJobCards: IJobCard[] = jobCards
    ?.filter((jc) => !jc.assignedMechanicId && jc.supervisorId?.toString() === supervisorId) || [];

  const columns: ColumnsType<IMechanic> = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (_, record) => (
        <Space>
          <Avatar icon={<UserOutlined />} />
          {record.name}
        </Space>
      ),
    },
    { title: "Surname", key: "surname", render: (_, record) => record.surname || "-" },
    { title: "Email", key: "email", render: (_, record) => record.email || "-" },
    { title: "Department", key: "department", render: (_, record) => record.department || "-" },
    { title: "Municipality Name", key: "municipalityName", render: (_, record) => record.municipalityName || "-" },
    { title: "Assigned Job Card", key: "assignedJobCardNumber", render: (_, record) => record.assignedJobCardNumber || "-" },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Space>
          <Button
            type="link"
            icon={<EyeOutlined />}
            onClick={() => openViewModal(record)}
            className={styles.viewButton}
          >
            View
          </Button>
          <Button
            type="link"
            icon={<LockOutlined />}
            onClick={() => openPasswordModal(record)}
            title="Change Password"
          />
        </Space>
      ),
    },
  ];

  return (
    <div style={{ backgroundColor: '#f5f7fa', minHeight: '100vh', padding: '24px' }}>
      <div className={styles.pageHeader}>
        <Title level={3} className={styles.pageTitle}>
          Mechanics
        </Title>
        <Space className={styles.headerControls}>
          <Search
            placeholder="Search mechanics"
            allowClear
            onSearch={(value) => setSearchText(value)}
            onChange={(e) => setSearchText(e.target.value)}
            className={styles.searchBar}
          />
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={openCreateModal}
            className={styles.addButton}
          >
            Add Mechanic
          </Button>
        </Space>
      </div>

      <Card className={styles.tableCard}>
        <Table
          columns={columns}
          dataSource={filteredMechanics}
          pagination={{ pageSize: 5 }}
          rowKey="id"
          loading={!mechanics}
          scroll={{ x: 'max-content' }}
        />
      </Card>

      <MechanicModal
        open={mechanicModalVisible || viewModalVisible || assignModalVisible}
        onClose={closeAllModals}
        editRecord={editRecord || selectedMechanic}
        onSave={handleSaveMechanic}
        isViewMode={viewModalVisible}
        jobCards={unassignedJobCards}
        selectedJobCardId={selectedJobCardId}
        setSelectedJobCardId={setSelectedJobCardId}
        onAssign={handleAssignJobCard}
        assigning={assigning}
        onUnassign={handleUnassignJobCard}
        unassigning={unassigning}
        showAssignModal={assignModalVisible}
        setShowAssignModal={setAssignModalVisible}
        saving={saving}
        onSwitchToEdit={handleSwitchToEdit}
      />

      <Modal
        title={isPasswordModal ? "Change Password" : "Edit Mechanic"}
        open={isModalOpen}
        onOk={handleSubmit}
        onCancel={() => setIsModalOpen(false)}
        okText={isPasswordModal ? "Update Password" : "Save"}
      >
        <Form form={form} layout="vertical">
          {isPasswordModal ? (
            <>
              <Form.Item
                name="password"
                label="New Password"
                rules={[
                  { required: true, message: "Enter new password" },
                  { min: 6, message: "Password must be at least 6 characters" },
                ]}
              >
                <Input.Password placeholder="Enter new password" />
              </Form.Item>
              <Form.Item
                name="confirmPassword"
                label="Confirm Password"
                dependencies={["password"]}
                rules={[
                  { required: true, message: "Confirm password" },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      return !value || getFieldValue("password") === value
                        ? Promise.resolve()
                        : Promise.reject(new Error("Passwords don't match"));
                    },
                  }),
                ]}
              >
                <Input.Password placeholder="Confirm new password" />
              </Form.Item>
            </>
          ) : (
            <>
              <Form.Item
                name="name"
                label="Name"
                rules={[{ required: true, message: "Name is required" }]}
              >
                <Input placeholder="Enter mechanic's name" />
              </Form.Item>
              <Form.Item
                name="surname"
                label="Surname"
                rules={[{ required: true, message: "Surname is required" }]}
              >
                <Input placeholder="Enter mechanic's surname" />
              </Form.Item>
              <Form.Item
                name="email"
                label="Email"
                rules={[
                  { required: true, message: "Email is required" },
                  { type: "email", message: "Please enter a valid email" },
                ]}
              >
                <Input placeholder="Enter mechanic's email" />
              </Form.Item>
            </>
          )}
        </Form>
      </Modal>
    </div>
  );
};

export default MechanicsPage;