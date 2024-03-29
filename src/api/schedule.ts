import AxiosInstance from '@api/axiosInstance';
import { EventScheduleType } from '@hooks/useEventSchedule';

const { httpRequest } = AxiosInstance();

export interface UpdateScheduleParamsType {
  _id: string;
  params: EventScheduleType;
}

export interface DeleteSchedulePramsType {
  _id: string;
}

interface EventScheduleResponseType {
  data: {
    success: boolean;
    message: string;
    data: EventScheduleType[];
  };
}

export const ScheduleApi = {
  getHolidayList: async (params: string) => {
    const response = await httpRequest.get<EventScheduleType[], EventScheduleResponseType>(`/api/holiday?${params}`);
    return response.data;
  },

  getScheduleList: async () => {
    const response = await httpRequest.get<EventScheduleType[], EventScheduleResponseType>(`/api/schedule`);
    return response.data;
  },

  createSchedule: async (params: EventScheduleType) => {
    const response = await httpRequest.post<EventScheduleType>(`api/schedule`, params);
    return response.data;
  },

  updateSchedule: async (id: string, params: EventScheduleType) => {
    const response = await httpRequest.put<UpdateScheduleParamsType>(`api/schedule/${id}`, params);
    return response.data;
  },

  deleteSchedule: async (id: string) => {
    const response = await httpRequest.delete<DeleteSchedulePramsType>(`api/schedule/${id}`);
    return response.data;
  },
};
