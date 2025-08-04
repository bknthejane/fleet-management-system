"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Layout, Menu, Avatar, Button, Typography } from "antd";
import {
  DashboardOutlined,
  AlertOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { useRouter } from "next/navigation";
import { useStyles } from "./style/driverStyle";

const { Header, Sider, Content } = Layout;
const { Text } = Typography;

interface DriverLayoutProps {
  children: React.ReactNode;
}

const DriverLayout: React.FC<DriverLayoutProps> = ({ children }) => {
  const { styles } = useStyles();
  const [collapsed, setCollapsed] = useState(false);
  const router = useRouter();

  const driverName = "John Driver";
  const firstLetter = driverName.charAt(0).toUpperCase();

  const menuItems = [
    {
      key: "dashboard",
      icon: <DashboardOutlined />,
      label: "Dashboard",
      onClick: () => router.push("/driver/dashboard"),
    },
    {
      key: "incidents",
      icon: <AlertOutlined />,
      label: "Incidents",
      onClick: () => router.push("/driver/incidents"),
    },
  ];

  const handleLogout = () => {
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
        <div className={styles.sidebarHeader}>
          <div style={{ width: 80, height: 80, margin: "0 auto 16px auto" }}>
            <Image
              src="/logo.png"
              alt="Logo"
              width={80}
              height={80}
              style={{ borderRadius: "50%", objectFit: "cover" }}
            />
          </div>

          {!collapsed && (
            <div className={styles.userProfile}>
              <Avatar size={80} className={styles.avatar}>
                {firstLetter}
              </Avatar>
              <div className={styles.userInfo}>
                <Text className={styles.userName}>{driverName}</Text>
                <Text type="secondary" className={styles.onlineStatus}>
                  Driver
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
            <Text className={styles.breadcrumbText}>Driver Panel</Text>
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

export default DriverLayout;
