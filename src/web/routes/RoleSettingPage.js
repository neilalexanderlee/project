import React from 'react';
import { Layout, Row, Col, Button, Table } from 'antd';
import { connect } from 'dva';

const { Content } = Layout;

const RoleSettingPage = ({
  roleSetting: { selectedRowKeys, saveButtonLoading },
  selectDatas, saveDatas }) => {
  const columns = [{
    title: 'Name',
    dataIndex: 'name',
  }, {
    title: 'Age',
    dataIndex: 'age',
  }, {
    title: 'Address',
    dataIndex: 'address',
  }];

  const data = [];
  for (let i = 0; i < 46; i += 1) {
    data.push({
      key: i,
      name: `Edward King ${i}`,
      age: 32,
      address: `London, Park Lane no. ${i}`,
    });
  }
  const rowSelection = {
    selectedRowKeys,
    onChange: selectDatas,
  };
  return (
    <Content>
      <Row gutter="16">
        <Col sm="16">
          <div style={{ marginBottom: 16 }}>
            <Button
              type="primary"
              onClick={saveDatas}
              loading={saveButtonLoading}
            >
              新增
            </Button>
          </div>
          <Table rowSelection={rowSelection} columns={columns} dataSource={data} />
        </Col>
        <Col sm="8">
          <div />
        </Col>
      </Row>
    </Content>);
};

function mapStateToProps({ roleSetting }) {
  return {
    roleSetting,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    selectDatas: selectedRowKeys =>
      dispatch({
        type: 'roleSetting/select',
        payload: selectedRowKeys,
      }),
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
