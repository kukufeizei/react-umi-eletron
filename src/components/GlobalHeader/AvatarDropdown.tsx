import { LogoutOutlined } from '@ant-design/icons';
import { Avatar, Menu, message } from 'antd';
import React, { useEffect } from 'react';
import { history } from 'umi';
import { doLogOut, getUserInfo } from '@/api/account';
import HeaderDropdown from '../HeaderDropdown';
import styles from './index.less';
import { useModel } from 'umi';

const AvatarDropdown = () => {
  const { setDtSessionId, user, setUser } = useModel<any>('global');
  // 获取登录用户和供应商信息
  const getInfo = async () => {
    try {
      const { data } = await getUserInfo({});
      localStorage.setItem('user', JSON.stringify(data));
      setUser(data);
    } catch {
      throw new Error('请求错误');
    }
  };

  useEffect(() => {
    getInfo();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onMenuClick = async (event: any) => {
    const { key } = event;
    if (key === 'logout') {
      const res = await doLogOut();
      localStorage.clear();
      setDtSessionId(null);
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      res.success && message.success('注销成功');
      history.replace({
        pathname: '/user/login',
      });
    }
  };

  // 退出登录
  const menuHeaderDropdown = (
    <Menu className={styles.menu} selectedKeys={[]} onClick={onMenuClick}>
      <Menu.Item key="logout">
        <LogoutOutlined />
        退出登录
      </Menu.Item>
    </Menu>
  );
  return (
    <>
      <HeaderDropdown overlay={menuHeaderDropdown}>
        <span className={`${styles.action} ${styles.account}`}>
          <Avatar
            size="small"
            className={styles.avatar}
            src={
              user?.avatar ||
              'https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png'
            }
            alt="avatar"
          />
          <span className={`${styles.name} anticon`}>{user?.realName || '暂无'}</span>
        </span>
      </HeaderDropdown>
    </>
  );
};

export default AvatarDropdown;
