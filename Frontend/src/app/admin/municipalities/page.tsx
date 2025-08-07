'use client';

import { useEffect, useState } from "react";
import { Table, Button, Space, Input } from "antd/es";
import type { ColumnsType } from "antd/es/table";
import {
    PlusOutlined,
    EditOutlined,
} from "@ant-design/icons";
import { useStyles } from "./style/municipalitiesStyles";
import { IMunicipality } from "@/providers/municipality-provider/context";
import { useMunicipalityActions, useMunicipalityState } from "@/providers/municipality-provider";
import MunicipalityModal from "@/components/MunicipalityModal";
import useApp from "antd/es/app/useApp";

const { Search } = Input;

const MunicipalitiesPage: React.FC = () => {
    const { styles } = useStyles();
    const { municipalities } = useMunicipalityState();
    const { getMunicipalityList, createMunicipality, updateMunicipality } =
        useMunicipalityActions();

    const [modalVisible, setModalVisible] = useState(false);
    const [editRecord, setEditRecord] = useState<IMunicipality | null>(null);
    const [searchText, setSearchText] = useState("");
    const app = useApp();

    useEffect(() => {
        getMunicipalityList();
    }, []);

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
                app.message.success(`Updated Municipality: ${municipality.name}`);
            } else {
                await createMunicipality(municipality);
                app.message.success(`Added Municipality: ${municipality.name}`);
            }

            getMunicipalityList();
            closeModal();
        } catch (error) {
            console.error("Error saving municipality:", error);
            app.message.error("Failed to save municipality");
        }
    };

    const filteredMunicipalities = municipalities?.filter(m =>
        m.name?.toLowerCase().includes(searchText.toLowerCase())
    );

    const columns: ColumnsType<IMunicipality> = [
        { title: "Name", key: "name", dataIndex: "name" },
        { title: "Address", key: "address", dataIndex: "address" },
        { title: "Contact Person", key: "contactPerson", dataIndex: "contactPerson" },
        { title: "Email", key: "email", dataIndex: "email" },
        { title: "Contact Number", key: "contactNumber", dataIndex: "contactNumber" },
        {
            title: "Actions",
            key: "actions",
            render: (_, record) => (
                <Space>
                    <Button
                        type="default"
                        icon={<EditOutlined />}
                        onClick={() => openModal(record)}
                    />
                </Space>
            ),
        },
    ];

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h2 style={{ margin: 0 }}>Municipalities</h2>
                <Space>
                    <Search
                        placeholder="Search municipalities"
                        allowClear
                        onSearch={setSearchText}
                        onChange={(e) => setSearchText(e.target.value)}
                        className={styles.searchBar}
                    />
                    <Button
                        type="default"
                        className={styles.addButton}
                        icon={<PlusOutlined />}
                        onClick={() => openModal()}
                    >
                        Add Municipality
                    </Button>
                </Space>
            </div>

            <Table
                columns={columns}
                dataSource={filteredMunicipalities}
                rowKey="id"
                pagination={{ pageSize: 5 }}
                bordered
                loading={!municipalities}
                scroll={{ x: 'max-content' }}
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