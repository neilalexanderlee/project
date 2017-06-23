
export default {
  namespace: 'user',
  state: JSON.parse(sessionStorage.getItem('user')) || {},
  reducers: {
    login(state, { payload: user }) {
      sessionStorage.setItem('user', JSON.stringify(user));
      return user;
    },
    logout(state) {
      console.log(state);
      sessionStorage.clear();
      return {};
    },
  },
};
