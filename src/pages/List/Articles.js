import React, { Component, Fragment } from 'react';
import moment from 'moment';
import { connect } from 'dva';
import { Form, Card, Select, List, Tag, Icon, Avatar, Row, Col, Button } from 'antd';

import TagSelect from '@/components/TagSelect';
import StandardFormRow from '@/components/StandardFormRow';
import styles from './Articles.less';

const { Option } = Select;
const FormItem = Form.Item;

const pageSize = 5;

@connect(({ list, loading }) => ({
  list,
  loading: loading.models.list,
}))
@Form.create({
  onValuesChange({ dispatch }, changedValues, allValues) {
    // 表单项变化时请求数据
    // eslint-disable-next-line
    console.log(changedValues, allValues);
    // 模拟查询表单生效
    dispatch({
      type: 'list/fetch',
      payload: {
        count: 5,
      },
    });
  },
})
class SearchList extends Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'list/fetch',
      payload: {
        count: 5,
      },
    });
  }

  setOwner = () => {
    const { form } = this.props;
    form.setFieldsValue({
      owner: ['wzj'],
    });
  };

  fetchMore = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'list/appendFetch',
      payload: {
        count: pageSize,
      },
    });
  };

  render() {
    const {
      form,
      list: { list },
      loading,
    } = this.props;
    const { getFieldDecorator } = form;

    const owners = [
      {
        id: 'wzj',
        name: '我自己',
      },
      {
        id: 'wjh',
        name: '吴家豪',
      },
      {
        id: 'zxx',
        name: '周星星',
      },
      {
        id: 'zly',
        name: '赵丽颖',
      },
      {
        id: 'ym',
        name: '姚明',
      },
    ];

    const IconText = ({ type, text }) => (
      <span>
        <Icon type={type} style={{ marginRight: 8 }} />
        {text}
      </span>
    );

    const ListContent = ({ data: { content, updatedAt, avatar, owner, href } }) => (
      <div className={styles.listContent}>
        <div className={styles.description}>{content}</div>
        <div className={styles.extra}>
          <Avatar src={avatar} size="small" />
          <a href={href}>{owner}</a> 发布在
          <a href={href}>{href}</a>
          <em>{moment(updatedAt).format('YYYY-MM-DD HH:mm')}</em>
        </div>
      </div>
    );

    const formItemLayout = {
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 24 },
        md: { span: 12 },
      },
    };

    const loadMore =
      list.length > 0 ? (
        <div style={{ textAlign: 'center', marginTop: 16 }}>
          <Button onClick={this.fetchMore} style={{ paddingLeft: 48, paddingRight: 48 }}>
            {loading ? (
              <span>
                <Icon type="loading" /> 加载中...
              </span>
            ) : (
              '加载更多'
            )}
          </Button>
        </div>
      ) : null;

    return (
      <Fragment>
        <Card bordered={false}>
          <Form layout="inline">
            <StandardFormRow title="Danh mục" block style={{ paddingBottom: 11 }}>
              <FormItem>
                {getFieldDecorator('category')(
                  <TagSelect expandable>
                    <TagSelect.Option value="cat1">Danh mục 1</TagSelect.Option>
                    <TagSelect.Option value="cat2">Danh mục 2</TagSelect.Option>
                    <TagSelect.Option value="cat3">Danh mục 3</TagSelect.Option>
                    <TagSelect.Option value="cat4">Danh mục 4</TagSelect.Option>
                    <TagSelect.Option value="cat5">Danh mục 5</TagSelect.Option>
                    <TagSelect.Option value="cat6">Danh mục 6</TagSelect.Option>
                    <TagSelect.Option value="cat7">Danh mục 7</TagSelect.Option>
                    <TagSelect.Option value="cat8">Danh mục 8</TagSelect.Option>
                    <TagSelect.Option value="cat9">Danh mục 9</TagSelect.Option>
                    <TagSelect.Option value="cat10">Danh mục 10</TagSelect.Option>
                    <TagSelect.Option value="cat11">Danh mục 11</TagSelect.Option>
                    <TagSelect.Option value="cat12">Danh mục 12</TagSelect.Option>
                  </TagSelect>
                )}
              </FormItem>
            </StandardFormRow>
            <StandardFormRow title="owner" grid>
              <Row>
                <Col lg={16} md={24} sm={24} xs={24}>
                  <FormItem>
                    {getFieldDecorator('owner', {
                      initialValue: ['wjh', 'zxx'],
                    })(
                      <Select
                        mode="multiple"
                        style={{ maxWidth: 286, width: '100%' }}
                        placeholder="选择 owner"
                      >
                        {owners.map(owner => (
                          <Option key={owner.id} value={owner.id}>
                            {owner.name}
                          </Option>
                        ))}
                      </Select>
                    )}
                    <a className={styles.selfTrigger} onClick={this.setOwner}>
                      只看自己的
                    </a>
                  </FormItem>
                </Col>
              </Row>
            </StandardFormRow>
            <StandardFormRow title="Tùy chọn khác" grid last>
              <Row gutter={16}>
                <Col xl={8} lg={10} md={12} sm={24} xs={24}>
                  <FormItem {...formItemLayout} label="Thành viên hoạt động">
                    {getFieldDecorator('user', {})(
                      <Select
                        placeholder="Không giới hạn"
                        style={{ maxWidth: 200, width: '100%' }}
                      >
                        <Option value="lisa">李三</Option>
                      </Select>
                    )}
                  </FormItem>
                </Col>
                <Col xl={8} lg={10} md={12} sm={24} xs={24}>
                  <FormItem {...formItemLayout} label="好评度">
                    {getFieldDecorator('rate', {})(
                      <Select
                        placeholder="Không giới hạn"
                        style={{ maxWidth: 200, width: '100%' }}
                      >
                        <Option value="good">优秀</Option>
                      </Select>
                    )}
                  </FormItem>
                </Col>
              </Row>
            </StandardFormRow>
          </Form>
        </Card>
        <Card
          style={{ marginTop: 24 }}
          bordered={false}
          bodyStyle={{ padding: '8px 32px 32px 32px' }}
        >
          <List
            size="large"
            loading={list.length === 0 ? loading : false}
            rowKey="id"
            itemLayout="vertical"
            loadMore={loadMore}
            dataSource={list}
            renderItem={item => (
              <List.Item
                key={item.id}
                actions={[
                  <IconText type="star-o" text={item.star} />,
                  <IconText type="like-o" text={item.like} />,
                  <IconText type="message" text={item.message} />,
                ]}
                extra={<div className={styles.listItemExtra} />}
              >
                <List.Item.Meta
                  title={
                    <a className={styles.listItemMetaTitle} href={item.href}>
                      {item.title}
                    </a>
                  }
                  description={
                    <span>
                      <Tag>Ant Design</Tag>
                      <Tag>设计语言</Tag>
                      <Tag>蚂蚁金服</Tag>
                    </span>
                  }
                />
                <ListContent data={item} />
              </List.Item>
            )}
          />
        </Card>
      </Fragment>
    );
  }
}

export default SearchList;
