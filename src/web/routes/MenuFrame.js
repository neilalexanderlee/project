import React, { PropTypes } from 'react';
import { Layout, Menu, Icon } from 'antd';
import { connect } from 'dva';

const { Content, Sider } = Layout;
const SubMenu = Menu.SubMenu;

const MenuFrame = ({ menu, children, onCollapse }) => {
  return (
    <Layout>
      <Sider
        collapsible
        collapsed={menu.collapsed}
        onCollapse={onCollapse}
      >
        <Menu theme="dark" mode={menu.mode} defaultSelectedKeys={['1']}>
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
  );
};

MenuFrame.propTypes = {
  menu: PropTypes.object.isRequired,
  onCollapse: PropTypes.func.isRequired,
};

function mapStateToProps({ menu }) {
  return {
    menu,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onCollapse: collapsed => dispatch({
      type: 'menu/set',
      payload: {
        collapsed,
        mode: collapsed ? 'vertical' : 'inline',
      },
    }),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(MenuFrame);
