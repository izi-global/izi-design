import React, { PureComponent } from 'react';
import { findDOMNode } from 'react-dom';
import moment from 'moment';
import { connect } from 'dva';
import {
  List,
  Card,
  Row,
  Col,
  Radio,
  Input,
  Progress,
  Button,
  Icon,
  Dropdown,
  Menu,
  Avatar,
  Modal,
  Form,
  DatePicker,
  Select,
} from 'antd';

import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import Result from '@/components/Result';

import styles from './BasicList.less';

const FormItem = Form.Item;
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
const SelectOption = Select.Option;
const { Search, TextArea } = Input;

@connect(({ list, loading }) => ({
  list,
  loading: loading.models.list,
}))
@Form.create()
class BasicList extends PureComponent {
  state = { visible: false, done: false };

  formLayout = {
    labelCol: { span: 7 },
    wrapperCol: { span: 13 },
  };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'list/fetch',
      payload: {
        count: 5,
      },
    });
  }

  showModal = () => {
    this.setState({
      visible: true,
      current: undefined,
    });
  };

  showEditModal = item => {
    this.setState({
      visible: true,
      current: item,
    });
  };

  handleDone = () => {
    setTimeout(() => this.addBtn.blur(), 0);
    this.setState({
      done: false,
      visible: false,
    });
  };

  handleCancel = () => {
    setTimeout(() => this.addBtn.blur(), 0);
    this.setState({
      visible: false,
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    const { dispatch, form } = this.props;
    const { current } = this.state;
    const id = current ? current.id : '';

    setTimeout(() => this.addBtn.blur(), 0);
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      this.setState({
        done: true,
      });
      dispatch({
        type: 'list/submit',
        payload: { id, ...fieldsValue },
      });
    });
  };

  deleteItem = id => {
    const { dispatch } = this.props;
    dispatch({
      type: 'list/submit',
      payload: { id },
    });
  };

  render() {
    const {
      list: { list },
      loading,
    } = this.props;
    const {
      form: { getFieldDecorator },
    } = this.props;
    const { visible, done, current = {} } = this.state;

    const editAndDelete = (key, currentItem) => {
      if (key === 'edit') this.showEditModal(currentItem);
      else if (key === 'delete') {
        Modal.confirm({
          title: 'Xóa công việc',
          content: 'Bạn có muốn xóa công việc này không?',
          okText: 'Xác nhận',
          cancelText: 'Hủy bỏ',
          onOk: () => this.deleteItem(currentItem.id),
        });
      }
    };

    const modalFooter = done
      ? { footer: null, onCancel: this.handleDone }
      : { okText: 'Lưu lại', onOk: this.handleSubmit, onCancel: this.handleCancel };

    const Info = ({ title, value, bordered }) => (
      <div className={styles.headerInfo}>
        <span>{title}</span>
        <p>{value}</p>
        {bordered && <em />}
      </div>
    );

    const extraContent = (
      <div className={styles.extraContent}>
        <RadioGroup defaultValue="all">
          <RadioButton value="all">Toàn bộ</RadioButton>
          <RadioButton value="progress">Đang xử lý</RadioButton>
          <RadioButton value="waiting">Chờ xử lý</RadioButton>
        </RadioGroup>
        <Search className={styles.extraContentSearch} placeholder="Vui lòng nhập" onSearch={() => ({})} />
      </div>
    );

    const paginationProps = {
      showSizeChanger: true,
      showQuickJumper: true,
      pageSize: 5,
      total: 50,
    };

    const ListContent = ({ data: { owner, createdAt, percent, status } }) => (
      <div className={styles.listContent}>
        <div className={styles.listContentItem}>
          <span>Owner</span>
          <p>{owner}</p>
        </div>
        <div className={styles.listContentItem}>
          <span>Thời gian bắt đầu</span>
          <p>{moment(createdAt).format('DD-MM-YYYY HH:mm')}</p>
        </div>
        <div className={styles.listContentItem}>
          <Progress percent={percent} status={status} strokeWidth={6} style={{ width: 180 }} />
        </div>
      </div>
    );

    const MoreBtn = props => (
      <Dropdown
        overlay={
          <Menu onClick={({ key }) => editAndDelete(key, props.current)}>
            <Menu.Item key="edit">Sửa</Menu.Item>
            <Menu.Item key="delete">Xóa</Menu.Item>
          </Menu>
        }
      >
        <a>
          Xem thêm <Icon type="down" />
        </a>
      </Dropdown>
    );

    const getModalContent = () => {
      if (done) {
        return (
          <Result
            type="success"
            title="Đã thực thi thành công"
            description="Một loạt các mô tả thông tin, ngắn gọn và không thiếu chấm câu."
            actions={
              <Button type="primary" onClick={this.handleDone}>
                Tôi biết rồi
              </Button>
            }
            className={styles.formResult}
          />
        );
      }
      return (
        <Form onSubmit={this.handleSubmit}>
          <FormItem label="Tên công việc" {...this.formLayout}>
            {getFieldDecorator('title', {
              rules: [{ required: true, message: 'Vui lòng nhập tên công việc' }],
              initialValue: current.title,
            })(<Input placeholder="Vui lòng nhập" />)}
          </FormItem>
          <FormItem label="Thời gian bắt đầu" {...this.formLayout}>
            {getFieldDecorator('createdAt', {
              rules: [{ required: true, message: 'Vui lòng chọn thời gian bắt đầu' }],
              initialValue: current.createdAt ? moment(current.createdAt) : null,
            })(
              <DatePicker
                showTime
                placeholder="Vui lòng chọn"
                format="YYYY-MM-DD HH:mm:ss"
                style={{ width: '100%' }}
              />
            )}
          </FormItem>
          <FormItem label="Người lead task" {...this.formLayout}>
            {getFieldDecorator('owner', {
              rules: [{ required: true, message: 'Vui lòng chọn người nhận task' }],
              initialValue: current.owner,
            })(
              <Select placeholder="Vui lòng chọn">
                <SelectOption value="Daniel">Daniel Đỗ</SelectOption>
                <SelectOption value="ViTuocGia">Vi Tiểu Bảo</SelectOption>
              </Select>
            )}
          </FormItem>
          <FormItem {...this.formLayout} label="Mô tả công việc">
            {getFieldDecorator('subDescription', {
              rules: [{ message: 'Vui lòng nhập mô tả công việc với ít nhất 5 ký tự', min: 5 }],
              initialValue: current.subDescription,
            })(<TextArea rows={4} placeholder="Vui lòng nhập ít nhất 5 ký tự" />)}
          </FormItem>
        </Form>
      );
    };
    return (
      <PageHeaderWrapper>
        <div className={styles.standardList}>
          <Card bordered={false}>
            <Row>
              <Col sm={8} xs={24}>
                <Info title="Việc của tôi" value="8 công việc" bordered />
              </Col>
              <Col sm={8} xs={24}>
                <Info title="Thời gian xử lý việc trung bình trong tuần" value="32 phút" bordered />
              </Col>
              <Col sm={8} xs={24}>
                <Info title="Số việc đã hoàn thành" value="24 việc" />
              </Col>
            </Row>
          </Card>

          <Card
            className={styles.listCard}
            bordered={false}
            title="Danh sách chuẩn"
            style={{ marginTop: 24 }}
            bodyStyle={{ padding: '0 32px 40px 32px' }}
            extra={extraContent}
          >
            <Button
              type="dashed"
              style={{ width: '100%', marginBottom: 8 }}
              icon="plus"
              onClick={this.showModal}
              ref={component => {
                /* eslint-disable */
                this.addBtn = findDOMNode(component);
                /* eslint-enable */
              }}
            >
              Thêm mới
            </Button>
            <List
              size="large"
              rowKey="id"
              loading={loading}
              pagination={paginationProps}
              dataSource={list}
              renderItem={item => (
                <List.Item
                  actions={[
                    <a
                      onClick={e => {
                        e.preventDefault();
                        this.showEditModal(item);
                      }}
                    >
                      Sửa
                    </a>,
                    <MoreBtn current={item} />,
                  ]}
                >
                  <List.Item.Meta
                    avatar={<Avatar src={item.logo} shape="square" size="large" />}
                    title={<a href={item.href}>{item.title}</a>}
                    description={item.subDescription}
                  />
                  <ListContent data={item} />
                </List.Item>
              )}
            />
          </Card>
        </div>
        <Modal
          title={done ? null : `Công việc ${current ? 'Cập nhật' : 'Thêm mới'}`}
          className={styles.standardListForm}
          width={640}
          bodyStyle={done ? { padding: '72px 0' } : { padding: '28px 0 0' }}
          destroyOnClose
          visible={visible}
          {...modalFooter}
        >
          {getModalContent()}
        </Modal>
      </PageHeaderWrapper>
    );
  }
}

export default BasicList;
