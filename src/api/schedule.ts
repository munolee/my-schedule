import { axios } from './axios';
import { EventScheduleType } from '@hooks/useEventSchedule';

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
