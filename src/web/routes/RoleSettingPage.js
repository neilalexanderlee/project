import React from 'react';
import { Row, Col, Button, Table, Icon, Input, Tree } from 'antd';
import { connect } from 'dva';

const { TreeNode } = Tree;

const RoleSettingPage = ({
  roleSetting: {
    data,
    showData,
    treeData,
    selectedRowKeys,
    deleteButtonLoading,
    saveButtonLoading,
    roleFilterDropdownVisible,
    roleFiltered,
    roleSearchText,
    tableLoading,
    treeLoading,
    currentSelectedRecord,
  },
  setShowData,
  getTreeData,
  changeRoleDropDown,
  setRoleSearchText,
  selectDatas,
  deleteDatas,
  saveDatas,
  }) => {
  const rowSelection = {
    selectedRowKeys,
    onChange: selectDatas,
    onSelect,
  };
  const columns = [{
    title: '角色',
    dataIndex: 'role',
    key: 'role',
    filterDropdown: (
      <div className="custom-filter-dropdown">
        <Input
          ref={(ele) => {
            if (ele) {
              ele.focus();
            }
          }}
          placeholder="角色"
          value={roleSearchText}
          onChange={onInputChange}
          onPressEnter={onRoleSearch}
        />
        <Button type="primary" onClick={onRoleSearch}>搜索</Button>
      </div>
    ),
    filterIcon: <Icon type="search" style={{ color: roleFiltered ? '#d73435' : '#108ee9' }} />,
    filterDropdownVisible: roleFilterDropdownVisible,
    onFilterDropdownVisibleChange: (visible) => {
      changeRoleDropDown({
        roleFilterDropdownVisible: visible,
      });
    },
  }, {
    title: '备注',
    dataIndex: 'remark',
    key: 'remark',
  }, {
    title: '创建时间',
    dataIndex: 'createTime',
    key: 'createTime',
  }];

  function onInputChange(e) {
    setRoleSearchText(e.target.value);
  }
  function onRoleSearch() {
    const reg = new RegExp(roleSearchText, 'gi');
    changeRoleDropDown({
      roleFilterDropdownVisible: false,
      roleFiltered: !!roleSearchText,
    });
    setShowData(data.map((record) => {
      const match = record.role.match(reg);
      if (!match) {
        return null;
      }
      return {
        ...record,
        role: (
          <span>
            { record.role.split(reg).map((text, i) => (
                i > 0 ? [<span className="highlight">{match[0]}</span>, text] : text
            ))}
          </span>
        ),
      };
    }).filter(record => !!record));
  }
  function onRowClick(record) {
    /* const index = selectedRowKeys.indexOf(record.id);
    if (index !== -1) {
      selectedRowKeys.splice(index, 1);
    } else {
      selectedRowKeys.push(record.id);
    }
    selectDatas(selectedRowKeys); */
    getTreeData(record);
  }
  function onSelect(record) {
    getTreeData(record);
  }
  function loop(paramData) {
    return paramData.map((item) => {
      if (item.children) {
        return <TreeNode title={item.name} key={item.id}>{loop(item.children)}</TreeNode>;
      }
      return <TreeNode title={item.name} key={item.id} isLeaf={item.parentId !== 0} />;
    });
  }
  return (
    <Row gutter={16}>
      <Col span={16}>
        <div style={{ marginBottom: 16 }}>
          <Row>
            <Col span={3}>
              <Button
                type="primary"
              >
                新增
              </Button>
            </Col>
            <Col span={3}>
              <Button
                type="primary"
                onClick={deleteDatas}
                loading={deleteButtonLoading}
              >
                删除
              </Button>
            </Col>
            <Col span={3}>
              <Button
                type="primary"
              >
                编辑
              </Button>
            </Col>
            <Col span={3}>
              <Button
                type="primary"
                onClick={saveDatas}
                loading={saveButtonLoading}
              >
                保存
              </Button>
            </Col>
          </Row>
        </div>
        <Table
          rowKey="id"
          rowSelection={rowSelection}
          onRowClick={onRowClick}
          columns={columns}
          dataSource={showData}
          size="middle"
          loading={tableLoading}
        />
      </Col>
      <Col span={8}>
        {treeLoading
          ?
            <div style={{ fontSize: 30, height: 20, lineHeight: '20px', padding: '200px 0', textAlign: 'center' }}>
              <Icon type="loading" />
            </div>
          :
            <div>
              <div style={{ margin: 16, fontSize: 16, background: '#fff', textAlign: 'center' }}>
                {currentSelectedRecord.role ? `${currentSelectedRecord.role}的菜单权限` : null}
              </div>
              <Tree
                checkable
                defaultExpandAll
              >
                {loop(treeData)}
              </Tree>
            </div>
        }
      </Col>
    </Row>);
};

function mapStateToProps({ roleSetting }) {
  return {
    roleSetting,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    setShowData: (data) => {
      dispatch({
        type: 'roleSetting/setShowData',
        payload: data,
      });
    },
    getTreeData: (record) => {
      dispatch({
        type: 'roleSetting/setCurrentSelectedRecord',
        payload: record,
      });
      dispatch({
        type: 'roleSetting/queryRoleResources',
        payload: record.id,
      });
    },
    changeRoleDropDown: (dropDown) => {
      dispatch({
        type: 'roleSetting/setRoleDropDown',
        payload: dropDown,
      });
    },
    setRoleSearchText: (text) => {
      dispatch({
        type: 'roleSetting/setRoleSearchText',
        payload: text,
      });
    },
    selectDatas: (selectedRowKeys) => {
      dispatch({
        type: 'roleSetting/select',
        payload: selectedRowKeys,
      });
    },
    saveDatas: () => {
      dispatch({
        type: 'roleSetting/setSaveLoading',
        payload: true,
      });

      dispatch({
        type: 'roleSetting/setSaveLoading',
        payload: false,
      });
    },
    deleteDatas: () => {
      dispatch({
        type: 'roleSetting/setDeleteLoading',
        payload: true,
      });

      dispatch({
        type: 'roleSetting/setDeleteLoading',
        payload: false,
      });
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(RoleSettingPage);
