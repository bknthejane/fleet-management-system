'use client';

import React, { useState } from "react";
import { useStyles } from "./style/loginStyles";
import Typography from "antd/es/typography";
import { useRouter } from "next/navigation";
import { Button, Flex, Form, FormProps, Input, Spin } from "antd/es";
import message from "antd/es/message";
import Image from "next/image";
import {
  EyeInvisibleOutlined,
  EyeTwoTone,
  LockOutlined,
  MailOutlined,
} from "@ant-design/icons";
import { useAuthActions } from "@/providers/auth-provider";

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

  const onFinish: FormProps<FieldType>["onFinish"] = async (values) => {
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

      if (user === "Admin") {
        message.success("Login successfully!");
        router.push("/admin/dashboard");
      } else if (user === "MunicipalityAdmin") {
        message.success("Login successfully!");
        router.push("/municipality/dashboard");
      } else if (user === "Supervisor") {
        message.success("Login successfully!");
        router.push("/supervisor/dashboard");
      } else if (user === "Driver") {
        message.success("Login successfully!");
        router.push("/driver/dashboard");
      } else if (user === "Mechanic") {
        message.success("Login successfully!");
        router.push("/mechanic/dashboard");
      } else {
        message.error("Could not find user");
        router.push("/login");
      }
    } catch (error) {
      setLoading(false);
      console.error(error);
      message.error("Login failed. Please check your credentials.");
    }
  };

  return (
    <>
      {loading ? (
        <div className={styles.loadingContainer}>
          <Flex
            justify="center"
            align="center"
            style={{ marginBottom: 20, width: "100%", height: "100vh" }}
          >
            <Spin size="large" />
          </Flex>
        </div>
      ) : (
        <>
          <div className={styles.splitLeft}>
            <div className={styles.centered}>
              <div className={styles.logoContainer}>
                <Image
                  src="/Logo.png"
                  alt="DriveOps Logo"
                  width={200}
                  height={200}
                />
              </div>
              <Title className={styles.welcomeTitle} level={1}>
                Welcome to DriveOps
              </Title>
              <h2 className={styles.subHeading}>
                Optimize your fleet operations with real-time tracking and analytics
              </h2>
            </div>
          </div>
          
          <div className={styles.splitRight}>
            <div className={styles.page}>
              <div className={styles.mobileLogo}>
                <Image
                  src="/DriveOpsLogo-Small.png"
                  alt="DriveOps Logo"
                  width={120}
                  height={120}
                  className={styles.logoImage}
                />
              </div>
              
              <div className={styles.form}>
                <Form
                  name="login"
                  initialValues={{ remember: true }}
                  className={styles.formContent}
                  onFinish={onFinish}
                >
                  <h2 className={styles.heading}>Login</h2>
                  
                  <Form.Item
                    className={styles.formItem}
                    name="email"
                    rules={[
                      { required: true, message: "Please input your Email!" },
                    ]}
                  >
                    <Input
                      size="large"
                      placeholder="Email or Username"
                      prefix={<MailOutlined />}
                      className={styles.input}
                    />
                  </Form.Item>
                  
                  <Form.Item
                    className={styles.formItem}
                    name="password"
                    rules={[
                      {
                        required: true,
                        message: "Please input your Password!",
                      },
                    ]}
                  >
                    <Input.Password
                      className={styles.input}
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
                      block
                      type="primary"
                      htmlType="submit"
                      className={styles.button}
                      size="large"
                    >
                      Log in
                    </Button>
                  </Form.Item>
                </Form>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Login;