import { queryRole, queryRoleResources } from '../services/roleSetting';

export default {
  namespace: 'roleSetting',
  state: {
    data: [],
    showData: [],
    treeData: [],
    selectedRowKeys: [],  // Check here to configure the default column
    deleteButtonLoading: false,
    saveButtonLoading: false,
    roleFilterDropdownVisible: false,
    roleFiltered: false,
    roleSearchText: '',
    tableLoading: false,
    treeLoading: false,
    currentSelectedRecord: {},
  },
  subscriptions: {
    initRoleData({ dispatch, history }) {
      history.listen(({ pathname }) => {
        if (pathname === '/app/role') {
          dispatch({ type: 'queryRole' });
        }
      });
    },
  },
  effects: {
    *queryRole({ payload: params }, { put, call }) {
      yield put({ type: 'setTableLoading', payload: true });
      const { data: { dataList } } = yield call(queryRole);
      yield put({ type: 'setData', payload: dataList });
      yield put({ type: 'setShowData', payload: dataList });
      yield put({ type: 'setTableLoading', payload: false });
    },
    *queryRoleResources({ payload: roleId }, { put, call }) {
      yield put({ type: 'setTreeLoading', payload: true });
      const { data: { dataList } } = yield call(queryRoleResources, { roleId });
      yield put({ type: 'setTreeData', payload: dataList });
      yield put({ type: 'setTreeLoading', payload: false });
    },
  },
  reducers: {
    setData(state, { payload: data }) {
      return { ...state, data };
    },
    setShowData(state, { payload: showData }) {
      return { ...state, showData };
    },
    setTreeData(state, { payload: treeData }) {
      return { ...state, treeData };
    },
    select(state, { payload: selectedRowKeys }) {
      return { ...state, selectedRowKeys };
    },
    setTreeLoading(state, { payload: treeLoading }) {
      return { ...state, treeLoading };
    },
    setTableLoading(state, { payload: tableLoading }) {
      return { ...state, tableLoading };
    },
    setDeleteLoading(state, { payload: deleteButtonLoading }) {
      return { ...state, deleteButtonLoading };
    },
    setSaveLoading(state, { payload: saveButtonLoading }) {
      return { ...state, saveButtonLoading };
    },
    setRoleDropDown(state, { payload: dropDown }) {
      return { ...state, ...dropDown };
    },
    setRoleSearchText(state, { payload: roleSearchText }) {
      return { ...state, roleSearchText };
    },
    setCurrentSelectedRecord(state, { payload: currentSelectedRecord }) {
      return { ...state, currentSelectedRecord };
    },
  },
};
