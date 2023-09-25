import { post } from '@packages/utils-common/service';

export type DictRequestType = {
  query: number;
  currentPage: number;
  name: string;
};

export type DictResponseType = {
  id: number;
  label: string;
  updateTime: string;
  updateBy: string;
  enabled: boolean;
};

export const getDictList = (data: DictRequestType) => post<DictRequestType, DictResponseType>('/system/dict', data);
