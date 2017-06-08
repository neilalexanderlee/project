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
          <Col sm={12} xs={8}>
            <IndexLink to="/">
              <img src={require('../assets/logo.png')} alt="logo" className={frameStyle.logo} />
            </IndexLink>
          </Col>
          <Col sm={{ span: 9, offset: 3 }} xs={16}>
            <ul className="fr">
              <li>
                <span>欢迎您{isAuthenticated ? ` ${user.userName}` : ''}</span>
              </li>
              <li>{isAuthenticated ?
                <div>
                  <OnlyAdminLink />
                  <Button type="primary" shape="circle" icon="logout" onClick={logout} />
                </div>
                :
                <ul className="fr">
                  <li>
                    <Link to="/login">登录</Link>
                  </li>
                  <li><span>|</span></li>
                  <li>
                    <Link to="/register">注册</Link>
                  </li>
                </ul>
              }
              </li>
            </ul>
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
