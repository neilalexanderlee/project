import React from 'react';
import { Card } from 'antd';
import LoginForm from '../components/LoginForm';
import Frame from '../components/Frame';
import styles from './style/LoginPage.less';

const LoginPage = () => {
  return (
    <Frame showMenu={false}>
      <Card className={styles.card} bodyStyle={{ padding: '64px' }}>
        <LoginForm />
      </Card>
    </Frame>
  );
};

export default LoginPage;
