import { atom } from 'recoil';
import { ToastMessage } from '@hooks/useToast';

export const toastMessageAtom = atom<ToastMessage[]>({
  key: 'toastMessageState',
  default: [],
});
