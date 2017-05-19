export default {
  namespace: 'registration',
  state: {
    confirmDirty: false,
  },
  reducers: {
    update(state, { payload: value }) {
      const confirmDirty = state.confirmDirty || value;
      return { ...state, confirmDirty };
    },
  },
};
