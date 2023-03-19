import { FC, PropsWithChildren, useEffect } from 'react';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { createPortal } from 'react-dom';
import { ModalPropsType } from '@hooks/useModal';

export enum ModalEnum {
  BottomSheet = 'bottomSheet',
  SecondBottomSheet = 'secondBottomSheet',
  Alert = 'alert',
}

interface ModalBaseType {
  modalProps: ModalPropsType;
  modalType?: ModalEnum;
}

const ModalBase: FC<PropsWithChildren<ModalBaseType>> = ({
  modalProps,
  modalType = ModalEnum.BottomSheet,
  children,
}) => {
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
      {isShow &&
        createPortal(
          <>
            <ModalContainer isShow={isShow} modalType={modalType}>
              {children && children}
            </ModalContainer>
            <Background isShow={isShow} onClick={hideModal} />
          </>,
          document.querySelector('#modal-root') as HTMLDivElement
        )}
    </>
  );
};

export default ModalBase;

const AlertModalCss = css`
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  width: auto;
  min-height: 200px;

  @keyframes fadeIn {
    0% {
      opacity: 0;
      transform: scale(0.7);
    }
    100% {
      opacity: 1;
      transform: scale(1);
    }
  }
  @keyframes fadeOut {
    0% {
      opacity: 1;
      transform: scale(1);
    }
    100% {
      opacity: 0;
      transform: scale(0.7);
    }
  }
`;

const ModalContainer = styled.div<{ isShow: boolean; modalType: ModalEnum }>`
  margin: 0 0 0 calc(33.333% - 1px);
  z-index: 10;
  position: fixed;
  bottom: 0;
  width: 100%;
  max-width: 600px;
  height: ${({ modalType }) => {
    if (modalType === ModalEnum.BottomSheet) {
      return '80vh';
    } else if (modalType === ModalEnum.SecondBottomSheet) {
      return '60vh';
    }
    return '100%';
  }};
  visibility: ${({ isShow }) => (isShow ? 'visible' : 'hidden')};
  animation: ${({ modalType, isShow }) => {
    if (modalType === ModalEnum.Alert) {
      if (isShow) {
        return `0.3s forwards fadeIn`;
      }
      return '0.2s ease forwards fadeOut';
    }

    if (isShow) {
      return '0.3s forwards slideIn';
    }
    return '0.2s ease forwards slideOut';
  }};

  @media (max-width: 900px) {
    margin: 0 auto;
    left: 0;
    right: 0;
  }

  @keyframes slideIn {
    0% {
      transform: translateY(100%);
    }
    100% {
      transform: translateY(0%);
    }
  }
  @keyframes slideOut {
    0% {
      transform: translateY(0%);
    }
    100% {
      transform: translateY(100%);
    }
  }
  ${({ modalType }) => {
    if (modalType === ModalEnum.Alert) {
      return css`${AlertModalCss};
      }
      `;
    }
  }}
`;

const Background = styled.div<{ isShow: boolean }>`
  width: 100%;
  height: 100%;
  position: fixed;
  left: 0;
  bottom: 0;
  visibility: ${({ isShow }) => (isShow ? 'visible' : 'hidden')};
  background-color: ${({ isShow }) => (isShow ? 'rgba(0, 0, 0, 0.5)' : 'rgba(0, 0, 0, 0)')};
  transition: background-color 0.3s ease;
`;
