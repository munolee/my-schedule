import { useQuery } from 'react-query';
import { useRecoilValue } from 'recoil';
import { ScheduleApi } from '@api/schedule';
import { currentTimeAtom } from '@store/currentTime';

const useHolidayListQuery = () => {
  const currentTime = useRecoilValue(currentTimeAtom);

  const useGetHolidayList = () => {
    const { isLoading, data } = useQuery(
      ['getHoliday', currentTime.year()],
      async () => {
        const response = ScheduleApi.getHolidayList(`year=${currentTime.year()}`);
        return response;
      },
      {}
    );
    return {
      isLoading,
      holidayList: data?.data || [],
    };
  };

  return { useGetHolidayList };
};

export default useHolidayListQuery;
