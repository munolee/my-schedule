import { axiosInstance } from '@api/axios';
import { EventScheduleType } from '@hooks/useEventSchedule';

export const ScheduleApi = {
  getScheduleList: async (params: string) => {
    const response = await axiosInstance.get<EventScheduleType[]>(`/api/schedule?${params}`);
    return response.data;
  },

  createSchedule: async (params: EventScheduleType) => {
    const response = await axiosInstance.post<EventScheduleType>(`api/schedule`, params);
    return response.data;
  },
};
