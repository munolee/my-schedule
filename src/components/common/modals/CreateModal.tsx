import { FC, useRef } from 'react';
import { useTheme } from '@emotion/react';
import styled from '@emotion/styled';
import CloseSvg from '@assets/CloseSvg';
import ConfirmSvg from '@assets/ConfirmSvg';
import FlatIcon from '@components/common/FlatIcon';
import ButtonBase from '@components/common/buttons/ButtonBase';
import ModalBase from '@components/common/modals/ModalBase';
import ScheduleForm from '@components/forms/ScheduleForm';
import { ModalPropsType } from '@hooks/useModal';

interface CreateModalProps {
  modalProps: ModalPropsType;
}

const CreateModal: FC<CreateModalProps> = ({ modalProps }) => {
  const { fontSize, modalButton } = useTheme();
  const submitRef = useRef<HTMLInputElement | null>(null);

  return (
    <ModalBase modalProps={modalProps}>
      <ModalContent>
        <ButtonGroup>
          <ButtonBase type="button" onClick={() => modalProps.hideModal()} backgroundColor="transparent">
            <FlatIcon size={fontSize.s30} color={modalButton}>
              <CloseSvg />
            </FlatIcon>
          </ButtonBase>
          <ButtonBase type="button" backgroundColor="transparent" onClick={() => submitRef.current?.click()}>
            <FlatIcon size={fontSize.s30} color={modalButton}>
              <ConfirmSvg />
            </FlatIcon>
          </ButtonBase>
        </ButtonGroup>
        <ScheduleForm modalProps={modalProps} submitRef={submitRef} />
      </ModalContent>
    </ModalBase>
  );
};

export default CreateModal;

const ModalContent = styled.div`
  padding: 1.6rem 0.8rem;
  width: 100%;
  height: 100%;
  background-color: ${({ theme }) => theme.calendarBackground};
  border-radius: 1.6rem 1.6rem 0 0;

  @media (max-width: 900px) {
    padding: 1.6rem 0.2rem;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: row;
`;
