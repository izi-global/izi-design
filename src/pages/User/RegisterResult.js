import React from 'react';
import { Button } from 'antd';
import Link from 'umi/link';
import Result from '@/components/Result';
import styles from './RegisterResult.less';

const actions = (
  <div className={styles.actions}>
    <a href="">
      <Button size="large" type="primary">
        Xem hòm thư
      </Button>
    </a>
    <Link to="/">
      <Button size="large">Trở về trang chủ</Button>
    </Link>
  </div>
);

const RegisterResult = ({ location }) => (
  <Result
    className={styles.registerResult}
    type="success"
    title={
      <div className={styles.title}>
        Tài khoản của bạn:
        {location.state ? location.state.account : 'dotiendiep@example.com'}
        đã đăng ký thành công
      </div>
    }
    description="Hệ thống đã gửi email kích hoạt tới bạn, vui lòng kích hoạt trong 24h tới. Vui lòng đăng nhập vào hòm thư và nhấn vào liên kết kích hoạt tài khoản trước thời hạn"
    actions={actions}
    style={{ marginTop: 56 }}
  />
);

export default RegisterResult;
