import req from '@/services/index';
import { GatewayEnum } from '@/enums/httpEnum';
import type { MessageResult, NotificationReadParams } from '@/api/model/messageModel';
import type { DefaultBasicParams, DefaultBasicResult } from './model/basicResultModel';

// 消息列表
export const notificationList = (data: DefaultBasicParams) =>
  req.post<MessageResult>({
    url: `${GatewayEnum.SUPPLY}/notification/query/list`,
    data,
  });

// 消息已读
export const notificationRead = (data: NotificationReadParams) =>
  req.post<DefaultBasicResult>({
    url: `${GatewayEnum.SUPPLY}/notification/operate/read`,
    data,
  });

// 全部已读
export const notificationAllRead = (data: any) =>
  req.post<DefaultBasicResult>({
    url: `${GatewayEnum.SUPPLY}/notification/operate/allRead`,
    data,
  });

// 最近一条消息
export const notificationMsgOnce = () =>
  req.get<DefaultBasicResult>({
    url: `${GatewayEnum.SUPPLY}/notification/query/latest`,
  });
