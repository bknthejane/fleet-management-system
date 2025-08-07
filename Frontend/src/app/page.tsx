"use client";

import React from 'react';
import { Button, Typography, Avatar } from 'antd';
import { useRouter } from 'next/navigation';
import { useStyles } from './styles/landingStyles';

const { Title, Paragraph } = Typography;

const LandingPage: React.FC = () => {
  const { styles } = useStyles();
  const router = useRouter();

  const handleGetStarted = () => {
    router.push('/login');
  };

  return (
    <div className={styles.background}>
      <div className={styles.overlay} />
      <div className={styles.contentWrapper}>
        <div className={styles.logoContainer}>
          <Avatar size={180} src="/Logo.png" className={styles.logo} />
        </div>

        <div className={styles.textSection}>
          <Title className={styles.title}>Fleet Management System</Title>
          <Paragraph className={styles.subtitle}>
            Take control of your fleet with powerful tools for tracking, analytics, and optimization.
          </Paragraph>
          <Button
            className={styles.animatedButton}
            onClick={handleGetStarted}
          >
            Get Started
          </Button>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
