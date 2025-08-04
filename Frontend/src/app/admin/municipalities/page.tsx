'use client';

import { useEffect, useState } from "react";
import { Table, Button, Modal, Space, message } from "antd/es";
import type { ColumnsType } from "antd/es/table";
import { useStyles } from "./style/municipalitiesStyles";
import { IMunicipality } from "@/providers/municipality-provider/context";
import { useMunicipalityActions, useMunicipalityState } from "@/providers/municipality-provider";
import MunicipalityModal from "@/components/MunicipalityModal";

const MunicipalitiesPage: React.FC = () => {
    const { styles } = useStyles();

    const { municipalities } = useMunicipalityState();
    const { getMunicipalityList, createMunicipality, updateMunicipality, deleteMunicipality } =
        useMunicipalityActions();

    const [modalVisible, setModalVisible] = useState(false);
    const [editRecord, setEditRecord] = useState<IMunicipality | null>(null);

    useEffect(() => {
        getMunicipalityList();
    }, ['']);

    const openModal = (record?: IMunicipality) => {
        setEditRecord(record || null);
        setModalVisible(true);
    };

    const closeModal = () => {
        setModalVisible(false);
        setEditRecord(null);
    };

    const handleSaveMunicipality = async (values: IMunicipality) => {
        try {
            const userId = sessionStorage.getItem("userId") || "";

            const municipality: IMunicipality = {
                ...values,
                id: editRecord?.id,
                creatorUserId: editRecord?.creatorUserId ?? userId,
            };

            if (editRecord) {
                await updateMunicipality(municipality);
                message.success(`Updated Municipality: ${municipality.name}`);
            } else {
                await createMunicipality(municipality);
                message.success(`Added Municipality: ${municipality.name}`);
            }

            getMunicipalityList();
            closeModal();
        } catch (error) {
            console.error("Error saving municipality:", error);
            message.error("Failed to save municipality");
        }
    };

    const handleDeleteMunicipality = (id?: string) => {
        if (!id) return;

        Modal.confirm({
            title: "Are you sure you want to delete this municipality?",
            okText: "Delete",
            okType: "danger",
            onOk: async () => {
                await deleteMunicipality(id);
                message.success("Municipality deleted");
                getMunicipalityList();
            },
        });
    };

    const columns: ColumnsType<IMunicipality> = [
        { title: "Name", key: "name", render: (_, record) => record.name || "-" },
        { title: "Address", key: "address", render: (_, record) => record.address || "-" },
        { title: "Contact Person", key: "contactPerson", render: (_, record) => record.contactPerson || "-" },
        { title: "Email", key: "email", render: (_, record) => record.email || "-" },
        { title: "Contact Number", key: "contactNumber", render: (_, record) => record.contactNumber || "-" },
        {
            title: "Actions",
            key: "actions",
            render: (_, record) => (
                <Space>
                    <Button type="link" onClick={() => openModal(record)}>Edit</Button>
                    <Button danger type="link" onClick={() => handleDeleteMunicipality(record.id)}>Delete</Button>
                </Space>
            ),
        },
    ];

    return (
        <div className={styles.container}>
            <div
                style={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: "16px",
                }}
            >
                <h2 style={{ margin: 0 }}>Municipalities</h2>
                <Button type="primary" onClick={() => openModal()}>
                    Add Municipality
                </Button>
            </div>

            <Table
                columns={columns}
                dataSource={municipalities}
                rowKey="id"
                pagination={{ pageSize: 5 }}
                bordered
            />

            <MunicipalityModal
                open={modalVisible}
                onClose={closeModal}
                editRecord={editRecord}
                onSave={handleSaveMunicipality}
            />
        </div>
    );
};

export default MunicipalitiesPage;
