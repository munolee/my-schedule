import { FC } from 'react';
import styled from '@emotion/styled';

interface SpinnerProps {
  wrap?: boolean;
}

const Spinner: FC<SpinnerProps> = ({ wrap = false }) => {
  return (
    <SpinnerWrapper>
      <StyledSpinner />
    </SpinnerWrapper>
  );
};

const StyledSpinner = styled.div`
  border: 0.3rem solid #f3f3f3;
  border-radius: 50%;
  border-top: 0.3rem solid #edaa7d;
  width: 4.8rem;
  height: 4.8rem;
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
