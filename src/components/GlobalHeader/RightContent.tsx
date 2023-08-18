import { Tag, message, notification } from 'antd';
import React, { useEffect, useState } from 'react';
import { connect } from 'umi';
import { HomeOutlined } from '@ant-design/icons';
import Avatar from './AvatarDropdown';
import styles from './index.less';
import { getCompanyInfo, getUserInfo } from '@/api/account';
import { notificationMsgOnce, notificationRead } from '@/api/message';
import PrintSelect from '@/components/printSelect';
import useIntervalAsync from '@/hooks/useIntervalAsync';
import audioUrl from '../../../public/audio/audio.mp3';
const ENVTagColor = {
  dev: 'orange',
  prod: '#87d068',
};

const GlobalHeaderRight = (props: any) => {
  const [cnme, setCnme] = useState(undefined);
  const [counter, setCounter] = useState<number>(1);
  // 获取供应商信息
  const getInfo = async () => {
    try {
      const res = await getUserInfo({});
      const { data } = await getCompanyInfo({ queryId: res.data?.relationId });
      // @ts-ignore
      setCnme(data?.name || '');
    } catch {
      throw new Error('请求错误');
    }
  };

  useEffect(() => {
    getInfo();
    // eslint-disable-next-line react-hooks/exhaustive-deps

    console.log('v1.0.2');
  }, []);

  const { theme, layout } = props;
  let className = styles.right;

  if (theme === 'dark' && layout === 'top') {
    className = `${styles.right}  ${styles.dark}`;
  }

  const handleRead = async (id: number) => {
    await notificationRead({ id: [id as number] });
    message.success('已读');
  };

  // 通知弹窗
  const openNotificationWithIcon = (data: any) => {
    notification.info({
      message: '通知',
      description: data.content,
      duration: 6,
      key: data.id,
      onClick: () => {
        handleRead(data.id);
        setTimeout(() => {
          notification.close(data.id);
        }, 1000);
      },
    });
  };

  // 系统声音提示
  const sourceVoiceSystem = (content: any) => {
    // const utterThis = new SpeechSynthesisUtterance(content);
    // speechSynthesis.speak(utterThis)
    const audio = new Audio();
    audio.src = audioUrl;
    audio.play();
  };

  // 获取最新的一条未读
  const getNewMsg = async () => {
    const { data, success } = await notificationMsgOnce();
    if (data && success) {
      sourceVoiceSystem(data?.content);
      openNotificationWithIcon(data);
      localStorage.setItem('messageId', data.id);
    }
    // 如果两次请求的未读信息id 相同 或者没有未读信息，则累加请求时间
    if (localStorage.getItem('messageId') == data?.id || !data) {
      setCounter((count) => count + 2);
    } else {
      setCounter(1);
    }
  };

  // 消息轮询
  useIntervalAsync(() => {
    getNewMsg();
  }, 60000 * counter);
  // 60000 * counter
  return (
    <div className={styles.headerFlex}>
      <div>
        <span>
          <Tag color="blue" icon={<HomeOutlined />}>
            {' '}
            {cnme || '暂无供应商信息'}
          </Tag>
        </span>
      </div>
      <div className={className}>
        <PrintSelect />
        <Avatar />
        {process.env.REACT_APP_ENV === 'dev' && (
          <span>
            <Tag color={ENVTagColor[process.env.REACT_APP_ENV]}>
              {process.env.REACT_APP_ENV || ''}
            </Tag>
          </span>
        )}
      </div>
    </div>
  );
};

// @ts-ignore
export default connect(({ settings }) => ({
  theme: settings.navTheme,
  layout: settings.layout,
}))(GlobalHeaderRight);
