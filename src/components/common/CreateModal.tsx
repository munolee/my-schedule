import React, { FC } from 'react';
import styled from '@emotion/styled';
import ButtonBase from '@components/common/ButtonBase';
import ModalBase from '@components/common/ModalBase';
import { ModalPropsType } from '@hooks/useModal';

type CreateModalProps = {
  modalProps: ModalPropsType;
  method?: () => void;
};

const CreateModal: FC<CreateModalProps> = ({ modalProps, method }) => {
  return (
    <ModalBase modalProps={modalProps}>
      <StyledModalContainer>
        <ButtonBase
          onClick={() => {
            if (method) {
              method();
            }
          }}
          text="버튼"
        />
      </StyledModalContainer>
    </ModalBase>
  );
};

export default CreateModal;

const StyledModalContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  border-radius: 12px;
  width: 400px;
  height: 500px;
  //margin: 300px 200px;
  padding: 24px 16px 16px;
  opacity: 1;
  transition: all 0.2s ease-in-out;
  background-color: #ffffff;
`;
