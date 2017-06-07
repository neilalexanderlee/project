import React, { PropTypes } from 'react';
import { Layout, Card } from 'antd';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import LoginForm from '../components/LoginForm';
import styles from './style/LoginPage.less';

const { Content } = Layout;
const { routerActions } = routerRedux;

class LoginPage extends React.Component {
  static propTypes = {
    isAuthenticated: PropTypes.bool.isRequired,
    redirect: PropTypes.string.isRequired,
  };

  componentWillMount() {
    const { isAuthenticated, replace, redirect } = this.props;
    if (isAuthenticated) {
      replace(redirect);
    }
  }

  componentWillReceiveProps(nextProps) {
    const { isAuthenticated, replace, redirect } = nextProps;
    const { isAuthenticated: wasAuthenticated } = this.props;

    if (!wasAuthenticated && isAuthenticated) {
      replace(redirect);
    }
  }

  render() {
    return (
      <Content>
        <Card className={styles.card} bodyStyle={{ padding: '64px' }}>
          <LoginForm />
        </Card>
      </Content>
    );
  }
}

function mapStateToProps({ user }, ownProps) {
  const isAuthenticated = !!user.userName || false;
  const redirect = ownProps.location.query.redirect || '/';
  return {
    isAuthenticated,
    redirect,
  };
}

const mapDispatchToProps = {
  replace: routerActions.replace,
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
