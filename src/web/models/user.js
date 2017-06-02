export default {
  namespace: 'user',
  state: {},
  reducers: {
    login(state, { payload: user }) {
      return user;
    },
    logout(state, { payload: user }) {
      console.log(user);
      return {};
    },
  },
};
