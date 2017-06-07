export default {
  namespace: 'user',
  state: {},
  reducers: {
    login(state, { payload: user }) {
      return user;
    },
    logout(state) {
      console.log(state);
      return {};
    },
  },
};
