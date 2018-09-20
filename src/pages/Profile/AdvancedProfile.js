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
    tab: '详情',
  },
  {
    key: 'rule',
    tab: '规则',
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
    title: '操作时间',
    dataIndex: 'updatedAt',
    key: 'updatedAt',
  },
  {
    title: '备注',
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
            <Description term="用户姓名">付小小</Description>
            <Description term="会员卡号">32943898021309809423</Description>
            <Description term="身份证">3321944288191034921</Description>
            <Description term="联系方式">18112345678</Description>
            <Description term="联系地址">
              Daniel Đỗ 18100000000 浙江省杭州市西湖区黄姑山路工专路交叉路口
            </Description>
          </DescriptionList>
          <DescriptionList style={{ marginBottom: 24 }} title="信息组">
            <Description term="某某数据">725</Description>
            <Description term="该数据更新时间">2017-08-08</Description>
            <Description>&nbsp;</Description>
            <Description
              term={
                <span>
                  某某数据
                  <Tooltip title="数据说明">
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
            <Description term="该数据更新时间">2017-08-08</Description>
          </DescriptionList>
          <h4 style={{ marginBottom: 16 }}>信息组</h4>
          <Card type="inner" title="多层级信息组">
            <DescriptionList size="small" style={{ marginBottom: 16 }} title="组名称">
              <Description term="负责人">林东东</Description>
              <Description term="Mã quyền hạn">1234567</Description>
              <Description term="Phòng ban">XX公司 - YY部</Description>
              <Description term="过期时间">2017-08-08</Description>
              <Description term="Mô tả">
                Đây là thông tin mô tả thử nghiệm, testing...
              </Description>
            </DescriptionList>
            <Divider style={{ margin: '16px 0' }} />
            <DescriptionList size="small" style={{ marginBottom: 16 }} title="组名称" col="1">
              <Description term="学名">
                Citrullus lanatus (Thunb.) Matsum. et
                Nakai一年生蔓生藤本；茎、枝粗壮，具明显的棱。卷须较粗..
              </Description>
            </DescriptionList>
            <Divider style={{ margin: '16px 0' }} />
            <DescriptionList size="small" title="组名称">
              <Description term="负责人">付小小</Description>
              <Description term="角色码">1234568</Description>
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
