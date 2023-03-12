import { EventScheduleType } from '@hooks/useEventSchedule';
import { axios } from './axios';

export const ScheduleApi = {
  getScheduleList: async (params: string) => {
    const response = await axios.get<EventScheduleType[]>(`/api/schedule?${params}`);
    return response.data;
  },

  createSchedule: async (params: EventScheduleType) => {
    const response = await axios.post<EventScheduleType>(`api/schedule`, params);
    return response.data;
  },
};
