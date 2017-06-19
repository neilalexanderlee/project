import { Form, Input, Tooltip, Icon, Select, Button } from 'antd';
import React, { PropTypes } from 'react';
import { connect } from 'dva';
import styles from './style/RegistrationForm.less';

const FormItem = Form.Item;
const Option = Select.Option;

const RegistrationForm = ({ registration,
  form: { getFieldDecorator, getFieldValue, validateFields },
  handleSubmit,
  handleConfirmBlur,
  }) => {
  const checkPassword = (rule, value, callback) => {
    if (value && value !== getFieldValue('password')) {
      callback('您两次输入的密码不一致');
    } else {
      callback();
    }
  };
  const checkConfirm = (rule, value, callback) => {
    if (value && registration.confirmDirty) {
      validateFields(['confirm'], { force: true });
    }
    callback();
  };
  const formItemLayout = {
    labelCol: {
      // <768px 响应式栅格
      xs: { span: 24 },
      // ≥768px 响应式栅格
      sm: { span: 8 },
    },
    wrapperCol: {
      // <768px 响应式栅格
      xs: { span: 24 },
      // ≥768px 响应式栅格
      sm: { span: 8 },
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
        offset: 8, // 栅格左侧的间隔格数，间隔内不可以有栅格
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
    <Form onSubmit={handleSubmit} className={styles.form}>
      <FormItem
        {...formItemLayout}
        label="邮箱"
        colon={false}
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
        colon={false}
        hasFeedback
      >
        {getFieldDecorator('password', {
          rules: [{
            required: true, message: '请输入您的密码',
          }, {
            validator: checkConfirm,
          }],
        })(
          <Input type="password" />
        )}
      </FormItem>
      <FormItem
        {...formItemLayout}
        label="确认密码"
        colon={false}
        hasFeedback
      >
        {getFieldDecorator('confirm', {
          rules: [{
            required: true, message: '请确认密码',
          }, {
            validator: checkPassword,
          }],
        })(
          <Input type="password" onBlur={handleConfirmBlur} />
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
        colon={false}
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
        colon={false}
      >
        {getFieldDecorator('phone', {
          rules: [{
            type: 'string', message: '请输入正确的手机号', pattern: /^1[34578]\d{9}$/,
          }, { required: true, message: '请输入您的手机号' }],
        })(
          <Input addonBefore={prefixSelector} style={{ width: '100%' }} />
        )}
      </FormItem>
      {/* <FormItem {...tailFormItemLayout} style={{ marginBottom: 8 }}>
        {getFieldDecorator('agreement', {
          valuePropName: 'checked',
        })(
          <Checkbox>我已阅读 <a href="/">承诺书</a></Checkbox>
        )}
      </FormItem> */}
      <FormItem {...tailFormItemLayout}>
        <Button type="primary" htmlType="submit">注册</Button>
      </FormItem>
    </Form>
  );
};

RegistrationForm.propTypes = {
  registration: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  handleConfirmBlur: PropTypes.func.isRequired,
};

function mapStateToProps({ registration }) {
  return {
    registration,
  };
}

function mapDispatchToProps(dispatch, { form: { validateFieldsAndScroll } }) {
  return {
    handleSubmit: (e) => {
      e.preventDefault();
      validateFieldsAndScroll((err, values) => {
        /* if (!values.agreement) {
          message.warning('请先阅读并同意承诺书!');
          return;
        } */
        if (!err) {
          console.log('Received values of form: ', values);
        }
      });
    },
    handleConfirmBlur: (e) => {
      const value = e.target.value;
      dispatch({
        type: 'registration/updateConfirmDirty',
        payload: !!value,
      });
    },
  };
}

export default Form.create()(connect(mapStateToProps, mapDispatchToProps)(RegistrationForm));
