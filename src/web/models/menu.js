import { queryMenu } from '../services/menu';
import { loopMenuData } from '../routes/MenuFrame';

const initialState = {
  collapsed: false,
  mode: 'inline',
  menuData: sessionStorage.getItem('menu') ? loopMenuData(JSON.parse(sessionStorage.getItem('menu'))) : [],
};

export default {
  namespace: 'menu',
  state: initialState,
  effects: {
    *queryMenu({ payload: userId }, { put, call }) {
      yield put({ type: 'init' });
      const { data: { dataList } } = yield call(queryMenu, { userId });
      sessionStorage.setItem('menu', JSON.stringify(dataList));
      const menuData = loopMenuData(dataList);
      yield put({ type: 'update', payload: { menuData } });
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
