import React, { PureComponent } from 'react';
import { connect } from 'dva';
import {
  Form,
  Input,
  DatePicker,
  Select,
  Button,
  Card,
  InputNumber,
  Radio,
  Icon,
  Tooltip,
} from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import styles from './style.less';

const FormItem = Form.Item;
const { Option } = Select;
const { RangePicker } = DatePicker;
const { TextArea } = Input;

@connect(({ loading }) => ({
  submitting: loading.effects['form/submitRegularForm'],
}))
@Form.create()
class BasicForms extends PureComponent {
  handleSubmit = e => {
    const { dispatch, form } = this.props;
    e.preventDefault();
    form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        dispatch({
          type: 'form/submitRegularForm',
          payload: values,
        });
      }
    });
  };

  render() {
    const { submitting } = this.props;
    const {
      form: { getFieldDecorator, getFieldValue },
    } = this.props;

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 7 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 12 },
        md: { span: 10 },
      },
    };

    const submitFormLayout = {
      wrapperCol: {
        xs: { span: 24, offset: 0 },
        sm: { span: 10, offset: 7 },
      },
    };

    return (
      <PageHeaderWrapper
        title="Biểu mẫu cơ bản"
        content="Các trang biểu mẫu được sử dụng để thu thập hoặc xác minh thông tin cho người dùng và các biểu mẫu cơ bản là phổ biến trong các trường hợp biểu mẫu nơi có ít mục dữ liệu hơn."
      >
        <Card bordered={false}>
          <Form onSubmit={this.handleSubmit} hideRequiredMark style={{ marginTop: 8 }}>
            <FormItem {...formItemLayout} label="Tiêu đề">
              {getFieldDecorator('title', {
                rules: [
                  {
                    required: true,
                    message: 'Vui lòng nhập tiêu đề',
                  },
                ],
              })(<Input placeholder="Nhập tên cho mục tiêu" />)}
            </FormItem>
            <FormItem {...formItemLayout} label="Ngày bắt đầu và kết thúc">
              {getFieldDecorator('date', {
                rules: [
                  {
                    required: true,
                    message: 'Vui lòng chọn ngày bắt đầu và kết thúc',
                  },
                ],
              })(<RangePicker style={{ width: '100%' }} placeholder={['Ngày bắt đầu', 'Ngày kết thúc']} />)}
            </FormItem>
            <FormItem {...formItemLayout} label="Mô tả mục tiêu">
              {getFieldDecorator('goal', {
                rules: [
                  {
                    required: true,
                    message: 'Vui lòng nhập nội dung mô tả mục tiêu',
                  },
                ],
              })(
                <TextArea
                  style={{ minHeight: 32 }}
                  placeholder="Vui lòng nhập mục tiêu công việc của bạn"
                  rows={4}
                />
              )}
            </FormItem>
            <FormItem {...formItemLayout} label="Số liệu">
              {getFieldDecorator('standard', {
                rules: [
                  {
                    required: true,
                    message: 'Vui lòng cung cấp thông tin số liệu',
                  },
                ],
              })(<TextArea style={{ minHeight: 32 }} placeholder="Vui lòng nhập số liệu" rows={4} />)}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label={
                <span>
                  Khách hàng
                  <em className={styles.optional}>
                    (Tùy chọn)
                    <Tooltip title="Đối tượng dịch vụ đích">
                      <Icon type="info-circle-o" style={{ marginRight: 4 }} />
                    </Tooltip>
                  </em>
                </span>
              }
            >
              {getFieldDecorator('client')(
                <Input placeholder="Vui lòng mô tả khách hàng của bạn, khách nội bộ vui lòng sử dụng @Tên khách" />
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label={
                <span>
                  Mời bình luận
                  <em className={styles.optional}>(Tùy chọn)</em>
                </span>
              }
            >
              {getFieldDecorator('invites')(
                <Input placeholder="Vui lòng nhập người bạn muốn mời, sử dụng @Tên người, tối đã 5 người" />
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label={
                <span>
                  Tỷ lệ
                  <em className={styles.optional}>(Tùy chọn)</em>
                </span>
              }
            >
              {getFieldDecorator('weight')(<InputNumber placeholder="Vui lòng nhập" min={0} max={100} />)}
              <span className="ant-form-text">%</span>
            </FormItem>
            <FormItem {...formItemLayout} label="Mục tiêu chia sẻ" help="Khách hàng và khách mời được chia sẻ mặc định">
              <div>
                {getFieldDecorator('public', {
                  initialValue: '1',
                })(
                  <Radio.Group>
                    <Radio value="1">Công khai</Radio>
                    <Radio value="2">Chia sẻ một phần</Radio>
                    <Radio value="3">Không chia sẻ</Radio>
                  </Radio.Group>
                )}
                <FormItem style={{ marginBottom: 0 }}>
                  {getFieldDecorator('publicUsers')(
                    <Select
                      mode="multiple"
                      placeholder="Công khai"
                      style={{
                        margin: '8px 0',
                        display: getFieldValue('public') === '2' ? 'block' : 'none',
                      }}
                    >
                      <Option value="1">Colleague A</Option>
                      <Option value="2">Colleague B</Option>
                      <Option value="3">Colleague C</Option>
                    </Select>
                  )}
                </FormItem>
              </div>
            </FormItem>
            <FormItem {...submitFormLayout} style={{ marginTop: 32 }}>
              <Button type="primary" htmlType="submit" loading={submitting}>
                Đăng
              </Button>
              <Button style={{ marginLeft: 8 }}>Lưu lại</Button>
            </FormItem>
          </Form>
        </Card>
      </PageHeaderWrapper>
    );
  }
}

export default BasicForms;
