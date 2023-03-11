import React, { useState, useCallback } from 'react';

export interface ModalPropsType {
  isShow: boolean;
  showModal: () => void;
  hideModal: (event?: React.MouseEvent) => void;
}

const useModal = (): ModalPropsType => {
  const [isShow, setIsShow] = useState(false);

  const showModal = useCallback(() => {
    if (!isShow) {
      setIsShow(true);
    }
  }, [isShow]);

  const hideModal = useCallback(
    (event?: React.MouseEvent) => {
      if (event) {
        event.stopPropagation();
        if (event.target !== event.currentTarget) {
          return;
        }
      }
      setIsShow(false);
    },
    [isShow]
  );

  return { isShow, showModal, hideModal };
};

export default useModal;
