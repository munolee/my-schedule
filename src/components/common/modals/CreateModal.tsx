import { FC } from 'react';
import styled from '@emotion/styled';
import { UseMutationResult } from 'react-query';
import ModalBase from '@components/common/modals/ModalBase';
import ScheduleForm from '@components/forms/ScheduleForm';
import { EventScheduleType } from '@hooks/useEventSchedule';
import { ModalPropsType } from '@hooks/useModal';

interface CreateModalProps {
  modalProps: ModalPropsType;
  mutateMethod: () => UseMutationResult<EventScheduleType, unknown, EventScheduleType, unknown>;
}

const CreateModal: FC<CreateModalProps> = ({ modalProps, mutateMethod }) => {
  return (
    <ModalBase modalProps={modalProps}>
      <ModalContent>
        <ScheduleForm modalProps={modalProps} mutateMethod={mutateMethod} />
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
