export default {
  namespace: 'menu',
  state: {
    collapsed: false,
    mode: 'inline',
  },
  reducers: {
    set(state, { payload: data }) {
      return { ...state, ...data };
    },
  },
};
