import React, { Fragment } from 'react';
import { connect } from 'dva';
import { Button, Row, Col } from 'antd';
import router from 'umi/router';
import Result from '@/components/Result';
import styles from './style.less';

@connect(({ form }) => ({
  data: form.step,
}))
class Step3 extends React.PureComponent {
  render() {
    const { data } = this.props;
    const onFinish = () => {
      router.push('/form/step-form/info');
    };
    const information = (
      <div className={styles.information}>
        <Row>
          <Col xs={24} sm={8} className={styles.label}>
            Tài khoản chuyển:
          </Col>
          <Col xs={24} sm={16}>
            {data.payAccount}
          </Col>
        </Row>
        <Row>
          <Col xs={24} sm={8} className={styles.label}>
            Tài khoản nhận:
          </Col>
          <Col xs={24} sm={16}>
            {data.receiverAccount}
          </Col>
        </Row>
        <Row>
          <Col xs={24} sm={8} className={styles.label}>
            Tên người nhận:
          </Col>
          <Col xs={24} sm={16}>
            {data.receiverName}
          </Col>
        </Row>
        <Row>
          <Col xs={24} sm={8} className={styles.label}>
            Số tiền chuyển:
          </Col>
          <Col xs={24} sm={16}>
            <span className={styles.money}>{data.amount}</span> ₫
          </Col>
        </Row>
      </div>
    );
    const actions = (
      <Fragment>
        <Button type="primary" onClick={onFinish}>
          Giao dịch khác
        </Button>
        <Button>Xem hóa đơn</Button>
      </Fragment>
    );
    return (
      <Result
        type="success"
        title="Chuyển tiền thành công"
        description="Số tiền dự kiến sẽ được chuyển tới tài khoản người nhận trong vòng 2 giờ."
        extra={information}
        actions={actions}
        className={styles.result}
      />
    );
  }
}

export default Step3;
