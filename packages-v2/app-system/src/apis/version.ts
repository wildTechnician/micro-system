import { post } from '@packages/utils-common/service';

export type VersionRequestType = {
  query: number;
  currentPage: number;
  name: string;
};

export type VersionResponseType = {
  id: number;
  nickname: string;
  createdTime: string;
  updateTime: string;
  username: string;
  sex: string;
  dept: string;
  email: string;
  phone: number;
  enabled: boolean;
};

export const getUserList = (url: string, data: VersionRequestType) => post<VersionRequestType, VersionResponseType>(url, data);
