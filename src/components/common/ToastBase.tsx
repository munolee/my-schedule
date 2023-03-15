import { FC, useEffect } from 'react';
import styled from '@emotion/styled';
import useToast, { ToastEnumType } from '@hooks/useToast';

const ToastBase: FC = () => {
  const { toastMessage, hideToast } = useToast();

  useEffect(() => {
    const timeout = setTimeout(() => {
      hideToast();
    }, 2400);
    return () => clearTimeout(timeout);
  }, [toastMessage]);

  return (
    <ToastContainer>
      {toastMessage.map((toast, index) => (
        <ToastContent key={index} type={toast.type}>
          <StyledText>{toast.message}</StyledText>
        </ToastContent>
      ))}
    </ToastContainer>
  );
};

export default ToastBase;

export const ToastContainer = styled.div`
  z-index: 12;
  position: fixed;
  top: 2rem;

  @media (max-width: 900px) {
    left: 1.2rem;
  }
`;

const ToastContent = styled.div<{ type: ToastEnumType }>`
  margin-top: 0.8rem;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  min-width: 50rem;
  min-height: 4.6rem;
  border-radius: 0.8rem;
  background-color: ${({ theme }) => theme.colors.toast};
  color: ${({ theme, type }) => {
    if (type === ToastEnumType.Success) {
      return theme.colors.success;
    } else if (type === ToastEnumType.Info) {
      return theme.colors.info;
    } else {
      return theme.colors.error;
    }
  }};
  opacity: 0;

  @media (max-width: 900px) {
    width: calc(100vw - 2.4rem);
    min-width: 30rem;
  }

  @keyframes fadeIn {
    100% {
      opacity: 0.9;
    }
  }

  @keyframes fadeOut {
    100% {
      opacity: 0;
      visibility: hidden;
    }
  }

  @keyframes hide {
    100% {
      position: absolute;
      bottom: -2000px;
    }
  }
  animation: 0.2s cubic-bezier(0.65, 0, 0.35, 1) 0.1s forwards fadeIn,
    0.3s cubic-bezier(0.65, 0, 0.35, 1) 2s forwards fadeOut, 0s step-end 2.4s forwards hide;
`;

const StyledText = styled.div`
  padding: 1.4rem 4.8rem;
  font-size: ${({ theme }) => theme.fontSize.s16};
  font-weight: 500;
`;
