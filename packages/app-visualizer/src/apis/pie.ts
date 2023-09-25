import { post } from '@packages/utils-common/service';

export type PieRequestType = {};
export type PieResponseType = {
  id: number;
  data: { id: number; name: string; data: number }[];
};

export const getPieList = (url: string, data: PieRequestType) => post<PieRequestType, PieResponseType>(url, data);
