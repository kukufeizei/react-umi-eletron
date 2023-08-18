import type { DefaultBasicResultList } from './basicResultModel';

export interface MessageItem {
  id?: number;
  notificationNo?: string;
  type?: number;
  typeDesc?: string;
  content?: string;
  status: number;
  createTime?: Date;
}
export type MessageResult = DefaultBasicResultList<MessageItem[]>;

export interface NotificationReadParams {
  id: number[];
}
