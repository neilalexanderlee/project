import { Form, Input, Row, Col } from 'antd';
import React from 'react';

const { Item: FormItem } = Form;

const TableForm = ({ form: { getFieldDecorator }, formData, columns }) => {
  const formItemLayout = {
    labelCol: { span: 5 },
    wrapperCol: { span: 19 },
  };
  function getFields() {
    const children = [];
    for (const [index, { key, title, editType }] of columns.entries()) {
      if (editType) {
        children.push(
          <Col span={12} key={index}>
            <FormItem {...formItemLayout} label={title}>
              {getFieldDecorator(key, {
                initialValue: formData[key],
              })(
                <Input type={editType} />
              )}
            </FormItem>
          </Col>
        );
      }
    }
    return children;
  }
  return (
    <Form>
      <Row>
        {getFields()}
      </Row>
    </Form>
  );
};

export default Form.create()(TableForm);
