import { useQuery } from 'react-query';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { ScheduleApi } from '@api/schedule';
import { currentTimeAtom } from '@store/currentTime';
import { eventScheduleAtom } from '@store/eventSchedule';

const useScheduleListQuery = () => {
  const currentTime = useRecoilValue(currentTimeAtom);
  const setEventSchedule = useSetRecoilState(eventScheduleAtom);

  const useGetScheduleList = () => {
    const { isLoading } = useQuery(
      ['getSchedule', currentTime.year()],
      async () => {
        const response = ScheduleApi.getScheduleList(`year=${currentTime.year()}`);
        return response;
      },
      {
        onSuccess: (data) => {
          if (!data) {
            return;
          }
          setEventSchedule(data);
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
