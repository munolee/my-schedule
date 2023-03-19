import { FC, useEffect } from 'react';
import { useTheme } from '@emotion/react';
import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import DeleteSvg from '@assets/DeleteSvg';
import EditSvg from '@assets/EditSvg';
import PlusSvg from '@assets/PlusSvg';
import FlatIcon from '@components/common/FlatIcon';
import ButtonBase from '@components/common/buttons/ButtonBase';
import ConfirmModal from '@components/common/modals/ConfirmModal';
import ModalBase, { ModalEnum } from '@components/common/modals/ModalBase';
import RegisterModal from '@components/common/modals/RegisterModal';
import useEventSchedule from '@hooks/useEventSchedule';
import useModal, { ModalPropsType } from '@hooks/useModal';

interface EventBoardModalProps {
  modalProps: ModalPropsType;
}

const EventBoardModal: FC<EventBoardModalProps> = ({ modalProps }) => {
  const { currentDateMainlyEvent, currentDateHolidayEvent, boardDateTitle, handleClickSchedule, deleteSchedule } =
    useEventSchedule();
  const { mutateAsync } = deleteSchedule();
  const createScheduleModal = useModal();
  const confirmModal = useModal();
  const { t } = useTranslation();
  const { replace, query } = useRouter();
  const { _id } = query;
  const { fontSize, modalButton, fontColor } = useTheme();

  useEffect(() => {
    if (!modalProps.isShow) {
      replace('/');
    }
  }, [modalProps.isShow]);

  return (
    <>
      <ModalBase modalProps={modalProps} modalType={ModalEnum.BottomSheet}>
        <ModalContent>
          <ButtonGroup>
            <StyledDate>{boardDateTitle}</StyledDate>
            <ButtonBase type="button" onClick={() => createScheduleModal.showModal()} backgroundColor="transparent">
              <FlatIcon size={fontSize.s30} color={modalButton}>
                <PlusSvg />
              </FlatIcon>
            </ButtonBase>
          </ButtonGroup>
          {currentDateHolidayEvent.length > 0 && (
            <BoardList>
              <BoardTitle>공휴일</BoardTitle>
              <BoardScheduleList>
                {currentDateHolidayEvent.map((event, index) => (
                  <BoardScheduleItem key={index}>
                    <EventCircle bgColor={event.bgColor} />
                    <span>{event.eventTitle}</span>
                  </BoardScheduleItem>
                ))}
              </BoardScheduleList>
            </BoardList>
          )}
          <BoardList>
            <BoardTitle>주요 일정</BoardTitle>
            <BoardScheduleList>
              {currentDateMainlyEvent.length > 0 ? (
                currentDateMainlyEvent.map((event, index) => (
                  <BoardScheduleItem key={index}>
                    <div>
                      <EventCircle bgColor={event.bgColor} />
                      <span>{event.eventTitle}</span>
                    </div>
                    <ScheduleButtonGroup>
                      <ButtonBase
                        type="button"
                        backgroundColor="transparent"
                        onClick={() =>
                          handleClickSchedule(event, () => {
                            createScheduleModal.showModal();
                          })
                        }
                      >
                        <FlatIcon size={fontSize.s20} color={fontColor}>
                          <EditSvg />
                        </FlatIcon>
                      </ButtonBase>
                      <ButtonBase
                        type="button"
                        backgroundColor="transparent"
                        onClick={() => {
                          handleClickSchedule(event, () => {
                            confirmModal.showModal();
                          });
                        }}
                      >
                        <FlatIcon size={fontSize.s16} color={fontColor}>
                          <DeleteSvg />
                        </FlatIcon>
                      </ButtonBase>
                    </ScheduleButtonGroup>
                  </BoardScheduleItem>
                ))
              ) : (
                <BoardScheduleItem>
                  <span>일정이 없습니다.</span>
                </BoardScheduleItem>
              )}
            </BoardScheduleList>
          </BoardList>
        </ModalContent>
      </ModalBase>
      <RegisterModal modalProps={createScheduleModal} type="edit" />
      <ConfirmModal
        modalProps={confirmModal}
        confirmMethod={async () => {
          if (!_id) {
            return;
          }
          await mutateAsync({ _id: _id as string });
        }}
        text={t('common:confirmDelete')}
        subText={t('common:unableToRecover')}
        buttonText={t('common:alert.delete')}
      />
    </>
  );
};

export default EventBoardModal;

const ModalContent = styled.div`
  padding: 1.6rem 0.8rem;
  width: 100%;
  height: 100%;
  background-color: ${({ theme }) => theme.background};
  border-radius: 1.6rem 1.6rem 0 0;
  box-shadow: 0 0 1rem 1rem rgba(0, 0, 0, 0.05);

  @media (max-width: 900px) {
    padding: 1.6rem 0.2rem;
  }
`;

const StyledDate = styled.div`
  padding: 0 1.2rem;
  display: flex;
  align-items: center;
  font-size: ${({ theme }) => theme.fontSize.s18};
  font-weight: 500;
  color: ${({ theme }) => theme.modalButton};
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: row;
`;

const BoardList = styled.div`
  padding: 1.6rem 1.2rem;
`;

const BoardTitle = styled.h2`
  margin-bottom: 0.4rem;
  font-size: ${({ theme }) => theme.fontSize.s16};
  font-weight: 500;
  color: ${({ theme }) => theme.fontColor};
`;

const BoardScheduleList = styled.ul`
  max-height: 60vh;
  overflow-y: auto;
`;

const BoardScheduleItem = styled.li`
  padding: 1.6rem 2rem;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: 0.8rem;

  &:hover {
    background-color: ${({ theme }) => theme.calendarBorder};
  }

  > div {
    display: flex;
    align-items: center;
  }

  span {
    flex: 1;
    font-size: ${({ theme }) => theme.fontSize.s14};
    font-weight: 600;
    color: ${({ theme }) => theme.fontColor};
  }
`;

const EventCircle = styled.div<{ bgColor: string }>`
  margin-right: 0.5rem;
  padding: 0;
  width: 1.2rem;
  height: 1.2rem;
  display: inline-block;
  border-radius: 5rem;
  background-color: ${({ bgColor }) => bgColor};
`;

const ScheduleButtonGroup = styled.div`
  opacity: 0.8;
`;
