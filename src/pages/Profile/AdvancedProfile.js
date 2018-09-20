import React, { Component, Fragment } from 'react';
import Debounce from 'lodash-decorators/debounce';
import Bind from 'lodash-decorators/bind';
import { connect } from 'dva';
import {
  Button,
  Menu,
  Dropdown,
  Icon,
  Row,
  Col,
  Steps,
  Card,
  Popover,
  Badge,
  Table,
  Tooltip,
  Divider,
} from 'antd';
import classNames from 'classnames';
import DescriptionList from '@/components/DescriptionList';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import styles from './AdvancedProfile.less';

const { Step } = Steps;
const { Description } = DescriptionList;
const ButtonGroup = Button.Group;

const getWindowWidth = () => window.innerWidth || document.documentElement.clientWidth;

const menu = (
  <Menu>
    <Menu.Item key="1">Trình đơn 1</Menu.Item>
    <Menu.Item key="2">Trình đơn 2</Menu.Item>
    <Menu.Item key="3">Trình đơn 3</Menu.Item>
  </Menu>
);

const action = (
  <Fragment>
    <ButtonGroup>
      <Button>Thao tác</Button>
      <Button>Thao tácx</Button>
      <Dropdown overlay={menu} placement="bottomRight">
        <Button>
          <Icon type="ellipsis" />
        </Button>
      </Dropdown>
    </ButtonGroup>
    <Button type="primary">Thao tác chính</Button>
  </Fragment>
);

const extra = (
  <Row>
    <Col xs={24} sm={12}>
      <div className={styles.textSecondary}>Trạng thái</div>
      <div className={styles.heading}>Chờ duyệt</div>
    </Col>
    <Col xs={24} sm={12}>
      <div className={styles.textSecondary}>Số tiền giao dịch</div>
      <div className={styles.heading}>568.888.888‎₫</div>
    </Col>
  </Row>
);

const description = (
  <DescriptionList className={styles.headerList} size="small" col="2">
    <Description term="Sáng lập">Đỗ Tiến Điệp</Description>
    <Description term="Mua sản phẩm">XX Thử nghiệm</Description>
    <Description term="Ngày tạo">19/09/2018</Description>
    <Description term="Tài liệu liên quan">
      <a href="">12421</a>
    </Description>
    <Description term="Thời gian hiệu lực">19/09/2018 ~ 19/09/2019</Description>
    <Description term="Ghi chú">Vui lòng xác nhận trong 2 ngày làm việc</Description>
  </DescriptionList>
);

const tabList = [
  {
    key: 'detail',
    tab: 'Chi tiết',
  },
  {
    key: 'rule',
    tab: 'Quy định',
  },
];

const desc1 = (
  <div className={classNames(styles.textSecondary, styles.stepDescription)}>
    <Fragment>
      Đỗ Tiến Điệp
      <Icon type="dingding-o" style={{ marginLeft: 8 }} />
    </Fragment>
    <div>2017-12-12 12:32</div>
  </div>
);

const desc2 = (
  <div className={styles.stepDescription}>
    <Fragment>
      Trần Thị Dung
      <Icon type="dingding-o" style={{ color: '#00A0E9', marginLeft: 8 }} />
    </Fragment>
    <div>
      <a href="">Gọi điện</a>
    </div>
  </div>
);

const popoverContent = (
  <div style={{ width: 160 }}>
    Đỗ Nhật Linh
    <span className={styles.textSecondary} style={{ float: 'right' }}>
      <Badge status="default" text={<span style={{ color: 'rgba(0, 0, 0, 0.45)' }}>Không trả lời điện thoại</span>} />
    </span>
    <div className={styles.textSecondary} style={{ marginTop: 4 }}>
      Thời gian xử lý: 2 tiếng 20 phút
    </div>
  </div>
);

const customDot = (dot, { status }) =>
  status === 'process' ? (
    <Popover placement="topLeft" arrowPointAtCenter content={popoverContent}>
      {dot}
    </Popover>
  ) : (
    dot
  );

const operationTabList = [
  {
    key: 'tab1',
    tab: 'Log thao tác 1',
  },
  {
    key: 'tab2',
    tab: 'Log thao tác 2',
  },
  {
    key: 'tab3',
    tab: 'Log thao tác 3',
  },
];

const columns = [
  {
    title: 'Loại',
    dataIndex: 'type',
    key: 'type',
  },
  {
    title: 'Nhân viên',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Kết quả',
    dataIndex: 'status',
    key: 'status',
    render: text =>
      text === 'agree' ? (
        <Badge status="success" text="Thành công" />
      ) : (
        <Badge status="error" text="Có lỗi" />
      ),
  },
  {
    title: 'Thời gian hoạt động',
    dataIndex: 'updatedAt',
    key: 'updatedAt',
  },
  {
    title: 'Ghi chú',
    dataIndex: 'memo',
    key: 'memo',
  },
];

@connect(({ profile, loading }) => ({
  profile,
  loading: loading.effects['profile/fetchAdvanced'],
}))
class AdvancedProfile extends Component {
  state = {
    operationkey: 'tab1',
    stepDirection: 'horizontal',
  };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'profile/fetchAdvanced',
    });

    this.setStepDirection();
    window.addEventListener('resize', this.setStepDirection, { passive: true });
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.setStepDirection);
    this.setStepDirection.cancel();
  }

  onOperationTabChange = key => {
    this.setState({ operationkey: key });
  };

  @Bind()
  @Debounce(200)
  setStepDirection() {
    const { stepDirection } = this.state;
    const w = getWindowWidth();
    if (stepDirection !== 'vertical' && w <= 576) {
      this.setState({
        stepDirection: 'vertical',
      });
    } else if (stepDirection !== 'horizontal' && w > 576) {
      this.setState({
        stepDirection: 'horizontal',
      });
    }
  }

  render() {
    const { stepDirection, operationkey } = this.state;
    const { profile, loading } = this.props;
    const { advancedOperation1, advancedOperation2, advancedOperation3 } = profile;
    const contentList = {
      tab1: (
        <Table
          pagination={false}
          loading={loading}
          dataSource={advancedOperation1}
          columns={columns}
        />
      ),
      tab2: (
        <Table
          pagination={false}
          loading={loading}
          dataSource={advancedOperation2}
          columns={columns}
        />
      ),
      tab3: (
        <Table
          pagination={false}
          loading={loading}
          dataSource={advancedOperation3}
          columns={columns}
        />
      ),
    };

    return (
      <PageHeaderWrapper
        title="Mã số：234231029431"
        logo={
          <img alt="" src="https://gw.alipayobjects.com/zos/rmsportal/nxkuOJlFJuAUhzlMTCEe.png" />
        }
        action={action}
        content={description}
        extraContent={extra}
        tabList={tabList}
      >
        <Card title="Tiến trình công việc" style={{ marginBottom: 24 }} bordered={false}>
        {/* Trạng thái hiện tại current={1} */}
          <Steps direction={stepDirection} progressDot={customDot} current={1}>
            <Step title="Tạo dự án" description={desc1} />
            <Step title="Đánh giá sơ bộ" description={desc2} />
            <Step title="Đánh giá tài chính" />
            <Step title="Hoàn thành" />
          </Steps>
        </Card>
        <Card title="Thông tin người dùng" style={{ marginBottom: 24 }} bordered={false}>
          <DescriptionList style={{ marginBottom: 24 }}>
            <Description term="Tên đăng nhập">Daniel Đỗ</Description>
            <Description term="Số thẻ thành viên">32943898021309809423</Description>
            <Description term="Số thẻ">3321944288191034921</Description>
            <Description term="Thông tin liên hệ">18112345678</Description>
            <Description term="Địa chỉ liên hệ">
              Daniel Đỗ 18100000000 Nhà 26, ngõ 26/8 Tân Xuân, Xuân Đỉnh
            </Description>
          </DescriptionList>
          <DescriptionList style={{ marginBottom: 24 }} title="Thông tin nhóm">
            <Description term="Dữ liệu cố định">725</Description>
            <Description term="Thời gian cập nhật">2017-08-08</Description>
            <Description>&nbsp;</Description>
            <Description
              term={
                <span>
                  Dữ liệu cố định
                  <Tooltip title="Mô tả cho thông tin dữ liệu">
                    <Icon
                      style={{ color: 'rgba(0, 0, 0, 0.43)', marginLeft: 4 }}
                      type="info-circle-o"
                    />
                  </Tooltip>
                </span>
              }
            >
              725
            </Description>
            <Description term="Thời gian cập nhật">2017-08-08</Description>
          </DescriptionList>
          <h4 style={{ marginBottom: 16 }}>Thông tin nhóm</h4>
          <Card type="inner" title="Thông tin nhóm nhiều cấp">
            <DescriptionList size="small" style={{ marginBottom: 16 }} title="Tên nhóm">
              <Description term="Người phụ trách">Trương Vô Kỵ</Description>
              <Description term="Mã quyền hạn">1234567</Description>
              <Description term="Phòng ban">Công ty X - Phòng Y</Description>
              <Description term="Thời gian hết hạn">2017-08-08</Description>
              <Description term="Mô tả">
                Đây là thông tin mô tả thử nghiệm, testing...
              </Description>
            </DescriptionList>
            <Divider style={{ margin: '16px 0' }} />
            <DescriptionList size="small" style={{ marginBottom: 16 }} title="Tên nhóm" col="1">
              <Description term="Tên khoa học">
                Citrullus lanatus (Thunb.) Matsum. et
                Dây leo Nakai hàng năm, thân cây và cành cây dày và chắc chắn. Dày gân..
              </Description>
            </DescriptionList>
            <Divider style={{ margin: '16px 0' }} />
            <DescriptionList size="small" title="Tên nhóm">
              <Description term="Người phụ trách">Daniel Đỗ</Description>
              <Description term="Mã role">1234568</Description>
            </DescriptionList>
          </Card>
        </Card>
        <Card title="Lịch sử cuộc gọi của người dùng trong 6 tháng gần đây" style={{ marginBottom: 24 }} bordered={false}>
          <div className={styles.noData}>
            <Icon type="frown-o" />
            Hiện chưa có dữ liệu
          </div>
        </Card>
        <Card
          className={styles.tabsCard}
          bordered={false}
          tabList={operationTabList}
          onTabChange={this.onOperationTabChange}
        >
          {contentList[operationkey]}
        </Card>
      </PageHeaderWrapper>
    );
  }
}

export default AdvancedProfile;
