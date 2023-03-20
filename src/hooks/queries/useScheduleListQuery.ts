import { useQuery } from 'react-query';
import { useSetRecoilState } from 'recoil';
import { ScheduleApi } from '@api/schedule';
import useAuthLogin from '@hooks/useAuthLogin';
import { eventScheduleAtom } from '@store/eventSchedule';

const useScheduleListQuery = () => {
  const setEventSchedule = useSetRecoilState(eventScheduleAtom);
  const { isLoggedIn } = useAuthLogin();

  const useGetScheduleList = () => {
    const { isLoading } = useQuery(
      ['getSchedule'],
      async () => {
        const response = ScheduleApi.getScheduleList();
        return response;
      },
      {
        enabled: isLoggedIn,
        onSuccess: (data) => {
          if (!data) {
            return;
          }
          setEventSchedule(data.data);
        },
      }
    );
    return {
      isLoading,
    };
  };

  return { useGetScheduleList };
};

export default useScheduleListQuery;
