
const initialState = {
  confirmDirty: false,
};

export default {
  namespace: 'registration',
  state: initialState,
  subscriptions: {
    init({ dispatch, history }) {
      history.listen(({ pathname }) => {
        if (pathname === '/register') {
          dispatch({ type: 'init' });
        }
      });
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
