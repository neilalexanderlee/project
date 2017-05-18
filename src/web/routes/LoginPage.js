import React from 'react';
import { Layout, Card } from 'antd';
import LoginForm from '../components/LoginForm';
import styles from './LoginPage.less';

const { Header, Footer, Content } = Layout;

const LoginPage = () => {
  return (
    <Layout className={styles.layout}>
      <Header />
      <Content>
        <Card className={styles.card} bodyStyle={{ padding: '64px' }}>
          <LoginForm />
        </Card>
      </Content>
      <Footer className={styles.footer} />
    </Layout>
  );
};

export default LoginPage;
