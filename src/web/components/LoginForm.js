import { Form, Icon, Input, Button, Checkbox } from 'antd';
import { Link } from 'dva/router';
import React from 'react';
import styles from './style/LoginForm.less';

const FormItem = Form.Item;

class LoginForm extends React.Component {
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  };
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.handleSubmit} className={styles.form}>
        <FormItem>
          {getFieldDecorator('userName', {
            rules: [{ required: true, message: '请输入账号!' }],
          })(
            <Input size="large" className={styles.input} addonBefore={<Icon type="user" style={{ fontSize: 16 }} />} placeholder="用户名/手机号/邮箱" />
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator('password', {
            rules: [{ required: true, message: '请输入密码!' }],
          })(
            <Input size="large" className={styles.input} addonBefore={<Icon type="lock" style={{ fontSize: 16 }} />} type="password" placeholder="密码" />
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator('remember', {
            valuePropName: 'checked',
            initialValue: false,
          })(
            <Checkbox>记住我</Checkbox>
          )}
          <Link to="/userRole" className={styles.forgot}>忘记密码?</Link>
          <Button size="large" type="primary" htmlType="submit" className={styles.button}>
            登录
          </Button>
          <Link to="/register">立即注册</Link>
        </FormItem>
      </Form>
    );
  }
}

const CustomizedLoginForm = Form.create()(LoginForm);

export default CustomizedLoginForm;
