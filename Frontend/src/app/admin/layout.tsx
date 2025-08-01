"use client";

import React, { useState } from "react";
import { Layout, Menu, Avatar, Button, Typography } from "antd";
import {
  DashboardOutlined,
  UserOutlined,
  TeamOutlined,
  BellOutlined,
  SearchOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  BankOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { useStyles } from "./style/adminStyles";
import { useRouter } from "next/navigation";

const { Header, Sider, Content } = Layout;
const { Text } = Typography;

interface AdminLayoutProps {
  children: React.ReactNode;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  const { styles } = useStyles();
  const [collapsed, setCollapsed] = useState(false);
  const router = useRouter();

  const adminName = "Admin Officer"; // Example name; can come from auth context
  const firstLetter = adminName.charAt(0).toUpperCase();

  const menuItems = [
    {
      key: "dashboard",
      icon: <DashboardOutlined />,
      label: "Dashboard",
      onClick: () => router.push("/admin/dashboard"),
    },
    {
      key: "municipalities",
      icon: <BankOutlined />,
      label: "Municipalities",
      onClick: () => router.push("/admin/municipalities"),
    },
    {
      key: "users",
      icon: <TeamOutlined />,
      label: "Users",
      onClick: () => router.push("/admin/users"),
    },
  ];

  const handleLogout = () => {
    // Example logout logic
    console.log("Logging out...");
    router.push("/login");
  };

  return (
    <Layout className={styles.layout}>
      {/* Sidebar */}
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        className={styles.sidebar}
        width={280}
        collapsedWidth={80}
      >
        <div className={styles.sidebarHeader}>
          <Button
            type="text"
            icon={<UserOutlined />}
            className={styles.shareIcon}
          >
            {!collapsed && "System Admin"}
          </Button>

          <div className={styles.userProfile}>
            <Avatar size={48} className={styles.avatar}>
              {firstLetter}
            </Avatar>
            {!collapsed && (
              <div className={styles.userInfo}>
                <Text className={styles.userName}>{adminName}</Text>
                <div className={styles.onlineStatus}>
                  <div className={styles.statusDot} />
                </div>
              </div>
            )}
          </div>
        </div>

        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["dashboard"]}
          items={menuItems}
          className={styles.menu}
        />

        <div className={styles.addFilesSection}>
          <Button
            type="primary"
            className={styles.addFilesButton}
            block={!collapsed}
            onClick={() => router.push("/admin/municipalities/create")}
          >
            <span>+</span>
            {!collapsed && (
              <div>
                <div>Add Municipality</div>
                <Text className={styles.addFilesSubtext}>Create New</Text>
              </div>
            )}
          </Button>
        </div>
      </Sider>

      {/* Main Layout */}
      <Layout className={styles.mainLayout}>
        <Header className={styles.header}>
          <div className={styles.headerLeft}>
            <Button
              type="text"
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={() => setCollapsed(!collapsed)}
              className={styles.collapseButton}
            />
            <Text className={styles.breadcrumbText}>Municipal Management</Text>
          </div>

          <div className={styles.headerRight}>
            <div className={styles.searchContainer}>
              <SearchOutlined className={styles.searchIcon} />
              <input
                placeholder="Search municipalities..."
                className={styles.searchInput}
              />
            </div>
            <Button
              type="text"
              icon={<LogoutOutlined />}
              className={styles.headerButton}
              onClick={handleLogout}
            >
              Logout
            </Button>
          </div>
        </Header>

        <Content className={styles.content}>{children}</Content>
      </Layout>
    </Layout>
  );
};

export default AdminLayout;
