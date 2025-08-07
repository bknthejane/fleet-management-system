"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Layout, Menu, Avatar, Button, Typography } from "antd";
import {
  DashboardOutlined,
  ToolOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { useRouter } from "next/navigation";
import { useStyles } from "./style/mechanicStyle";

const { Header, Sider, Content } = Layout;
const { Text } = Typography;

interface MechanicLayoutProps {
  children: React.ReactNode;
}

const MechanicLayout: React.FC<MechanicLayoutProps> = ({ children }) => {
  const { styles } = useStyles();
  const [collapsed, setCollapsed] = useState(false);
  const router = useRouter();

  const mechanicName = "John Doe";
  const firstLetter = mechanicName.charAt(0).toUpperCase();

  const menuItems = [
    {
      key: "dashboard",
      icon: <DashboardOutlined />,
      label: "Dashboard",
      onClick: () => router.push("/mechanic/dashboard"),
    },
    {
      key: "jobcards",
      icon: <ToolOutlined />,
      label: "Job Cards",
      onClick: () => router.push("/mechanic/jobcard"),
    },
  ];

  const handleLogout = () => {
    sessionStorage.clear();
    router.push("/login");
  };

  return (
    <Layout className={styles.layout}>
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        className={styles.sidebar}
        width={260}
        collapsedWidth={80}
      >
        <div className={styles.sidebarHeader}>
          <div style={{ width: 60, height: 60, margin: "0 auto 16px auto" }}>
            <Image
              src="/logo.png"
              alt="Logo"
              width={60}
              height={60}
              style={{ borderRadius: "50%" }}
            />
          </div>

          {!collapsed && (
            <div className={styles.userProfile}>
              <Avatar size={64} className={styles.avatar}>
                {firstLetter}
              </Avatar>
              <div className={styles.userInfo}>
                <Text className={styles.userName}>{mechanicName}</Text>
                <Text className={styles.onlineStatus}>Mechanic</Text>
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
            <Text className={styles.breadcrumbText}>Mechanic Panel</Text>
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

export default MechanicLayout;
