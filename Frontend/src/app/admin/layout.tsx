"use client";

import React, { useState, useEffect } from "react";
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
import { useRouter, usePathname } from "next/navigation";

const { Header, Sider, Content } = Layout;
const { Text } = Typography;

interface AdminLayoutProps {
  children: React.ReactNode;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  const { styles } = useStyles();
  const [collapsed, setCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [userData, setUserData] = useState<{
    name: string;
    role: string;
  } | null>(null);

  // Hook to get the current pathname
  const pathname = usePathname();
  const router = useRouter();

  // State to manage the selected menu key
  const [selectedKey, setSelectedKey] = useState("dashboard");

  // UseEffect hook to retrieve user data from sessionStorage and set the active menu key
  useEffect(() => {
    // Retrieve user data
    if (typeof window !== "undefined" && window.sessionStorage) {
      const storedUsername = sessionStorage.getItem("loggedInUser");
      const storedRole = sessionStorage.getItem("role");

      if (storedUsername && storedRole) {
        setUserData({
          name: storedUsername,
          role: storedRole,
        });
      }
    }

    // Set selected key based on the current pathname
    if (pathname) {
      const keyFromPath = pathname.split("/").pop();
      if (keyFromPath) {
        setSelectedKey(keyFromPath);
      }
    }
  }, [pathname]);

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
    sessionStorage.clear();
    router.push("/login");
  };

  return (
    <Layout className={styles.layout}>
      {isMobile && !collapsed && (
        <div
          onClick={() => setCollapsed(true)}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            backgroundColor: "rgba(0, 0, 0, 0.4)",
            zIndex: 1000,
          }}
        />
      )}

      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        collapsedWidth={0}
        className={styles.sidebar}
        width={280}
        breakpoint="md"
        onBreakpoint={(broken) => {
          setCollapsed(broken);
          setIsMobile(broken);
        }}
        onCollapse={(collapsed) => setCollapsed(collapsed)}
        style={{
          zIndex: 1100,
          position: isMobile ? "fixed" : "relative",
          height: "100vh",
          transition: "all 0.3s ease-in-out",
        }}
      >
        <div className={styles.sidebarHeader} style={{ padding: "16px", textAlign: "center" }}>
          <div
            style={{
              width: 96,
              height: 96,
              backgroundColor: "#fff",
              borderRadius: "50%",
              padding: 8,
              margin: "0 auto 16px auto",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
            }}
          >
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
              <div className={styles.userInfo} style={{ marginTop: 0 }}>
                <Text 
                  className={styles.userName} 
                  style={{ color: "#fff" }}
                >
                  {userData?.name || "User"}
                </Text>
                <Text
                  style={{
                    display: "block",
                    fontSize: 12,
                    marginTop: 2,
                    color: "#fff",
                  }}
                >
                  {userData?.role || "Role"}
                </Text>
              </div>
            </div>
          )}
        </div>

        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={[selectedKey]}
          items={menuItems}
          className={styles.menu}
          onClick={({ key }) => {
            setSelectedKey(key);
            const item = menuItems.find(item => item.key === key);
            if (item && item.onClick) {
              item.onClick();
            }
          }}
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