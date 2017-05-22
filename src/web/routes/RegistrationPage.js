import React from 'react';
import { Layout } from 'antd';
import styles from './style/common.less';
import RegistrationForm from '../components/RegistrationForm';

const { Header, Content, Footer } = Layout;

class RegistrationPage extends React.Component {
  render() {
    return (
      <Layout className={styles.layout}>
        <Header />
        <Content style={{ padding: 50 }}>
          <RegistrationForm />
        </Content>
        <Footer className={styles.footer} />
      </Layout>
    );
  }
}

export default RegistrationPage;
