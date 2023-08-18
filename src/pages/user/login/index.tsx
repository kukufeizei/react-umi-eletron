import React from 'react';
import { doLogin } from '@/api/account';
import { message, Button, Tabs, Form, Input, Tooltip } from 'antd';
import { UserOutlined, InfoCircleOutlined, UnlockOutlined } from '@ant-design/icons';
import { useModel, history } from 'umi';
import styles from './index.less';
import type { LoginParams } from '@/api/model/accountModel';

const Login = () => {
  const { setDtSessionId } = useModel<any>('global');

  const handleLogin = async (values: LoginParams) => {
    const res = await doLogin({
      name: values.name,
      pwd: values.pwd,
    });

    if (res.code === 200) {
      localStorage.setItem('dt_sessionId', res.data);
      setDtSessionId(res.data);
      message.success('登录成功 欢迎回来!');

      setTimeout(() => {
        history?.replace({
          pathname: '/',
        });
      }, 300);
    }
  };

  const onFinish = (values: any) => {
    handleLogin(values);
  };

  const items = [{ label: '账号密码登录', key: 'item-pwd-login' }];

  return (
    <div className={styles.login}>
      <Tabs items={items} />
      <Form
        className={styles.loginForm}
        name="basic"
        colon={false}
        style={{ maxWidth: 800 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        autoComplete="off"
      >
        <Form.Item label="" name="name" rules={[{ required: true, message: '请输入用户名' }]}>
          <Input
            placeholder="用户名"
            size="large"
            prefix={<UserOutlined className="site-form-item-icon" />}
            suffix={
              <Tooltip title="账号/手机号">
                <InfoCircleOutlined style={{ color: 'rgba(0,0,0,.45)' }} />
              </Tooltip>
            }
          />
        </Form.Item>

        <Form.Item label="" name="pwd" rules={[{ required: true, message: '请输入密码' }]}>
          <Input
            placeholder="密码"
            type="password"
            size="large"
            prefix={<UnlockOutlined className="site-form-item-icon" />}
          />
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            style={{ width: '100%' }}
            shape="round"
            size="large"
          >
            立即登录
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Login;
