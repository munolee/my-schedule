import { FC, useEffect } from 'react';
import { useTheme } from '@emotion/react';
import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import CloseSvg from '@assets/CloseSvg';
import ConfirmSvg from '@assets/ConfirmSvg';
import FlatIcon from '@components/common/FlatIcon';
import ButtonBase from '@components/common/buttons/ButtonBase';
import ModalBase from '@components/common/modals/ModalBase';
import { EventScheduleType } from '@hooks/useEventSchedule';
import { ModalPropsType } from '@hooks/useModal';

interface EventBoardModalProps {
  modalProps: ModalPropsType;
  currentDateEvent: EventScheduleType[];
}

const EventBoardModal: FC<EventBoardModalProps> = ({ modalProps, currentDateEvent }) => {
  const { replace } = useRouter();
  const { fontSize, modalButton } = useTheme();

  useEffect(() => {
    if (!modalProps.isShow) {
      replace('/');
    }
  }, [modalProps.isShow]);

  return (
    <ModalBase modalProps={modalProps}>
      <ModalContent>
        <ButtonGroup>
          <ButtonBase type="button" onClick={() => modalProps.hideModal()} backgroundColor="transparent">
            <FlatIcon size={fontSize.s30} color={modalButton}>
              <CloseSvg />
            </FlatIcon>
          </ButtonBase>
          <ButtonBase type="submit" backgroundColor="transparent">
            <FlatIcon size={fontSize.s30} color={modalButton}>
              <ConfirmSvg />
            </FlatIcon>
          </ButtonBase>
        </ButtonGroup>

        <EventBoardList>
          <BoardItem>
            <div>주요 일정</div>
            {currentDateEvent.length > 0 ? (
              <BoardScheduleList>
                {currentDateEvent.map((event, index) => (
                  <BoardScheduleItem key={index}>
                    <ScheduleEventCircle bgColor={event.bgColor} />
                    <span>{event.eventTitle}</span>
                  </BoardScheduleItem>
                ))}
              </BoardScheduleList>
            ) : (
              <></>
            )}
          </BoardItem>
        </EventBoardList>
      </ModalContent>
    </ModalBase>
  );
};

export default EventBoardModal;

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
  padding: 0 0 !important;
  display: flex;
  justify-content: space-between !important;
  flex-direction: row !important;
`;

const EventBoardList = styled.div`
  display: inline;
`;

const BoardItem = styled.div`
  padding: 2rem 2rem 2.5rem 2.5rem;
  margin-bottom: 2rem;
  width: 20rem;
  max-height: 40rem;
  text-align: left;
  background-color: ${({ theme }) => theme.background};
  border-spacing: 0;
  border-radius: 0.5rem;
  box-shadow: 0 0 1rem 0 rgba(0, 0, 0, 0.05);
  overflow-y: auto;

  span {
    font-size: ${({ theme }) => theme.fontSize.s14};
    color: ${({ theme }) => theme.fontColor};
  }
`;

const BoardScheduleList = styled.ul`
  max-height: 18rem;
  overflow-y: auto;
`;

const BoardScheduleItem = styled.li`
  margin-top: 1rem;
  vertical-align: middle;
`;

const ScheduleEventCircle = styled.div<{ bgColor: string }>`
  margin-right: 0.5rem;
  padding: 0;
  width: 1.2rem;
  height: 1.2rem;
  display: inline-block;
  border-radius: 5rem;
  background-color: ${({ bgColor }) => bgColor};
`;
