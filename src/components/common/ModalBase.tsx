import { FC, PropsWithChildren } from 'react';
import styled from '@emotion/styled';
import { CSSTransition } from 'react-transition-group';
import { ModalPropsType } from '@hooks/useModal';

type ModalBaseType = {
  modalProps: ModalPropsType;
};

const ModalBase: FC<PropsWithChildren<ModalBaseType>> = ({ modalProps, children }) => {
  const { isShow, hideModal } = modalProps;
  return (
    <>
      <ModalContainer isShow={isShow} onClick={(e) => hideModal(e)}>
        <CSSTransition in={isShow} mountOnEnter unmountOnExit timeout={700} classNames={'modal'}>
          {children && children}
        </CSSTransition>
      </ModalContainer>
    </>
  );
};

export default ModalBase;

const ModalContainer = styled.div<{ isShow: boolean }>`
  z-index: 20;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
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
