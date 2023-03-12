import styled from '@emotion/styled';
import { FC } from 'react';

const Spinner: FC = () => {
  return (
    <SpinnerWrapper>
      <StyledSpinner />
    </SpinnerWrapper>
  );
};

const StyledSpinner = styled.div`
  border: ${({ theme }) => `0.3rem solid ${theme.colors.gray010}`};
  border-top: ${({ theme }) => `0.3rem solid ${theme.colors.orange010}`};
  border-radius: 50%;
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
