import { useQuery } from 'react-query';
import { ScheduleApi } from '@api/schedule';
import useAuthLogin from '@hooks/useAuthLogin';

const useScheduleListQuery = () => {
  const { isLoggedIn } = useAuthLogin();

  const useGetScheduleList = () => {
    const { isLoading, data } = useQuery(
      ['getSchedule'],
      async () => {
        const response = ScheduleApi.getScheduleList();
        return response;
      },
      {
        enabled: isLoggedIn,
      }
    );
    return {
      isLoading,
      scheduleList: data?.data || [],
    };
  };

  return { useGetScheduleList };
};

export default useScheduleListQuery;
