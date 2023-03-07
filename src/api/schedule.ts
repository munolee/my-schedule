import { axios } from './axios';

export type ScheduleResponse = {
  startDate: string;
  endDate: string;
  eventTitle: string;
  typeId: number;
  bgColor: string;
};

export const ScheduleApi = {
  getScheduleList: async (params: string) => {
    const response = await axios.get<ScheduleResponse[]>(`/api/schedule?${params}`);
    return response.data;
  },
};
