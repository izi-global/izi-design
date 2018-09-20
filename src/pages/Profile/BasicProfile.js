import React, { Component } from 'react';
import { connect } from 'dva';
import { Card, Badge, Table, Divider } from 'antd';
import DescriptionList from '@/components/DescriptionList';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import styles from './BasicProfile.less';

const { Description } = DescriptionList;

const progressColumns = [
  {
    title: 'Thời gian',
    dataIndex: 'time',
    key: 'time',
  },
  {
    title: 'Tiến trình hiện tại',
    dataIndex: 'rate',
    key: 'rate',
  },
  {
    title: 'Trạng thái',
    dataIndex: 'status',
    key: 'status',
    render: text =>
      text === 'success' ? (
        <Badge status="success" text="Thành công" />
      ) : (
        <Badge status="processing" text="Đang xử lý" />
      ),
  },
  {
    title: 'Id vận hành',
    dataIndex: 'operator',
    key: 'operator',
  },
  {
    title: 'Thời gian',
    dataIndex: 'cost',
    key: 'cost',
  },
];

@connect(({ profile, loading }) => ({
  profile,
  loading: loading.effects['profile/fetchBasic'],
}))
class BasicProfile extends Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'profile/fetchBasic',
    });
  }

  render() {
    const { profile, loading } = this.props;
    const { basicGoods, basicProgress } = profile;
    let goodsData = [];
    if (basicGoods.length) {
      let num = 0;
      let amount = 0;
      basicGoods.forEach(item => {
        num += Number(item.num);
        amount += Number(item.amount);
      });
      goodsData = basicGoods.concat({
        id: 'Tổng cộng',
        num,
        amount,
      });
    }
    const renderContent = (value, row, index) => {
      const obj = {
        children: value,
        props: {},
      };
      if (index === basicGoods.length) {
        obj.props.colSpan = 0;
      }
      return obj;
    };
    const goodsColumns = [
      {
        title: 'Mã sản phẩm',
        dataIndex: 'id',
        key: 'id',
        render: (text, row, index) => {
          if (index < basicGoods.length) {
            return <a href="">{text}</a>;
          }
          return {
            children: <span style={{ fontWeight: 600 }}>Tổng cộng</span>,
            props: {
              colSpan: 4,
            },
          };
        },
      },
      {
        title: 'Tên sản phẩm',
        dataIndex: 'name',
        key: 'name',
        render: renderContent,
      },
      {
        title: 'Mã vạch',
        dataIndex: 'barcode',
        key: 'barcode',
        render: renderContent,
      },
      {
        title: 'Giá',
        dataIndex: 'price',
        key: 'price',
        align: 'right',
        render: renderContent,
      },
      {
        title: 'Số lượng (cái)',
        dataIndex: 'num',
        key: 'num',
        align: 'right',
        render: (text, row, index) => {
          if (index < basicGoods.length) {
            return text;
          }
          return <span style={{ fontWeight: 600 }}>{text}</span>;
        },
      },
      {
        title: 'Tổng giá',
        dataIndex: 'amount',
        key: 'amount',
        align: 'right',
        render: (text, row, index) => {
          if (index < basicGoods.length) {
            return text;
          }
          return <span style={{ fontWeight: 600 }}>{text}</span>;
        },
      },
    ];
    return (
      <PageHeaderWrapper title="Trang thông tin cơ bản">
        <Card bordered={false}>
          <DescriptionList size="large" title="Ứng dụng hoàn tiền" style={{ marginBottom: 32 }}>
            <Description term="Mã lấy hàng">1000000000</Description>
            <Description term="Trạng thái">Đã lấy hàng</Description>
            <Description term="Mã đơn hàng">1234123421</Description>
            <Description term="Đơn hàng con">3214321432</Description>
          </DescriptionList>
          <Divider style={{ marginBottom: 32 }} />
          <DescriptionList size="large" title="Thông tin người dùng" style={{ marginBottom: 32 }}>
            <Description term="Tên đăng nhập">Daniel Đỗ</Description>
            <Description term="Điện thoại liên hệ">18100000000</Description>
            <Description term="Vận chuyển thường">Kho lưu trữ</Description>
            <Description term="Địa chỉ nhận">Số nhà, đường phố, phường, quận, huyện</Description>
            <Description term="Ghi chú">Không có</Description>
          </DescriptionList>
          <Divider style={{ marginBottom: 32 }} />
          <div className={styles.title}>Hoàn hàng</div>
          <Table
            style={{ marginBottom: 24 }}
            pagination={false}
            loading={loading}
            dataSource={goodsData}
            columns={goodsColumns}
            rowKey="id"
          />
          <div className={styles.title}>Tiến trình hoàn hàng</div>
          <Table
            style={{ marginBottom: 16 }}
            pagination={false}
            loading={loading}
            dataSource={basicProgress}
            columns={progressColumns}
          />
        </Card>
      </PageHeaderWrapper>
    );
  }
}

export default BasicProfile;
