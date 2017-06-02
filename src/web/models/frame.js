export default {
  namespace: 'frame',
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