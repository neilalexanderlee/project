import React, { PropTypes } from 'react';
import { Layout, Menu, Icon } from 'antd';
import { connect } from 'dva';
import { Link } from 'dva/router';
import frameStyle from './style/Frame.less';

const { Header, Content, Footer, Sider } = Layout;
const SubMenu = Menu.SubMenu;

const Frame = ({ frame, children, onCollapse, showMenu }) => {
  return (
    <Layout className={frameStyle.layout}>
      <Header className={frameStyle.header}>
        <Link to="/">
          <img src={require('../assets/logo.png')} alt="logo" className={frameStyle.logo} />
        </Link>
      </Header>
      {showMenu ?
        <Layout>
          <Sider
            collapsible
            collapsed={frame.collapsed}
            onCollapse={onCollapse}
          >
            <Menu theme="dark" mode={frame.mode} defaultSelectedKeys={['1']}>
              <SubMenu
                key="sub1"
                title={<span><Icon type="user" /><span className="nav-text">User</span></span>}
              >
                <Menu.Item key="1">Tom</Menu.Item>
                <Menu.Item key="2">Bill</Menu.Item>
                <Menu.Item key="3">Alex</Menu.Item>
              </SubMenu>
              <SubMenu
                key="sub2"
                title={<span><Icon type="team" /><span className="nav-text">Team</span></span>}
              >
                <Menu.Item key="4">Team 1</Menu.Item>
                <Menu.Item key="5">Team 2</Menu.Item>
              </SubMenu>
              <Menu.Item key="6">
                <span>
                  <Icon type="file" />
                  <span className="nav-text">File</span>
                </span>
              </Menu.Item>
            </Menu>
          </Sider>
          <Content>
            {children}
          </Content>
        </Layout>
        :
        <Content>
          {children}
        </Content>
      }
      <Footer className={frameStyle.footer} />
    </Layout>
  );
};

Frame.propTypes = {
  frame: PropTypes.object.isRequired,
  onCollapse: PropTypes.func.isRequired,
  showMenu: PropTypes.bool.isRequired,
};

function mapStateToProps({ frame }) {
  return {
    frame,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onCollapse: collapsed => dispatch({
      type: 'frame/set',
      payload: {
        collapsed,
        mode: collapsed ? 'vertical' : 'inline',
      },
    }),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Frame);
