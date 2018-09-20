import React from 'react';
import { connect } from 'dva';
import { Form, Input, Button, Alert, Divider } from 'antd';
import router from 'umi/router';
import { digitUppercase } from '@/utils/utils';
import styles from './style.less';

const formItemLayout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 18,
  },
};

@connect(({ form, loading }) => ({
  submitting: loading.effects['form/submitStepForm'],
  data: form.step,
}))
@Form.create()
class Step2 extends React.PureComponent {
  render() {
    const { form, data, dispatch, submitting } = this.props;
    const { getFieldDecorator, validateFields } = form;
    const onPrev = () => {
      router.push('/form/step-form/info');
    };
    const onValidateForm = e => {
      e.preventDefault();
      validateFields((err, values) => {
        if (!err) {
          dispatch({
            type: 'form/submitStepForm',
            payload: {
              ...data,
              ...values,
            },
          });
        }
      });
    };
    return (
      <Form layout="horizontal" className={styles.stepForm}>
        <Alert
          closable
          showIcon
          message="Sau khi xác nhận chuyển khoản, tiền sẽ được ghi có trực tiếp vào tài khoản của bên kia và không thể được trả lại."
          style={{ marginBottom: 24 }}
        />
        <Form.Item {...formItemLayout} className={styles.stepFormText} label="Tài khoản chuyển">
          {data.payAccount}
        </Form.Item>
        <Form.Item {...formItemLayout} className={styles.stepFormText} label="Tài khoản nhận">
          {data.receiverAccount}
        </Form.Item>
        <Form.Item {...formItemLayout} className={styles.stepFormText} label="Tên người nhận">
          {data.receiverName}
        </Form.Item>
        <Form.Item {...formItemLayout} className={styles.stepFormText} label="Số tiền">
          <span className={styles.money}>{data.amount}</span>
          {/* Need to use or update nzh to support VND/THB/USD */}
          {/* <span className={styles.uppercase}>nzh({digitUppercase(data.amount)})x</span> */}
        </Form.Item>
        <Divider style={{ margin: '24px 0' }} />
        <Form.Item {...formItemLayout} label="Mật khẩu thanh toán" required={false}>
          {getFieldDecorator('password', {
            initialValue: '123456',
            rules: [
              {
                required: true,
                message: 'Bạn cần nhập mật khẩu để có thể thanh toán',
              },
            ],
          })(<Input type="password" autoComplete="off" style={{ width: '80%' }} />)}
        </Form.Item>
        <Form.Item
          style={{ marginBottom: 8 }}
          wrapperCol={{
            xs: { span: 24, offset: 0 },
            sm: {
              span: formItemLayout.wrapperCol.span,
              offset: formItemLayout.labelCol.span,
            },
          }}
          label=""
        >
          <Button type="primary" onClick={onValidateForm} loading={submitting}>
            Xác nhận
          </Button>
          <Button onClick={onPrev} style={{ marginLeft: 8 }}>
            Quay lại
          </Button>
        </Form.Item>
      </Form>
    );
  }
}

export default Step2;
