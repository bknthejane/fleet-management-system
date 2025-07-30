'use client';

import React from 'react';
import { Button, Typography, Avatar } from 'antd';
import { useStyles } from './styles/landingStyles';

const { Title, Paragraph } = Typography;

export default function LandingPage() {
  const { styles } = useStyles();

  return (
    <div className={styles.background}>
      <div className={styles.logoContainer}>
        <Avatar
          size={200}
          src="/Logo.png"
          className={styles.logo}
        />
      </div>

      <div className={styles.textSection}>
        <Title style={{color: "white",}}>Fleet Management System</Title>
        <Paragraph className={styles.subtitle}>
          Optimize your fleet operations with real-time tracking and analytics
        </Paragraph>
        <Button type="primary" size="large" className={styles.button}>
          Get Started
        </Button>
      </div>
    </div>
  );
}
