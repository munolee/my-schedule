import { useQuery } from 'react-query';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { ScheduleApi } from '@api/schedule';
import { currentTimeAtom } from '@store/currentTime';
import { holidayAtom } from '@store/holiday';

const useHolidayListQuery = () => {
  const currentTime = useRecoilValue(currentTimeAtom);
  const setHoliday = useSetRecoilState(holidayAtom);

  const useGetHolidayList = () => {
    const { isLoading } = useQuery(
      ['getHoliday', currentTime.year()],
      async () => {
        const response = ScheduleApi.getHolidayList(`year=${currentTime.year()}`);
        return response;
      },
      {
        onSuccess: (data) => {
          if (!data) {
            return;
          }
          setHoliday(data.data);
        },
      }
    );
    return {
      isLoading,
    };
  };

  return { useGetHolidayList };
};

export default useHolidayListQuery;
