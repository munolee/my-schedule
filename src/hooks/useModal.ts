import React, { useState, useCallback } from 'react';

export type ModalPropsType = {
  isShow: boolean;
  showModal: () => void;
  hideModal: (e: React.MouseEvent) => void;
};

const useModal = (): ModalPropsType => {
  const [isShow, setIsShow] = useState(false);

  const showModal = useCallback(() => {
    if (!isShow) {
      setIsShow(true);
    }
  }, [isShow]);

  const hideModal = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      if (e.target !== e.currentTarget) {
        return;
      }
      setIsShow(false);
    },
    [isShow]
  );

  return { isShow, showModal, hideModal };
};

export default useModal;
