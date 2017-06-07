import React from 'react';
import { Layout } from 'antd';
import RegistrationForm from '../components/RegistrationForm';

const { Content } = Layout;

const RegistrationPage = () => {
  return (
    <Content>
      <RegistrationForm />
    </Content>
  );
};

export default RegistrationPage;
