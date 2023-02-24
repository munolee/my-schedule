import { useRecoilValue } from 'recoil';
import { currentTimeAtom } from '@store/currentTime';

const useCalendar = () => {
  const currentTime = useRecoilValue(currentTimeAtom);

  console.log(currentTime);
  return {};
};

export default useCalendar;
