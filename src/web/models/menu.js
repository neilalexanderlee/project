import { queryMenu } from '../services/menu';
import { loop } from '../routes/MenuFrame';

export default {
  namespace: 'menu',
  state: {
    collapsed: false,
    mode: 'inline',
    menuData: sessionStorage.getItem('menu') ? loop(JSON.parse(sessionStorage.getItem('menu'))) : [],
  },
  effects: {
    *queryMenu({ payload: userId }, { put, call }) {
      const { data: { dataList } } = yield call(queryMenu, { userId });
      sessionStorage.setItem('menu', JSON.stringify(dataList));
      const menuData = loop(dataList);
      yield put({ type: 'setMenuData', payload: menuData });
    },
  },
  reducers: {
    set(state, { payload: data }) {
      return { ...state, ...data };
    },
    setMenuData(state, { payload: menuData }) {
      return { ...state, menuData };
    },
  },
};
