"use client";

import React, { useEffect, useState } from "react";
import {
    Table,
    Typography,
    Button,
    Space,
    message,
    Card,
    Input
} from "antd";
import type { ColumnsType } from "antd/es/table";
import { PlusOutlined, EyeOutlined, SearchOutlined } from "@ant-design/icons";
import { useStyles } from "./style/jobCardStyle";
import { IJobCard } from "@/providers/jobCard-provider/context";
import { IMechanic } from "@/providers/mechanic-provider/context";
import { useJobCardState, useJobCardActions } from "@/providers/jobCard-provider";
import { useMechanicState, useMechanicActions } from "@/providers/mechanic-provider";
import JobCardModal from "@/components/JobCardModal";
import useApp from "antd/es/app/useApp";

const { Title } = Typography;
const { Search } = Input;

const JobCardsPage: React.FC = () => {
    const { styles } = useStyles();

    const { jobCards } = useJobCardState();
    const { mechanics } = useMechanicState();
    const { getJobCardList, createJobCard, updateJobCard, deleteJobCard } = useJobCardActions();
    const { getMechanicList, updateMechanic } = useMechanicActions();

    const [jobCardModalVisible, setJobCardModalVisible] = useState(false);
    const [viewModalVisible, setViewModalVisible] = useState(false);
    const [assignModalVisible, setAssignModalVisible] = useState(false);

    const [editRecord, setEditRecord] = useState<IJobCard | null>(null);
    const [selectedJobCard, setSelectedJobCard] = useState<IJobCard | null>(null);
    const [selectedMechanicId, setSelectedMechanicId] = useState<string | null>(null);

    const [saving, setSaving] = useState(false);
    const [assigning, setAssigning] = useState(false);
    const [unassigning, setUnassigning] = useState(false);
    const [deleting, setDeleting] = useState(false);
    const [searchText, setSearchText] = useState("");

    const [supervisorId, setSupervisorId] = useState<string>("");
    const app = useApp();

    useEffect(() => {
        const storedSupervisorId = sessionStorage.getItem("supervisorId") || "";
        setSupervisorId(storedSupervisorId);

        if (storedSupervisorId) {
            getJobCardList();
            getMechanicList();
        }
    }, []);

    const openJobCardModal = (record?: IJobCard) => {
        setEditRecord(record || null);
        setJobCardModalVisible(true);
    }

    const openViewModal = (jobCard: IJobCard) => {
        setSelectedJobCard(jobCard);
        setSelectedMechanicId(jobCard.assignedMechanicId || null);
        setViewModalVisible(true);
    };

    const closeAllModals = () => {
        setJobCardModalVisible(false);
        setViewModalVisible(false);
        setAssignModalVisible(false);
        setEditRecord(null);
        setSelectedJobCard(null);
    };

    const handleSaveJobCard = async (values: IJobCard) => {
        setSaving(true);
        try {
            const userId = sessionStorage.getItem("userId") || "";
            const vehicleId = sessionStorage.getItem("vehicleId") || "";
            const driverId = sessionStorage.getItem("driverId") || "";
            const supervisorId = sessionStorage.getItem("supervisorId") || "";

            const jobCard: IJobCard = {
                ...values,
                id: editRecord?.id,
                creatorUserId: editRecord?.creatorUserId ?? userId,
                supervisorId: editRecord?.supervisorId ?? supervisorId,
                vehicleId: editRecord?.vehicleId ?? vehicleId,
                driverId: editRecord?.driverId ?? driverId,
                incidentId: editRecord?.incidentId,
                assignedMechanicId: editRecord?.assignedMechanicId,
            };

            if (editRecord) {
                await updateJobCard(jobCard);
                app.message.success(`Updated JobCard: ${jobCard.jobCardNumber}`);
            } else {
                await createJobCard(jobCard);
                app.message.success(`Added JobCard: ${jobCard.jobCardNumber}`);
            }

            await getJobCardList();
            closeAllModals();
        } catch (error) {
            console.error("Error saving JobCard:", error);
            app.message.error("Failed to save JobCard");
        } finally {
            setSaving(false);
        }
    };

    const handleDeletejobCard = (id?: string) => {
        if (!id) return;

        import("antd").then(({ Modal }) => {
            Modal.confirm({
                title: "Are you sure you want to delete this JobCard?",
                okText: "Delete",
                okType: "danger",
                onOk: async () => {
                    setDeleting(true);
                    try {
                        await deleteJobCard(id);
                        await getJobCardList();
                        app.message.success("JobCard deleted successfully");
                    } catch (error) {
                        console.error("Delete error:", error);
                        app.message.error("Failed to delete JobCard");
                    } finally {
                        setDeleting(false);
                    }
                },
            });
        });
    };

    const handleAssignMechanic = async () => {
        if (!selectedJobCard || !selectedMechanicId) return;

        setAssigning(true);
        try {
            await updateJobCard({
                ...selectedJobCard,
                assignedMechanicId: selectedMechanicId,
                status: "Assigned",
            });

            const mechanic = mechanics?.find((m) => m.id === selectedMechanicId);
            if (mechanic) {
                await updateMechanic({
                    ...mechanic,
                    assignedJobCardId: selectedJobCard.id,
                    assignedJobCardNumber: selectedJobCard.jobCardNumber,
                });
            }

            app.message.success("Mechanic assigned successfully!");
            await Promise.all([getJobCardList(), getMechanicList()]);
            setAssignModalVisible(false);
            setSelectedMechanicId(null);
            setViewModalVisible(false);
        } catch (error) {
            console.error("Error assigning mechanic:", error);
            app.message.error("Failed to assign mechanic");
        } finally {
            setAssigning(false);
        }
    };

    const handleUnassignMechanic = async () => {
        if (!selectedJobCard || !selectedJobCard.assignedMechanicId) return;

        setUnassigning(true);
        try {
            const mechanic = mechanics?.find((m) => m.id === selectedJobCard.assignedMechanicId);
            await updateJobCard({
                ...selectedJobCard,
                assignedMechanicId: undefined,
                assignedMechanicName: undefined,
                status: "Open"
            });

            if (mechanic) {
                await updateMechanic({
                    ...mechanic,
                    assignedJobCardId: undefined,
                    assignedJobCardNumber: undefined
                });
            }

            app.message.success("Mechanic unassigned successfully!");
            await Promise.all([getMechanicList(), getJobCardList()]);
            setViewModalVisible(false);
        } catch (error) {
            console.error("Error unassiging mechanic:", error);
            app.message.error("Failed to unassign mechanic");
        } finally {
            setUnassigning(false);
        }
    };

    const filteredJobCards = jobCards
        ?.filter((jc) => jc.supervisorId?.toString() === supervisorId)
        .filter((jc) => {
            const lowerCaseSearch = searchText.toLowerCase();
            return (
                jc.jobCardNumber?.toLowerCase().includes(lowerCaseSearch) ||
                jc.status?.toLowerCase().includes(lowerCaseSearch) ||
                jc.assignedMechanicName?.toLowerCase().includes(lowerCaseSearch)
            );
        }) || [];

    const unassignedMechanics: IMechanic[] =
        mechanics?.filter(
            (m) => !m.assignedJobCardId && m.supervisorId?.toString() === supervisorId
        ) || [];

    const columns: ColumnsType<IJobCard> = [
        { title: "JobCard Number", key: "jobCardnNumber", render: (_, r) => r.jobCardNumber || "-" },
        { title: "Notes", key: "notes", render: (_, r) => r.notes || "-" },
        { title: "Priority", key: "priority", render: (_, r) => r.priority || "-" },
        { title: "Status", key: "status", render: (_, r) => r.status || "-" },
        { title: "Assigned Mechanic", key: "assignedMechanic", render: (_, r) => r.assignedMechanicName || "-" },
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
                </Space>
            ),
        },
    ];

    return (
        <div style={{ backgroundColor: '#f5f7fa', minHeight: '100vh', padding: '24px' }}>
            <div className={styles.pageHeader}>
                <Title level={3} className={styles.pageTitle}>
                    Job Cards
                </Title>
                <Space className={styles.headerControls}>
                    <Search
                        placeholder="Search job cards"
                        allowClear
                        onSearch={(value) => setSearchText(value)}
                        onChange={(e) => setSearchText(e.target.value)}
                        className={styles.searchBar}
                    />
                    <Button
                        type="primary"
                        icon={<PlusOutlined />}
                        onClick={() => openJobCardModal()}
                        className={styles.addButton}
                    >
                        Add Job Card
                    </Button>
                </Space>
            </div>

            <Card className={styles.tableCard}>
                <Table
                    columns={columns}
                    dataSource={filteredJobCards}
                    rowKey="id"
                    pagination={{ pageSize: 5 }}
                    loading={!jobCards}
                    scroll={{ x: 'max-content' }}
                />
            </Card>

            <JobCardModal
                open={jobCardModalVisible || viewModalVisible || assignModalVisible}
                onClose={closeAllModals}
                editRecord={editRecord || selectedJobCard}
                onSave={(jobCard) => {
                    if (viewModalVisible) {
                        setEditRecord(jobCard);
                        setJobCardModalVisible(true);
                        setViewModalVisible(false);
                    } else {
                        handleSaveJobCard(jobCard);
                    }
                }}
                isViewMode={viewModalVisible}
                mechanics={unassignedMechanics}
                selectedMechanicId={selectedMechanicId}
                setSelectedMechanicId={setSelectedMechanicId}
                onAssign={handleAssignMechanic}
                assigning={assigning}
                onUnassign={handleUnassignMechanic}
                unassigning={unassigning}
                showAssignModal={assignModalVisible}
                setShowAssignModal={setAssignModalVisible}
                saving={saving}
            />
        </div>
    );
};

export default JobCardsPage;