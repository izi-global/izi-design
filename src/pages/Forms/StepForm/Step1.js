import React, { Fragment } from 'react';
import { connect } from 'dva';
import { Form, Input, Button, Select, Divider } from 'antd';
import router from 'umi/router';
import styles from './style.less';

const { Option } = Select;

const formItemLayout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};

@connect(({ form }) => ({
  data: form.step,
}))
@Form.create()
class Step1 extends React.PureComponent {
  render() {
    const { form, dispatch, data } = this.props;
    const { getFieldDecorator, validateFields } = form;
    const onValidateForm = () => {
      validateFields((err, values) => {
        if (!err) {
          dispatch({
            type: 'form/saveStepFormData',
            payload: values,
          });
          router.push('/form/step-form/confirm');
        }
      });
    };
    return (
      <Fragment>
        <Form layout="horizontal" className={styles.stepForm} hideRequiredMark>
          <Form.Item {...formItemLayout} label="Tài khoản thanh toán">
            {getFieldDecorator('payAccount', {
              initialValue: data.payAccount,
              rules: [{ required: true, message: 'Vui lòng chọn tài khoản thanh toán' }],
            })(
              <Select placeholder="test@example.com">
                <Option value="ant-design@alipay.com">ant-design@alipay.com</Option>
              </Select>
            )}
          </Form.Item>
          <Form.Item {...formItemLayout} label="Tài khoản nhận tiền">
            <Input.Group compact>
              <Select defaultValue="nganluong" style={{ width: 100 }}>
                <Option value="nganluong">Ngân Lượng</Option>
                <Option value="tpb">TPB</Option>
              </Select>
              {getFieldDecorator('receiverAccount', {
                initialValue: data.receiverAccount,
                rules: [
                  { required: true, message: 'Vui lòng nhập thông tin tài khoản nhận' },
                  { type: 'email', message: 'Tên tài khoản phải là email' },
                ],
              })(<Input style={{ width: 'calc(100% - 100px)' }} placeholder="test@example.com" />)}
            </Input.Group>
          </Form.Item>
          <Form.Item {...formItemLayout} label="Tên người nhận">
            {getFieldDecorator('receiverName', {
              initialValue: data.receiverName,
              rules: [{ required: true, message: 'Vui lòng nhập tên người nhận' }],
            })(<Input placeholder="Tên người nhận" />)}
          </Form.Item>
          <Form.Item {...formItemLayout} label="Số tiền chuyển">
            {getFieldDecorator('amount', {
              initialValue: data.amount,
              rules: [
                { required: true, message: 'Vui lòng nhập số tiền bạn muốn chuyển' },
                {
                  pattern: /^(\d+)((?:\.\d+)?)$/,
                  message: 'Vui lòng nhập số tiền chuyển chính xác',
                },
              ],
            })(<Input prefix="‎₫" placeholder="Nhập số tiền bạn muốn chuyển" />)}
          </Form.Item>
          <Form.Item
            wrapperCol={{
              xs: { span: 24, offset: 0 },
              sm: {
                span: formItemLayout.wrapperCol.span,
                offset: formItemLayout.labelCol.span,
              },
            }}
            label=""
          >
            <Button type="primary" onClick={onValidateForm}>
              Tiếp tục
            </Button>
          </Form.Item>
        </Form>
        <Divider style={{ margin: '40px 0 24px' }} />
        <div className={styles.desc}>
          <h3>Mô tả</h3>
          <h4>Chuyển vào tài khoản Ngân Lượng</h4>
          <p>
            Nếu bạn cần, dưới đây là một số mô tả sự cố thường gặp về sản phẩm. Nếu bạn cần, dưới đây là một số mô tả sự cố thường gặp về sản phẩm. Nếu bạn cần, dưới đây là một số mô tả sự cố thường gặp về sản phẩm.
          </p>
          <h4>Chuyển qua thẻ ngân hàng</h4>
          <p>
            Nếu bạn cần, dưới đây là một số mô tả sự cố thường gặp về sản phẩm. Nếu bạn cần, dưới đây là một số mô tả sự cố thường gặp về sản phẩm. Nếu bạn cần, dưới đây là một số mô tả sự cố thường gặp về sản phẩm.
          </p>
        </div>
      </Fragment>
    );
  }
}

export default Step1;
