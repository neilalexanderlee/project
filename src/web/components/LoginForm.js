import { Form, Icon, Input, Button, Checkbox } from 'antd';
import { Link } from 'dva/router';
import { connect } from 'dva';
import React, { PropTypes } from 'react';
import styles from './style/LoginForm.less';

const FormItem = Form.Item;

const LoginForm = ({ form: { getFieldDecorator }, handleSubmit }) => {
  return (
    <Form onSubmit={handleSubmit} className={styles.form}>
      <FormItem>
        {getFieldDecorator('userName', {
          initialValue: localStorage.getItem('userName'), // 使用localStorage保存用户名
          rules: [{ required: true, message: '请输入账号!' }],
        })(
          <Input className={styles.input} style={{ width: '100%' }} addonBefore={<Icon type="user" style={{ fontSize: 16 }} />} placeholder="用户名/手机号/邮箱" />
        )}
      </FormItem>
      <FormItem>
        {getFieldDecorator('password', {
          rules: [{ required: true, message: '请输入密码!' }],
        })(
          <Input className={styles.input} style={{ width: '100%' }} addonBefore={<Icon type="lock" style={{ fontSize: 16 }} />} type="password" placeholder="密码" />
        )}
      </FormItem>
      <FormItem>
        {getFieldDecorator('remember', {
          valuePropName: 'checked',
          initialValue: !!localStorage.getItem('userName'),
        })(
          <Checkbox>记住我</Checkbox>
        )}
        {/* <Link to="/" className={styles.forgot}>忘记密码?</Link> */}
        <Button type="primary" htmlType="submit" className={styles.button}>
          登录
        </Button>
        <Link to="/register">立即注册</Link>
      </FormItem>
    </Form>
  );
};

LoginForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
};

function mapDispatchToProps(dispatch, { form: { validateFields } }) {
  return {
    handleSubmit: (e) => {
      e.preventDefault();
      validateFields((err, values) => {
        if (!err) {
          console.log('Received values of form: ', values);
          if (values.remember) {
            localStorage.setItem('userName', values.userName);
          } else {
            localStorage.removeItem('userName');
          }
          dispatch({
            type: 'user/login',
            payload: values,
          });
        }
      });
    },
  };
}

export default Form.create()(connect(false, mapDispatchToProps)(LoginForm));
