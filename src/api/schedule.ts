import AxiosInstance from '@api/axiosInstance';
import { EventScheduleType } from '@hooks/useEventSchedule';

const { httpRequest } = AxiosInstance();

export const ScheduleApi = {
  getScheduleList: async (params: string) => {
    const response = await httpRequest.get<EventScheduleType[]>(`/api/schedule?${params}`);
    return response.data;
  },

  createSchedule: async (params: EventScheduleType) => {
    const response = await httpRequest.post<EventScheduleType>(`api/schedule`, params);
    return response.data;
  },
};
