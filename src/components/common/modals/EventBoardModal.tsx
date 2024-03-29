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
import useScheduleMutate from '@hooks/queries/useScheduleMutate';
import useAuthLogin from '@hooks/useAuthLogin';
import useEventSchedule from '@hooks/useEventSchedule';
import useModal, { ModalPropsType } from '@hooks/useModal';
import useMonthEvent from '@hooks/useMonthEvent';
import useToast, { ToastEnumType } from '@hooks/useToast';

interface EventBoardModalProps {
  modalProps: ModalPropsType;
}

const EventBoardModal: FC<EventBoardModalProps> = ({ modalProps }) => {
  const { boardDateTitle, handleClickSchedule } = useEventSchedule();
  const { currentDateMainlyEvent, currentDateHolidayEvent } = useMonthEvent();

  const { deleteSchedule } = useScheduleMutate();
  const { mutateAsync: deleteMutation } = deleteSchedule();
  const { isLoggedIn } = useAuthLogin();

  const createScheduleModal = useModal();
  const confirmModal = useModal();
  const { t } = useTranslation();
  const { replace, query } = useRouter();
  const { _id } = query;
  const { fontSize, modalButton, fontColor } = useTheme();
  const { showToast } = useToast();

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
            <StyledDate data-cy="calendar-modal-title-date">
              <h2>{boardDateTitle}</h2>
            </StyledDate>
            <ButtonBase
              type="button"
              onClick={() => {
                if (!isLoggedIn) {
                  showToast({ type: ToastEnumType.Error, message: t('common:toastMessage.afterLoggingIn') });
                  return;
                }
                createScheduleModal.showModal();
              }}
              backgroundColor="transparent"
            >
              <FlatIcon size={fontSize.s30} color={modalButton}>
                <PlusSvg />
              </FlatIcon>
            </ButtonBase>
          </ButtonGroup>
          {currentDateHolidayEvent.length > 0 && (
            <BoardList>
              <BoardTitle>{t('common:holiday')}</BoardTitle>
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
            <BoardTitle>{t('common:importantSchedule')}</BoardTitle>
            <BoardScheduleList>
              {currentDateMainlyEvent.length > 0 ? (
                currentDateMainlyEvent.map((event, index) => (
                  <BoardScheduleItem key={index}>
                    <div>
                      <EventCircle bgColor={event.bgColor} />
                      <span>{event.eventTitle}</span>
                    </div>
                    <ScheduleButtonGroup data-cy="schedule-modal-button-group">
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
                  <span>{t('common:noSchedule')}</span>
                </BoardScheduleItem>
              )}
            </BoardScheduleList>
          </BoardList>
        </ModalContent>
      </ModalBase>
      <RegisterModal modalProps={createScheduleModal} type={_id ? 'edit' : 'register'} />
      <ConfirmModal
        modalProps={confirmModal}
        confirmMethod={async () => {
          if (!_id) {
            return;
          }
          await deleteMutation({ _id: _id as string });
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

  h2 {
    font-size: ${({ theme }) => theme.fontSize.s18};
    font-weight: 500;
    color: ${({ theme }) => theme.modalButton};
  }
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
