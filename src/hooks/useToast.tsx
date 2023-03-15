import { useRecoilState } from 'recoil';
import { toastMessageAtom } from '@store/toastMessage';

export enum ToastEnumType {
  Success = 'success',
  Error = 'error',
  Info = 'info',
}

export interface ToastMessage {
  type: ToastEnumType;
  message: string;
}

interface UseToastType {
  toastMessage: ToastMessage[];
  showToast: (message: ToastMessage) => void;
  hideToast: () => void;
}

export const useToast = (): UseToastType => {
  const [toastMessage, setToastMessages] = useRecoilState(toastMessageAtom);

  const showToast = (message: ToastMessage) => {
    setToastMessages([...toastMessage, message]);
  };

  const hideToast = () => {
    setToastMessages([]);
  };

  return {
    toastMessage,
    showToast,
    hideToast,
  };
};

export default useToast;
