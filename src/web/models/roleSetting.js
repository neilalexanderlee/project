import { queryRole, queryRoleResources } from '../services/roleSetting';
import { loopTreeData } from '../routes/RoleSettingPage';

const initialState = {
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
  checkedTreeKeys: [],
};

export default {
  namespace: 'roleSetting',
  state: initialState,
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
      yield put({ type: 'init' });
      yield put({ type: 'update', payload: { tableLoading: true } });
      const { data: { dataList } } = yield call(queryRole);
      yield put({
        type: 'update',
        payload: {
          data: dataList,
          showData: dataList,
          tableLoading: false,
        } });
    },
    *queryRoleResources({ payload: param }, { put, call }) {
      yield put({ type: 'update', payload: { treeLoading: true } });
      const checkedTreeKeys = [];
      const { data: { dataList } } = yield call(queryRoleResources, param);
      yield put({
        type: 'update',
        payload: {
          treeData: loopTreeData(dataList, checkedTreeKeys),
          checkedTreeKeys,
          treeLoading: false,
        } });
    },
  },
  reducers: {
    init() {
      return initialState;
    },
    update(state, { payload: data }) {
      return { ...state, ...data };
    },
  },
};
