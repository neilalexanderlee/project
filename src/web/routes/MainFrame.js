import React from 'react';
import { Layout, Icon, Dropdown, Menu, Row, Col } from 'antd';
import { connect } from 'dva';
import { IndexLink, Link } from 'dva/router';
import frameStyle from './style/MainFrame.less';
/* import { VisibleOnlyAdmin } from '../utils/wrappers'; */

const { Header } = Layout;
/* const OnlyAdminLink = VisibleOnlyAdmin(() => <Link to="/app/admin">管理员</Link>); */

const MainFrame = ({ children, user, isAuthenticated, logout }) => {
  const accountMenu = (
    <Menu style={{ width: 150, textAlign: 'center' }} className={frameStyle.accountMenu}>
      <Menu.Item>{user.userName}</Menu.Item>
      <Menu.Item><a onClick={logout}>登出</a></Menu.Item>
    </Menu>
  );
  return (
    <Layout className={`${frameStyle.layout} ih`}>
      <Header className={frameStyle.header}>
        <Row>
          <Col sm={2} xs={8}>
            <div className={frameStyle.logoWrapper}>
              <IndexLink to="/">
                <img src={require('../assets/logo.png')} alt="logo" />
              </IndexLink>
            </div>
          </Col>
          <Col sm={2} xs={8}>
            <div className={frameStyle.logoWrapper}>
              管理平台
            </div>
          </Col>
          <Col sm={{ span: 2, offset: 18 }} xs={8}>
            {isAuthenticated ?
              <Dropdown overlay={accountMenu} placement="bottomRight">
                <span>
                  <Icon type="user" /><Icon type="down" />
                </span>
              </Dropdown>
              :
              <Link to="/login">登录</Link>
            }
            {/* <ul className="fr">
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
            </ul> */}
          </Col>
        </Row>
      </Header>
      {children}
      {/* <Footer className={frameStyle.footer} /> */}
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

function mapDispatchToProps(dispatch) {
  return {
    logout: () => {
      dispatch({
        type: 'user/logout',
      });
      location.reload();
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(MainFrame);
