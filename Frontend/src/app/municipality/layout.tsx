"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Layout, Menu, Button, Typography } from "antd";
import {
  DashboardOutlined,
  TeamOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  LogoutOutlined,
  UserOutlined,
  CarOutlined,
} from "@ant-design/icons";
import { useStyles } from "./style/municipalityAdminStyles";
import { useRouter, usePathname } from "next/navigation";
import withAuth from "@/hoc/withAuth";

const { Header, Sider, Content } = Layout;
const { Text } = Typography;

interface AdminLayoutProps {
  children: React.ReactNode;
}

const MunicipalityLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  const { styles } = useStyles();
  const [collapsed, setCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [userData, setUserData] = useState<{
    name: string;
    role: string;
  } | null>(null);

  const pathname = usePathname();
  const router = useRouter();

  const [selectedKey, setSelectedKey] = useState("dashboard");

  useEffect(() => {
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
      onClick: () => router.push("/municipality/dashboard"),
    },
    {
      key: "supervisors",
      icon: <TeamOutlined />,
      label: "Supervisors",
      onClick: () => router.push("/municipality/supervisors"),
    },
    {
      key: "drivers",
      icon: <UserOutlined />,
      label: "Drivers",
      onClick: () => router.push("/municipality/drivers"),
    },
    {
      key: "vehicles",
      icon: <CarOutlined />,
      label: "Vehicles",
      onClick: () => router.push("/municipality/vehicles"),
    },
    {
      key: "users",
      icon: <UserOutlined />,
      label: "Users",
      onClick: () => router.push("/municipality/users"),
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
              src="/Logo.png"
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

export default withAuth(MunicipalityLayout, {allowedRoles:["MunicipalityAdmin"]});