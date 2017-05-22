import React from 'react';
import { Router, Route } from 'dva/router';
import IndexPage from './routes/IndexPage';
import Products from './routes/Products';
import LoginPage from './routes/LoginPage';
import RegistrationPage from './routes/RegistrationPage';
import UserRoleSettingPage from './routes/UserRoleSettingPage';

function RouterConfig({ history }) {
  return (
    <Router history={history}>
      <Route path="/" component={IndexPage} />
      <Route path="/products" component={Products} />
      <Route path="/login" component={LoginPage} />
      <Route path="/register" component={RegistrationPage} />
      <Route path="/userRole" component={UserRoleSettingPage} />
    </Router>
  );
}

export default RouterConfig;
