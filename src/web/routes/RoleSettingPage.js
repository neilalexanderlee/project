import React from 'react';
import { Row, Col, Button, Table, Icon, Input, Tree } from 'antd';
import { connect } from 'dva';
import BasicModal from '../components/BasicModal';
import TableForm from '../components/TableForm';
import EditableCell from '../components/EditableCell';

const { TreeNode } = Tree;

export function loopTreeData(paramData, checkedTreeKeys) {
  return paramData.map((item) => {
    if (item.granted === 'true') {
      checkedTreeKeys.push(item.id);
    }
    if (item.children) {
      return (<TreeNode title={item.name} key={item.id}>
        {loopTreeData(item.children, checkedTreeKeys)}
      </TreeNode>);
    }
    return <TreeNode title={item.name} key={item.id} isLeaf={item.parentId !== '0'} />;
  });
}

const RoleSettingPage = ({
  roleSetting: {
    data,
    showData,
    treeData,
    selectedRowKeys,
    roleFilterDropdownVisible,
    roleFiltered,
    roleSearchText,
    tableLoading,
    treeLoading,
    currentSelectedRecord,
    checkedTreeKeys,
    modalTitle,
    modalVisitable,
    modalData,
  },
  updateState,
  getTreeData,
  handleSelectChange,
}) => {
  let form;
  const rowSelection = {
    selectedRowKeys,
    onChange: handleSelectChange,
    onSelect,
  };
  const columns = [{
    title: '角色',
    width: '25%',
    dataIndex: 'role',
    key: 'role',
    editType: 'text',
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
      updateState({
        roleFilterDropdownVisible: visible,
      });
    },
    render: (text, record) => (
      <EditableCell
        value={text}
        editType="text"
        onChange={onCellChange(record, 'role')}
      />
     ),
  }, {
    title: '备注',
    width: '50%',
    dataIndex: 'remark',
    key: 'remark',
    editType: 'textarea',
    render: (text, record) => (
      <EditableCell
        value={text}
        editType="textarea"
        onChange={onCellChange(record, 'remark')}
      />
    ),
  }, {
    title: '创建时间',
    width: '25%',
    dataIndex: 'createTime',
    key: 'createTime',
  }];
  function onCellChange(record, key) {
    return (value) => {
      // 使用ES6的属性名表达式,使用大括号定义对象时,把属性的表达式放在方括号内
      console.log('接收到参数', { ...record, ...{ [key]: value } });
    };
  }
  function onInputChange(e) {
    updateState({ roleSearchText: e.target.value });
  }
  function onRoleSearch() {
    const reg = new RegExp(roleSearchText, 'gi');
    updateState({
      roleFilterDropdownVisible: false,
      roleFiltered: !!roleSearchText,
    });
    updateState({ showData: data.map((record) => {
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
    }).filter(record => !!record) });
  }
  function onRowClick(record) {
    const index = selectedRowKeys.indexOf(record.id);
    const stateData = {};
    if (index !== -1) {
      selectedRowKeys.splice(index, 1);
    } else {
      selectedRowKeys.push(record.id);
      stateData.currentSelectedRecord = record;
      getTreeData(record);
    }
    updateState({ ...stateData, selectedRowKeys });
  }
  function onSelect(record, selected) {
    if (selected) {
      updateState({ currentSelectedRecord: record });
      getTreeData(record);
    }
  }
  function handleTableChange() {
    updateState({
      selectedRowKeys: [],
      currentSelectedRecord: {},
      treeData: [],
    });
  }
  function handleTreeCheck(checkedKeys) {
    updateState({ checkedTreeKeys: checkedKeys });
  }
  function handleModalOk() {
    form.validateFields((err, values) => {
      if (err) {
        return;
      }

      console.log('Received values of form: ', values);

      updateState({
        modalVisitable: false,
      });
    });
  }
  function handleModalCancel() {
    form.resetFields();
    updateState({
      modalVisitable: false,
    });
  }
  function saveFormRef(e) {
    form = e;
  }
  return (
    <Row gutter={16}>
      <Col span={16}>
        <div style={{ marginBottom: 16 }}>
          <Row type="flex" justify="end">
            <Col sm={3} xs={6}>
              <Button
                type="primary"
                className="fr"
                onClick={() => {
                  updateState({
                    modalTitle: '新增',
                    modalVisitable: true,
                    modalData: {},
                  });
                }}
              >
                新增
              </Button>
            </Col>
            <Col sm={3} xs={6}>
              <Button
                type="primary"
                className="fr"
              >
                删除
              </Button>
            </Col>
            <Col sm={3} xs={6}>
              <Button
                type="primary"
                className="fr"
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
          onChange={handleTableChange}
        />
        <BasicModal
          title={modalTitle}
          visible={modalVisitable}
          onOk={handleModalOk}
          onCancel={handleModalCancel}
          okText="保存"
        >
          <TableForm formData={modalData} columns={columns} ref={saveFormRef} />
        </BasicModal>
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
                checkStrictly
                defaultExpandAll
                onCheck={handleTreeCheck}
                checkedKeys={checkedTreeKeys}
              >
                {treeData}
              </Tree>
            </div>
        }
      </Col>
    </Row>
  );
};

function mapStateToProps({ roleSetting }) {
  return {
    roleSetting,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    updateState: (data) => {
      dispatch({
        type: 'roleSetting/update',
        payload: data,
      });
    },
    getTreeData: (record) => {
      dispatch({
        type: 'roleSetting/queryRoleResources',
        payload: { roleId: record.id },
      });
    },
    handleSelectChange: (selectedRowKeys) => {
      dispatch({
        type: 'roleSetting/update',
        payload: { selectedRowKeys },
      });
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(RoleSettingPage);
