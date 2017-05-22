import { Form, Input, Tooltip, Icon, Select, Checkbox, Button, message } from 'antd';
import React from 'react';
import { connect } from 'dva';

const FormItem = Form.Item;
const Option = Select.Option;

class RegistrationForm extends React.Component {
  handleSubmit = (e) => {
    e.preventDefault();
    if (!this.props.form.getFieldValue('agreement')) {
      message.warning('请先阅读并同意承诺书!');
      return;
    }
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  };
  handleConfirmBlur = (e) => {
    const value = e.target.value;
    this.props.dispatch({
      type: 'registration/updateConfirmDirty',
      payload: !!value,
    });
  };
  checkPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && value !== form.getFieldValue('password')) {
      callback('您两次输入的密码不一致');
    } else {
      callback();
    }
  };
  checkConfirm = (rule, value, callback) => {
    const form = this.props.form;
    if (value && this.props.registration.confirmDirty) {
      form.validateFields(['confirm'], { force: true });
    }
    callback();
  };

  render() {
    const { getFieldDecorator } = this.props.form;

    const formItemLayout = {
      labelCol: {
        // <768px 响应式栅格
        xs: { span: 24 },
        // ≥768px 响应式栅格
        sm: { span: 6 },
      },
      wrapperCol: {
        // <768px 响应式栅格
        xs: { span: 24 },
        // ≥768px 响应式栅格
        sm: { span: 14 },
      },
    };
    const tailFormItemLayout = {
      wrapperCol: {
        // <768px 响应式栅格
        xs: {
          span: 24,
          offset: 0, // 栅格左侧的间隔格数，间隔内不可以有栅格
        },
        // ≥768px 响应式栅格
        sm: {
          span: 14,
          offset: 6, // 栅格左侧的间隔格数，间隔内不可以有栅格
        },
      },
    };
    const prefixSelector = getFieldDecorator('prefix', {
      initialValue: '86',
    })(
      <Select className="icp-selector" style={{ width: 60 }}>
        <Option value="86">+86</Option>
      </Select>
    );

    return (
      <Form onSubmit={this.handleSubmit}>
        <FormItem
          {...formItemLayout}
          label="邮箱"
          hasFeedback
        >
          {getFieldDecorator('email', {
            rules: [{
              type: 'email', message: '邮箱格式不正确',
            }, {
              required: true, message: '请输入您的邮箱地址',
            }],
          })(
            <Input />
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="密码"
          hasFeedback
        >
          {getFieldDecorator('password', {
            rules: [{
              required: true, message: '请输入您的密码',
            }, {
              validator: this.checkConfirm,
            }],
          })(
            <Input type="password" />
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="确认密码"
          hasFeedback
        >
          {getFieldDecorator('confirm', {
            rules: [{
              required: true, message: '请确认密码',
            }, {
              validator: this.checkPassword,
            }],
          })(
            <Input type="password" onBlur={this.handleConfirmBlur} />
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label={(
            <span>
              昵称&nbsp;
              <Tooltip title="您希望在网页上显示的姓名">
                <Icon type="question-circle-o" />
              </Tooltip>
            </span>
          )}
          hasFeedback
        >
          {getFieldDecorator('nickname', {
            rules: [{ required: true, message: '请输入您的昵称', whitespace: true }],
          })(
            <Input />
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="手机号"
        >
          {getFieldDecorator('phone', {
            rules: [{
              type: 'string', message: '请输入正确的手机号', pattern: /^1[34578]\d{9}$/,
            }, { required: true, message: '请输入您的手机号' }],
          })(
            <Input addonBefore={prefixSelector} />
          )}
        </FormItem>
        <FormItem {...tailFormItemLayout} style={{ marginBottom: 8 }}>
          {getFieldDecorator('agreement', {
            valuePropName: 'checked',
          })(
            <Checkbox>我已阅读 <a href="">承诺书</a></Checkbox>
          )}
        </FormItem>
        <FormItem {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit" size="large">注册</Button>
        </FormItem>
      </Form>
    );
  }
}

const CustomizedRegistrationForm = Form.create()(RegistrationForm);

export default connect(({ registration }) => ({
  registration,
}))(CustomizedRegistrationForm);
