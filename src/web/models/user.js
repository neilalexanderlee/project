
const initialState = JSON.parse(sessionStorage.getItem('user')) || {};

export default {
  namespace: 'user',
  state: initialState,
  effects: {
    *login({ payload: user }, { put }) {
      sessionStorage.setItem('user', JSON.stringify(user));
      yield put({
        type: 'update',
        payload: user,
      });
    },
    *logout() {
      sessionStorage.clear();
    },
  },
  reducers: {
    update(state, { payload: data }) {
      return { ...state, ...data };
    },
  },
};
