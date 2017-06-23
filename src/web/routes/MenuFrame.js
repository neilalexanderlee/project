import React, { PropTypes } from 'react';
import { Layout, Menu } from 'antd';
import { connect } from 'dva';
import { Link } from 'dva/router';

const { Content, Sider } = Layout;
const SubMenu = Menu.SubMenu;

export function loopMenuData(paramData) {
  return paramData.map((item) => {
    if (item.children) {
      return (<SubMenu key={item.id} title={item.name}>
        {loopMenuData(item.children)}
      </SubMenu>);
    }
    return <Menu.Item key={item.id}><Link to={item.url}>{item.name}</Link></Menu.Item>;
  });
}

const MenuFrame = ({ menu: { mode, collapsed, menuData }, children, onCollapse }) => {
  return (
    <Layout>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={onCollapse}
        breakpoint="sm"
        width={200}
        collapsedWidth={100}
      >
        <Menu theme="dark" mode={mode}>
          {menuData}
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
      type: 'menu/update',
      payload: {
        collapsed,
        mode: collapsed ? 'vertical' : 'inline',
      },
    }),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(MenuFrame);
