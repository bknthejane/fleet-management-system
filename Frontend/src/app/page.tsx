'use client';

import React from 'react';
import { Button, Typography, Avatar } from 'antd';
import { useRouter } from 'next/navigation';
import { useStyles } from './styles/landingStyles';

const { Title, Paragraph } = Typography;

const LandingPage = () => {
  const { styles } = useStyles();
  const router = useRouter();

  const handleGetStarted = () => {
    router.push('/login');
  };

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
        <Button 
          type="primary" 
          size="large" 
          className={styles.button}
          onClick={handleGetStarted}
        >
          Get Started
        </Button>
      </div>
    </div>
  );
}

export default LandingPage;