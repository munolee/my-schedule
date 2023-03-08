import { FC } from 'react';
import styled from '@emotion/styled';

type SpinnerProps = {
  wrap?: boolean;
};

const Spinner: FC<SpinnerProps> = ({ wrap = false }) => {
  return (
    <SpinnerWrapper>
      <StyledSpinner />
    </SpinnerWrapper>
  );
};

const StyledSpinner = styled.div`
  border: 3px solid #f3f3f3;
  border-radius: 50%;
  border-top: 3px solid #edaa7d;
  width: 48px;
  height: 48px;
  -webkit-animation: spin 2s linear infinite;
  animation: spin 2s linear infinite;

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

const SpinnerWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 75vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(255, 255, 255, 0.6);
`;

export default Spinner;
