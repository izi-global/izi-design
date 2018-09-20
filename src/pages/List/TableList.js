import React, { PureComponent, Fragment } from 'react';
import { connect } from 'dva';
import moment from 'moment';
import {
  Row,
  Col,
  Card,
  Form,
  Input,
  Select,
  Icon,
  Button,
  Dropdown,
  Menu,
  InputNumber,
  DatePicker,
  Modal,
  message,
  Badge,
  Divider,
  Steps,
  Radio,
} from 'antd';
import StandardTable from '@/components/StandardTable';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';

import styles from './TableList.less';

import {
  formatMessage,
} from 'umi/locale';

const FormItem = Form.Item;
const { Step } = Steps;
const { TextArea } = Input;
const { Option } = Select;
const RadioGroup = Radio.Group;
const getValue = obj =>
  Object.keys(obj)
    .map(key => obj[key])
    .join(',');
const statusMap = ['default', 'processing', 'success', 'error'];
const status = ['Tắt', 'Đang chạy', 'Go live', 'Bất thường'];

const CreateForm = Form.create()(props => {
  const { modalVisible, form, handleAdd, handleModalVisible } = props;
  const okHandle = () => {
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      form.resetFields();
      handleAdd(fieldsValue);
    });
  };
  return (
    <Modal
      destroyOnClose
      title="Thêm quy tắc mới"
      visible={modalVisible}
      onOk={okHandle}
      onCancel={() => handleModalVisible()}
    >
      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="Mô tả">
        {form.getFieldDecorator('desc', {
          rules: [{ required: true, message: 'Vui lòng nhập nội dung mô tả với ít nhất 5 ký tự', min: 5 }],
        })(<Input placeholder="Vui lòng nhập" />)}
      </FormItem>
    </Modal>
  );
});

@Form.create()
class UpdateForm extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      formVals: {
        name: props.values.name,
        desc: props.values.desc,
        key: props.values.key,
        target: '0',
        template: '0',
        type: '1',
        time: '',
        frequency: 'month',
      },
      currentStep: 0,
    };

    this.formLayout = {
      labelCol: { span: 7 },
      wrapperCol: { span: 13 },
    };
  }

  handleNext = currentStep => {
    const { form, handleUpdate } = this.props;
    const { formVals: oldValue } = this.state;
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      const formVals = { ...oldValue, ...fieldsValue };
      this.setState(
        {
          formVals,
        },
        () => {
          if (currentStep < 2) {
            this.forward();
          } else {
            handleUpdate(formVals);
          }
        }
      );
    });
  };

  backward = () => {
    const { currentStep } = this.state;
    this.setState({
      currentStep: currentStep - 1,
    });
  };

  forward = () => {
    const { currentStep } = this.state;
    this.setState({
      currentStep: currentStep + 1,
    });
  };

  renderContent = (currentStep, formVals) => {
    const { form } = this.props;
    if (currentStep === 1) {
      return [
        <FormItem key="target" {...this.formLayout} label="Đối tượng giám sát">
          {form.getFieldDecorator('target', {
            initialValue: formVals.target,
          })(
            <Select style={{ width: '100%' }}>
              <Option value="0">Bảng 1</Option>
              <Option value="1">Bảng 2</Option>
            </Select>
          )}
        </FormItem>,
        <FormItem key="template" {...this.formLayout} label="Mẫu quy định">
          {form.getFieldDecorator('template', {
            initialValue: formVals.template,
          })(
            <Select style={{ width: '100%' }}>
              <Option value="0">Mẫu quy định 1</Option>
              <Option value="1">Mẫu quy định 2</Option>
            </Select>
          )}
        </FormItem>,
        <FormItem key="type" {...this.formLayout} label="Loại quy định">
          {form.getFieldDecorator('type', {
            initialValue: formVals.type,
          })(
            <RadioGroup>
              <Radio value="0">Mạnh</Radio>
              <Radio value="1">Yếu</Radio>
            </RadioGroup>
          )}
        </FormItem>,
      ];
    }
    if (currentStep === 2) {
      return [
        <FormItem key="time" {...this.formLayout} label="Thời gian bắt đầu">
          {form.getFieldDecorator('time', {
            rules: [{ required: true, message: 'Vui longf chọn thời gian bắt đầu' }],
          })(
            <DatePicker
              style={{ width: '100%' }}
              showTime
              format="YYYY-MM-DD HH:mm:ss"
              placeholder="Hãy chọn thời gian bắt đầu"
            />
          )}
        </FormItem>,
        <FormItem key="frequency" {...this.formLayout} label="Chu kỳ lặp lại">
          {form.getFieldDecorator('frequency', {
            initialValue: formVals.frequency,
          })(
            <Select style={{ width: '100%' }}>
              <Option value="month">Tháng</Option>
              <Option value="week">Tuần</Option>
            </Select>
          )}
        </FormItem>,
      ];
    }
    return [
      <FormItem key="name" {...this.formLayout} label="Tên quy định">
        {form.getFieldDecorator('name', {
          rules: [{ required: true, message: 'Vui lòng nhập tên quy tắc!' }],
          initialValue: formVals.name,
        })(<Input placeholder="Vui lòng nhập" />)}
      </FormItem>,
      <FormItem key="desc" {...this.formLayout} label="Mô tả quy tắc">
        {form.getFieldDecorator('desc', {
          rules: [{ required: true, message: 'Vui lòng nhập nội dung mô tả, tối thiểu 5 ký tự', min: 5 }],
          initialValue: formVals.desc,
        })(<TextArea rows={4} placeholder="Vui lòng nhập ít nhất 5 ký tự" />)}
      </FormItem>,
    ];
  };

  renderFooter = currentStep => {
    const { handleUpdateModalVisible } = this.props;
    if (currentStep === 1) {
      return [
        <Button key="back" style={{ float: 'left' }} onClick={this.backward}>
          Bước trước
        </Button>,
        <Button key="cancel" onClick={() => handleUpdateModalVisible()}>
          Hủy bỏ
        </Button>,
        <Button key="forward" type="primary" onClick={() => this.handleNext(currentStep)}>
          Tiếp theo
        </Button>,
      ];
    }
    if (currentStep === 2) {
      return [
        <Button key="back" style={{ float: 'left' }} onClick={this.backward}>
          Bước trước
        </Button>,
        <Button key="cancel" onClick={() => handleUpdateModalVisible()}>
          Hủy bỏ
        </Button>,
        <Button key="submit" type="primary" onClick={() => this.handleNext(currentStep)}>
          Hoàn thành
        </Button>,
      ];
    }
    return [
      <Button key="cancel" onClick={() => handleUpdateModalVisible()}>
        Hủy bỏ
      </Button>,
      <Button key="forward" type="primary" onClick={() => this.handleNext(currentStep)}>
        Tiếp theo
      </Button>,
    ];
  };

  render() {
    const { updateModalVisible, handleUpdateModalVisible } = this.props;
    const { currentStep, formVals } = this.state;

    return (
      <Modal
        width={640}
        bodyStyle={{ padding: '32px 40px 48px' }}
        destroyOnClose
        title="Cấu hình quy tắc"
        visible={updateModalVisible}
        footer={this.renderFooter(currentStep)}
        onCancel={() => handleUpdateModalVisible()}
      >
        <Steps style={{ marginBottom: 28 }} size="small" current={currentStep}>
          <Step title="Thông tin cơ bản" />
          <Step title="Cấu hình thuộc tính" />
          <Step title="Đặt lịch trình" />
        </Steps>
        {this.renderContent(currentStep, formVals)}
      </Modal>
    );
  }
}

/* eslint react/no-multi-comp:0 */
@connect(({ rule, loading }) => ({
  rule,
  loading: loading.models.rule,
}))
@Form.create()
class TableList extends PureComponent {
  state = {
    modalVisible: false,
    updateModalVisible: false,
    expandForm: false,
    selectedRows: [],
    formValues: {},
    stepFormValues: {},
  };

  columns = [
    {
      title: 'Tên quy định',
      dataIndex: 'name',
    },
    {
      title: 'Tiêu đề',
      dataIndex: 'desc',
    },
    {
      title: 'Mã dịch vụ ',
      dataIndex: 'callNo',
      sorter: true,
      align: 'right',
      render: val => `${val} mục`,
      // mark to display a total number
      needTotal: true,
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      filters: [
        {
          text: status[0],
          value: 0,
        },
        {
          text: status[1],
          value: 1,
        },
        {
          text: status[2],
          value: 2,
        },
        {
          text: status[3],
          value: 3,
        },
      ],
      render(val) {
        return <Badge status={statusMap[val]} text={status[val]} />;
      },
    },
    {
      title: 'Cập nhật cuối',
      dataIndex: 'updatedAt',
      sorter: true,
      render: val => <span>{moment(val).format('YYYY-MM-DD HH:mm:ss')}</span>,
    },
    {
      title: 'Thao tác',
      render: (text, record) => (
        <Fragment>
          <a onClick={() => this.handleUpdateModalVisible(true, record)}>Cấu hình</a>
          <Divider type="vertical" />
          <a href="">Nhận thông báo</a>
        </Fragment>
      ),
    },
  ];

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'rule/fetch',
    });
  }

  handleStandardTableChange = (pagination, filtersArg, sorter) => {
    const { dispatch } = this.props;
    const { formValues } = this.state;

    const filters = Object.keys(filtersArg).reduce((obj, key) => {
      const newObj = { ...obj };
      newObj[key] = getValue(filtersArg[key]);
      return newObj;
    }, {});

    const params = {
      currentPage: pagination.current,
      pageSize: pagination.pageSize,
      ...formValues,
      ...filters,
    };
    if (sorter.field) {
      params.sorter = `${sorter.field}_${sorter.order}`;
    }

    dispatch({
      type: 'rule/fetch',
      payload: params,
    });
  };

  handleFormReset = () => {
    const { form, dispatch } = this.props;
    form.resetFields();
    this.setState({
      formValues: {},
    });
    dispatch({
      type: 'rule/fetch',
      payload: {},
    });
  };

  toggleForm = () => {
    const { expandForm } = this.state;
    this.setState({
      expandForm: !expandForm,
    });
  };

  handleMenuClick = e => {
    const { dispatch } = this.props;
    const { selectedRows } = this.state;

    if (!selectedRows) return;
    switch (e.key) {
      case 'remove':
        dispatch({
          type: 'rule/remove',
          payload: {
            key: selectedRows.map(row => row.key),
          },
          callback: () => {
            this.setState({
              selectedRows: [],
            });
          },
        });
        break;
      default:
        break;
    }
  };

  handleSelectRows = rows => {
    this.setState({
      selectedRows: rows,
    });
  };

  handleSearch = e => {
    e.preventDefault();

    const { dispatch, form } = this.props;

    form.validateFields((err, fieldsValue) => {
      if (err) return;

      const values = {
        ...fieldsValue,
        updatedAt: fieldsValue.updatedAt && fieldsValue.updatedAt.valueOf(),
      };

      this.setState({
        formValues: values,
      });

      dispatch({
        type: 'rule/fetch',
        payload: values,
      });
    });
  };

  handleModalVisible = flag => {
    this.setState({
      modalVisible: !!flag,
    });
  };

  handleUpdateModalVisible = (flag, record) => {
    this.setState({
      updateModalVisible: !!flag,
      stepFormValues: record || {},
    });
  };

  handleAdd = fields => {
    const { dispatch } = this.props;
    dispatch({
      type: 'rule/add',
      payload: {
        desc: fields.desc,
      },
    });

    message.success('Đã thêm thành công');
    this.handleModalVisible();
  };

  handleUpdate = fields => {
    const { dispatch } = this.props;
    dispatch({
      type: 'rule/update',
      payload: {
        name: fields.name,
        desc: fields.desc,
        key: fields.key,
      },
    });

    message.success('Đã lưu cấu hình thành công');
    this.handleUpdateModalVisible();
  };

  renderSimpleForm() {
    const {
      form: { getFieldDecorator },
    } = this.props;
    return (
      <Form onSubmit={this.handleSearch} layout="inline">
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          <Col md={8} sm={24}>
            <FormItem label={formatMessage({id:'common.rule_name'})}>
              {getFieldDecorator('name')(<Input placeholder={formatMessage({id:'common.please_enter'})} />)}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label="Trạng thái sử dụng">
              {getFieldDecorator('status')(
                <Select placeholder="Vui lòng chọn" style={{ width: '100%' }}>
                  <Option value="0">Tắt</Option>
                  <Option value="1">Đang chạy</Option>
                </Select>
              )}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <span className={styles.submitButtons}>
              <Button type="primary" htmlType="submit">
                Tìm kiếm
              </Button>
              <Button style={{ marginLeft: 8 }} onClick={this.handleFormReset}>
                Đặt lại
              </Button>
              <a style={{ marginLeft: 8 }} onClick={this.toggleForm}>
                Mở rộng <Icon type="down" />
              </a>
            </span>
          </Col>
        </Row>
      </Form>
    );
  }

  renderAdvancedForm() {
    const {
      form: { getFieldDecorator },
    } = this.props;
    return (
      <Form onSubmit={this.handleSearch} layout="inline">
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          <Col md={8} sm={24}>
            <FormItem label="Tên quy định">
              {getFieldDecorator('name')(<Input placeholder="Vui lòng nhập" />)}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label="Trạng thái">
              {getFieldDecorator('status')(
                <Select placeholder="Vui lòng chọn" style={{ width: '100%' }}>
                  <Option value="0">Đang tắt</Option>
                  <Option value="1">Đang chạy</Option>
                </Select>
              )}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label="Số lần gọi">
              {getFieldDecorator('number')(<InputNumber style={{ width: '100%' }} />)}
            </FormItem>
          </Col>
        </Row>
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          <Col md={8} sm={24}>
            <FormItem label="Thời gian cập nhật">
              {getFieldDecorator('date')(
                <DatePicker style={{ width: '100%' }} placeholder="Vui lòng chọn ngày cập nhật" />
              )}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label="Trạng thái sử dụng">
              {getFieldDecorator('status3')(
                <Select placeholder="Vui lòng chọn" style={{ width: '100%' }}>
                  <Option value="0">Tắt</Option>
                  <Option value="1">Đang chạy</Option>
                </Select>
              )}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label="Trạng thái sử dụng">
              {getFieldDecorator('status4')(
                <Select placeholder="Vui lòng chọn" style={{ width: '100%' }}>
                  <Option value="0">Tắt</Option>
                  <Option value="1">Đang chạy</Option>
                </Select>
              )}
            </FormItem>
          </Col>
        </Row>
        <div style={{ overflow: 'hidden' }}>
          <div style={{ float: 'right', marginBottom: 24 }}>
            <Button type="primary" htmlType="submit">
              Tìm kiếm
            </Button>
            <Button style={{ marginLeft: 8 }} onClick={this.handleFormReset}>
              Đặt lại
            </Button>
            <a style={{ marginLeft: 8 }} onClick={this.toggleForm}>
              Thu gọn <Icon type="up" />
            </a>
          </div>
        </div>
      </Form>
    );
  }

  renderForm() {
    const { expandForm } = this.state;
    return expandForm ? this.renderAdvancedForm() : this.renderSimpleForm();
  }

  render() {
    const {
      rule: { data },
      loading,
    } = this.props;
    const { selectedRows, modalVisible, updateModalVisible, stepFormValues } = this.state;
    const menu = (
      <Menu onClick={this.handleMenuClick} selectedKeys={[]}>
        <Menu.Item key="remove">Xóa</Menu.Item>
        <Menu.Item key="approval">Duyệt hàng loạt</Menu.Item>
      </Menu>
    );

    const parentMethods = {
      handleAdd: this.handleAdd,
      handleModalVisible: this.handleModalVisible,
    };
    const updateMethods = {
      handleUpdateModalVisible: this.handleUpdateModalVisible,
      handleUpdate: this.handleUpdate,
    };
    return (
      <PageHeaderWrapper title="Biểu mẫu kèm tìm kiếm">
        <Card bordered={false}>
          <div className={styles.tableList}>
            <div className={styles.tableListForm}>{this.renderForm()}</div>
            <div className={styles.tableListOperator}>
              <Button icon="plus" type="primary" onClick={() => this.handleModalVisible(true)}>
                Thêm mới
              </Button>
              {selectedRows.length > 0 && (
                <span>
                  <Button>Thao tác loạt</Button>
                  <Dropdown overlay={menu}>
                    <Button>
                      Thao tác khác <Icon type="down" />
                    </Button>
                  </Dropdown>
                </span>
              )}
            </div>
            <StandardTable
              selectedRows={selectedRows}
              loading={loading}
              data={data}
              columns={this.columns}
              onSelectRow={this.handleSelectRows}
              onChange={this.handleStandardTableChange}
            />
            console.log("demo")
          </div>
        </Card>
        <CreateForm {...parentMethods} modalVisible={modalVisible} />
        {stepFormValues && Object.keys(stepFormValues).length ? (
          <UpdateForm
            {...updateMethods}
            updateModalVisible={updateModalVisible}
            values={stepFormValues}
          />
        ) : null}
      </PageHeaderWrapper>
    );
  }
}

export default TableList;
