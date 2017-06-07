import React from 'react';
import { Router, Route, IndexRoute } from 'dva/router';
import {
  MainFrame,
  MenuFrame,
  IndexPage,
  LoginPage,
  UserIndexPage,
  RegistrationPage,
  UserRoleSettingPage,
  AdminPage } from './routes';
import { UserIsAuthenticated, UserIsAdmin } from './utils/wrappers.js';

function RouterConfig({ history }) {
  return (
    <Router history={history}>
      <Route path="/" component={MainFrame} >
        <IndexRoute component={IndexPage} />
        <Route path="login" component={LoginPage} />
        <Route path="register" component={RegistrationPage} />
        <Route path="app" component={MenuFrame}>
          <IndexRoute component={UserIndexPage} />
          <Route path="userRole" component={UserIsAuthenticated(UserRoleSettingPage)} />
          <Route path="admin" component={UserIsAuthenticated(UserIsAdmin(AdminPage))} />
        </Route>
      </Route>
    </Router>
  );
}

export default RouterConfig;
