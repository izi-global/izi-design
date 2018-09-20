import React, { PureComponent } from 'react';
import {
  Card,
  Button,
  Form,
  Icon,
  Col,
  Row,
  DatePicker,
  TimePicker,
  Input,
  Select,
  Popover,
} from 'antd';
import { connect } from 'dva';
import FooterToolbar from '@/components/FooterToolbar';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import TableForm from './TableForm';
import styles from './style.less';

const { Option } = Select;
const { RangePicker } = DatePicker;

const fieldLabels = {
  name: 'Tên kho',
  url: 'Tên miền',
  owner: 'Quản kho',
  approver: 'Người duyệt',
  dateRange: 'Thời gian hiệu lực',
  type: 'Loại kho',
  name2: 'Tên công việc',
  url2: 'Mô tả công việc',
  owner2: 'Quản lý',
  approver2: 'Chịu trách nhiệm',
  dateRange2: 'Thời gian hiệu lực',
  type2: 'Loại công việc',
};

const tableData = [
  {
    key: '1',
    workId: '00001',
    name: 'John Brown',
    department: 'New York No. 1 Lake Park',
  },
  {
    key: '2',
    workId: '00002',
    name: 'Jim Green',
    department: 'London No. 1 Lake Park',
  },
  {
    key: '3',
    workId: '00003',
    name: 'Joe Black',
    department: 'Sidney No. 1 Lake Park',
  },
];

@connect(({ loading }) => ({
  submitting: loading.effects['form/submitAdvancedForm'],
}))
@Form.create()
class AdvancedForm extends PureComponent {
  state = {
    width: '100%',
  };

  componentDidMount() {
    window.addEventListener('resize', this.resizeFooterToolbar, { passive: true });
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.resizeFooterToolbar);
  }

  getErrorInfo = () => {
    const {
      form: { getFieldsError },
    } = this.props;
    const errors = getFieldsError();
    const errorCount = Object.keys(errors).filter(key => errors[key]).length;
    if (!errors || errorCount === 0) {
      return null;
    }
    const scrollToField = fieldKey => {
      const labelNode = document.querySelector(`label[for="${fieldKey}"]`);
      if (labelNode) {
        labelNode.scrollIntoView(true);
      }
    };
    const errorList = Object.keys(errors).map(key => {
      if (!errors[key]) {
        return null;
      }
      return (
        <li key={key} className={styles.errorListItem} onClick={() => scrollToField(key)}>
          <Icon type="cross-circle-o" className={styles.errorIcon} />
          <div className={styles.errorMessage}>{errors[key][0]}</div>
          <div className={styles.errorField}>{fieldLabels[key]}</div>
        </li>
      );
    });
    return (
      <span className={styles.errorIcon}>
        <Popover
          title="Biểu mẫu xác thực thông tin"
          content={errorList}
          overlayClassName={styles.errorPopover}
          trigger="click"
          getPopupContainer={trigger => trigger.parentNode}
        >
          <Icon type="exclamation-circle" />
        </Popover>
        {errorCount}
      </span>
    );
  };

  resizeFooterToolbar = () => {
    requestAnimationFrame(() => {
      const sider = document.querySelectorAll('.ant-layout-sider')[0];
      if (sider) {
        const width = `calc(100% - ${sider.style.width})`;
        const { width: stateWidth } = this.state;
        if (stateWidth !== width) {
          this.setState({ width });
        }
      }
    });
  };

  validate = () => {
    const {
      form: { validateFieldsAndScroll },
      dispatch,
    } = this.props;
    validateFieldsAndScroll((error, values) => {
      if (!error) {
        // submit the values
        dispatch({
          type: 'form/submitAdvancedForm',
          payload: values,
        });
      }
    });
  };

  render() {
    const {
      form: { getFieldDecorator },
      submitting,
    } = this.props;
    const { width } = this.state;

    return (
      <PageHeaderWrapper
        title="Biểu mẫu nâng cao"
        content="Các biểu mẫu nâng cao phổ biến trong các tình huống trong đó đầu vào một lần và gửi một lượng lớn dữ liệu."
        wrapperClassName={styles.advancedForm}
      >
        <Card title="Quản lý kho" className={styles.card} bordered={false}>
          <Form layout="vertical" hideRequiredMark>
            <Row gutter={16}>
              <Col lg={6} md={12} sm={24}>
                <Form.Item label={fieldLabels.name}>
                  {getFieldDecorator('name', {
                    rules: [{ required: true, message: 'Vui lòng nhập tên kho hàng' }],
                  })(<Input placeholder="Vui lòng nhập tên kho hàng" />)}
                </Form.Item>
              </Col>
              <Col xl={{ span: 6, offset: 2 }} lg={{ span: 8 }} md={{ span: 12 }} sm={24}>
                <Form.Item label={fieldLabels.url}>
                  {getFieldDecorator('url', {
                    rules: [{ required: true, message: 'Vui lòng chọn' }],
                  })(
                    <Input
                      style={{ width: '100%' }}
                      addonBefore="http://"
                      addonAfter=".com"
                      placeholder="Vui lòng nhập"
                    />
                  )}
                </Form.Item>
              </Col>
              <Col xl={{ span: 8, offset: 2 }} lg={{ span: 10 }} md={{ span: 24 }} sm={24}>
                <Form.Item label={fieldLabels.owner}>
                  {getFieldDecorator('owner', {
                    rules: [{ required: true, message: 'Vui lòng chọn quản trị viên' }],
                  })(
                    <Select placeholder="Vui lòng chọn quản trị viên">
                      <Option value="xiao">Daniel Đỗ</Option>
                      <Option value="mao">Đỗ Tiến Điệp</Option>
                    </Select>
                  )}
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col lg={6} md={12} sm={24}>
                <Form.Item label={fieldLabels.approver}>
                  {getFieldDecorator('approver', {
                    rules: [{ required: true, message: 'Vui lòng chọn người duyệt' }],
                  })(
                    <Select placeholder="Vui lòng chọn người duyệt">
                      <Option value="xiao">Daniel Đỗ</Option>
                      <Option value="mao">Đỗ Tiến Điệp</Option>
                    </Select>
                  )}
                </Form.Item>
              </Col>
              <Col xl={{ span: 6, offset: 2 }} lg={{ span: 8 }} md={{ span: 12 }} sm={24}>
                <Form.Item label={fieldLabels.dateRange}>
                  {getFieldDecorator('dateRange', {
                    rules: [{ required: true, message: 'Vui lòng chọn ngày có hiệu lực' }],
                  })(
                    <RangePicker placeholder={['Ngày bắt đầu', 'Ngày kết thúc']} style={{ width: '100%' }} />
                  )}
                </Form.Item>
              </Col>
              <Col xl={{ span: 8, offset: 2 }} lg={{ span: 10 }} md={{ span: 24 }} sm={24}>
                <Form.Item label={fieldLabels.type}>
                  {getFieldDecorator('type', {
                    rules: [{ required: true, message: 'Vui lòng chọn loại kho' }],
                  })(
                    <Select placeholder="Vui lòng chọn loại kho">
                      <Option value="private">Riêng tư</Option>
                      <Option value="public">Công khai</Option>
                    </Select>
                  )}
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </Card>
        <Card title="Quản lý công việc" className={styles.card} bordered={false}>
          <Form layout="vertical" hideRequiredMark>
            <Row gutter={16}>
              <Col lg={6} md={12} sm={24}>
                <Form.Item label={fieldLabels.name2}>
                  {getFieldDecorator('name2', {
                    rules: [{ required: true, message: 'Vui lòng nhập' }],
                  })(<Input placeholder="Vui lòng nhập" />)}
                </Form.Item>
              </Col>
              <Col xl={{ span: 6, offset: 2 }} lg={{ span: 8 }} md={{ span: 12 }} sm={24}>
                <Form.Item label={fieldLabels.url2}>
                  {getFieldDecorator('url2', {
                    rules: [{ required: true, message: 'Vui lòng chọn' }],
                  })(<Input placeholder="Vui lòng nhập" />)}
                </Form.Item>
              </Col>
              <Col xl={{ span: 8, offset: 2 }} lg={{ span: 10 }} md={{ span: 24 }} sm={24}>
                <Form.Item label={fieldLabels.owner2}>
                  {getFieldDecorator('owner2', {
                    rules: [{ required: true, message: 'Vui lòng chọn quản trị viên' }],
                  })(
                    <Select placeholder="Vui lòng chọn quản trị viên">
                      <Option value="xiao">Daniel Đỗ</Option>
                      <Option value="mao">Đỗ Tiến Điệp</Option>
                    </Select>
                  )}
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col lg={6} md={12} sm={24}>
                <Form.Item label={fieldLabels.approver2}>
                  {getFieldDecorator('approver2', {
                    rules: [{ required: true, message: 'Vui lòng chọn người duyệt' }],
                  })(
                    <Select placeholder="Vui lòng chọn người duyệt">
                      <Option value="xiao">Daniel Đỗ</Option>
                      <Option value="mao">Đỗ Tiến Điệp</Option>
                    </Select>
                  )}
                </Form.Item>
              </Col>
              <Col xl={{ span: 6, offset: 2 }} lg={{ span: 8 }} md={{ span: 12 }} sm={24}>
                <Form.Item label={fieldLabels.dateRange2}>
                  {getFieldDecorator('dateRange2', {
                    rules: [{ required: true, message: 'Vui lòng nhập' }],
                  })(
                    <TimePicker
                      placeholder="Thời gian nhắc"
                      style={{ width: '100%' }}
                      getPopupContainer={trigger => trigger.parentNode}
                    />
                  )}
                </Form.Item>
              </Col>
              <Col xl={{ span: 8, offset: 2 }} lg={{ span: 10 }} md={{ span: 24 }} sm={24}>
                <Form.Item label={fieldLabels.type2}>
                  {getFieldDecorator('type2', {
                    rules: [{ required: true, message: 'Vui lòng chọn loại kho' }],
                  })(
                    <Select placeholder="Vui lòng chọn loại kho">
                      <Option value="private">Riêng tư</Option>
                      <Option value="public">Công khai</Option>
                    </Select>
                  )}
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </Card>
        <Card title="Quản lý thành viên" bordered={false}>
          {getFieldDecorator('members', {
            initialValue: tableData,
          })(<TableForm />)}
        </Card>
        <FooterToolbar style={{ width }}>
          {this.getErrorInfo()}
          <Button type="primary" onClick={this.validate} loading={submitting}>
            Gửi đi
          </Button>
        </FooterToolbar>
      </PageHeaderWrapper>
    );
  }
}

export default AdvancedForm;
