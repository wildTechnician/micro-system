import { post } from '@packages/utils-common/service';

export type PieRequestType = {};
export type PieResponseType = {
  id: number;
  data: { id: number; name: string; data: number }[];
};

export const getPieList = (data: PieRequestType) => post<PieRequestType, PieResponseType>('/charts/pie', data);
