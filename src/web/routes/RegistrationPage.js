import React from 'react';
import { Layout } from 'antd';
import RegistrationForm from '../components/RegistrationForm';

const { Header, Footer, Content } = Layout;

const LoginPage = () => {
  return (
    <Layout>
      <Header />
      <Content>
        <RegistrationForm />
      </Content>
      <Footer />
    </Layout>
  );
};

export default LoginPage;
