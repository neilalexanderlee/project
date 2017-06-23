
const initialState = JSON.parse(sessionStorage.getItem('user')) || {};

export default {
  namespace: 'user',
  state: initialState,
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
