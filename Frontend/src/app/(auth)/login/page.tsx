'use client';

import React, { useState } from "react";
import useStyles from "./style/loginStyles";
import Typography from "antd/es/typography";
import { useRouter } from "next/navigation";
import { Button, Form, Input, Spin } from "antd";
import message from "antd/es/message";
import Image from "next/image";
import {
  EyeInvisibleOutlined,
  EyeTwoTone,
  LockOutlined,
  MailOutlined,
} from "@ant-design/icons";
import { useAuthActions } from "@/providers/auth-provider";
import useApp from "antd/es/app/useApp";


type FieldType = {
  email?: string;
  password?: string;
};

const Login = () => {
  const { styles } = useStyles();
  const { Title } = Typography;
  const router = useRouter();
  const { userLogin } = useAuthActions();
  const [loading, setLoading] = useState(false);
  const app = useApp();

  const onFinish = async (values: FieldType) => {
    setLoading(true);
    try {
      const payload = {
        userNameOrEmailAddress: values.email || "",
        password: values.password || "",
        rememberClient: true,
      };
      await userLogin(payload);
      setLoading(false);
      const user = sessionStorage.getItem("role") || "";

      switch (user) {
        case "Admin":
          app.message.success("Login successfully!");
          router.push("/admin/dashboard");
          break;
        case "MunicipalityAdmin":
          app.message.success("Login successfully!");
          router.push("/municipality/dashboard");
          break;
        case "Supervisor":
          app.message.success("Login successfully!");
          router.push("/supervisor/dashboard");
          break;
        case "Driver":
          app.message.success("Login successfully!");
          router.push("/driver/dashboard");
          break;
        case "Mechanic":
          app.message.success("Login successfully!");
          router.push("/mechanic/dashboard");
          break;
        default:
          app.message.error("Could not find user");
          router.push("/login");
          break;
      }
    } catch (error) {
      setLoading(false);
      console.error(error);
      app.message.error("Login failed. Please check your credentials.");
    }
  };

  if (loading) {
    return (
      <div className={styles.loadingContainer}>
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div className={styles.pageContainer}>
      <div className={styles.loginContainer}>
        <div className={styles.logoContainer}>
          <Image
            src="/Logo.png"
            alt="DriveOps Logo"
            width={120}
            height={120}
            className={styles.logoImage}
          />
          <Title className={styles.welcomeTitle} level={2}>
            Welcome to DriveOps
          </Title>
          <p className={styles.subHeading}>
            Optimize your fleet operations with real-time tracking and analytics
          </p>
        </div>

        <Form
          name="login"
          onFinish={onFinish}
          layout="vertical"
          requiredMark={false}
          autoComplete="off"
        >
          <Form.Item
            name="email"
            className={styles.formItem}
            rules={[{ required: true, message: "Please input your Email!" }]}
          >
            <Input
              size="large"
              placeholder="Email or Username"
              prefix={<MailOutlined />}
            />
          </Form.Item>

          <Form.Item
            name="password"
            className={styles.formItem}
            rules={[{ required: true, message: "Please input your Password!" }]}
          >
            <Input.Password
              size="large"
              placeholder="Password"
              prefix={<LockOutlined />}
              iconRender={(visible) =>
                visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
              }
            />
          </Form.Item>

          <Form.Item className={styles.formItem}>
            <Button
              htmlType="submit"
              type="primary"
              size="large"
              className={styles.button}
              block
            >
              Log in
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Login;
