"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Layout, Menu, Avatar, Button, Typography } from "antd";
import {
  DashboardOutlined,
  TeamOutlined,
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

  const adminName = "Admin Officer";
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
    console.log("Logging out...");
    router.push("/login");
  };

  return (
    <Layout className={styles.layout}>
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        className={styles.sidebar}
        width={280}
        collapsedWidth={80}
      >
        <div
          className={styles.sidebarHeader}
          style={{ padding: "16px", textAlign: "center" }}
        >
          <div style={{ width: 80, height: 80, margin: "0 auto 16px auto" }}>
            <Image
              src="/logo.png"
              alt="Logo"
              width={80}
              height={80}
              style={{
                borderRadius: "50%",
                objectFit: "cover",
              }}
            />
          </div>

          {!collapsed && (
            <div className={styles.userProfile}>
              <Avatar size={80} className={styles.avatar}>
                {firstLetter}
              </Avatar>
              <div className={styles.userInfo} style={{ marginTop: 0 }}>
                <Text className={styles.userName}>{adminName}</Text>
                <Text
                  type="secondary"
                  style={{
                    display: "block",
                    fontSize: 12,
                    marginTop: 2,
                  }}
                >
                  System Admin
                </Text>
              </div>
            </div>
          )}
        </div>

        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["dashboard"]}
          items={menuItems}
          className={styles.menu}
        />
      </Sider>

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
