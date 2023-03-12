import styled from '@emotion/styled';
import { FC, PropsWithChildren, useEffect } from 'react';
import { CSSTransition } from 'react-transition-group';
import { ModalPropsType } from '@hooks/useModal';

interface ModalBaseType {
  modalProps: ModalPropsType;
}

const ModalBase: FC<PropsWithChildren<ModalBaseType>> = ({ modalProps, children }) => {
  const { isShow, hideModal } = modalProps;

  useEffect(() => {
    if (isShow) {
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.body.style.removeProperty('overflow');
    };
  }, [isShow]);

  return (
    <>
      <ModalContainer isShow={isShow} onClick={hideModal}>
        <CSSTransition in={isShow} mountOnEnter unmountOnExit timeout={700} classNames={'modal'}>
          {children && children}
        </CSSTransition>
      </ModalContainer>
    </>
  );
};

export default ModalBase;

const ModalContainer = styled.div<{ isShow: boolean }>`
  z-index: 10;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  visibility: ${({ isShow }) => (isShow ? 'visible' : 'hidden')};
  background-color: ${({ isShow }) => (isShow ? 'rgba(0, 0, 0, 0.4)' : 'none')};

  .modal-enter {
    opacity: 0;
    transform: scale(0.7);
  }
  .modal-enter-active {
    opacity: 1;
    transform: scale(1);
    transition: all 0.2s ease-in-out;
  }
  .modal-exit {
    opacity: 1;
    transform: scale(1);
  }
  .modal-exit-active {
    opacity: 0;
    transform: scale(0.7);
    transition: all 0.2s ease-in-out;
  }
`;
