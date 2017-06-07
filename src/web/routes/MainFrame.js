import React from 'react';
import { Layout, Button, Row, Col } from 'antd';
import { connect } from 'dva';
import { IndexLink, Link } from 'dva/router';
import frameStyle from './style/MainFrame.less';
import { VisibleOnlyAdmin } from '../utils/wrappers';

const { Header, Footer } = Layout;
const OnlyAdminLink = VisibleOnlyAdmin(() => <Link to="/app/admin">管理员</Link>);

const MainFrame = ({ children, user, isAuthenticated, logout }) => {
  return (
    <Layout className={frameStyle.layout}>
      <Header className={frameStyle.header}>
        <Row>
          <Col span={12}>
            <IndexLink to="/">
              <img src={require('../assets/logo.png')} alt="logo" className={frameStyle.logo} />
            </IndexLink>
          </Col>
          <Col span={6} offset={3}>
            <div className={frameStyle.welcomeInfo}>
              <em>欢迎您{isAuthenticated ? `，${user.userName}` : ''}</em>
            </div>
          </Col>
          <Col span={3}>
            <div className={frameStyle.loginInfo}>
              <p>
                {isAuthenticated ?
                  <div className={frameStyle.logoutWrapper}>
                    <OnlyAdminLink />
                    <Button type="primary" shape="circle" icon="logout" onClick={logout} />
                  </div>
                  :
                  <div>
                    <Link to="/login">登录</Link>
                    <Link to="/register">注册</Link>
                  </div>
                }
              </p>
            </div>
          </Col>
        </Row>
      </Header>
      {children}
      <Footer className={frameStyle.footer} />
    </Layout>
  );
};

MainFrame.propTypes = {
};

function mapStateToProps({ user }) {
  const isAuthenticated = !!user.userName || false;
  return {
    user,
    isAuthenticated,
  };
}

const mapDispatchToProps = {
  logout: () => ({
    type: 'user/logout',
  }),
};

export default connect(mapStateToProps, mapDispatchToProps)(MainFrame);
