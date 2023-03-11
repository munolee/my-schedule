import { FC } from 'react';
import styled from '@emotion/styled';
import { useForm, FieldValues } from 'react-hook-form';
import { ModalPropsType } from '@hooks/useModal';
import { UseMutationResult } from 'react-query';
import { EventScheduleType } from '@hooks/useEventSchedule';
import ModalBase from '@components/common/ModalBase';
import ButtonBase from '@components/common/ButtonBase';

type CreateModalProps = {
  modalProps: ModalPropsType;
  mutateMethod: () => UseMutationResult<EventScheduleType, unknown, EventScheduleType, unknown>;
};

const CreateModal: FC<CreateModalProps> = ({ modalProps, mutateMethod }) => {
  const { mutateAsync } = mutateMethod();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    mode: 'onSubmit',
    defaultValues: {
      eventTitle: '',
      startDate: '',
      endDate: '',
      bgColor: '#cfdd8e',
      typeId: 0,
    },
  });

  const onSubmit = async (data: FieldValues) => {
    console.log(errors);
    await mutateAsync(data as EventScheduleType);
    reset();
  };

  return (
    <ModalBase modalProps={modalProps}>
      <ModalContent>
        <h2>일정 생성</h2>
        <StyledForm onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label htmlFor="event-title">일정 제목</label>
            <input
              id="event-title"
              type="text"
              placeholder="일정 제목을 입력해주세요."
              {...register('eventTitle', {
                required: true,
                minLength: {
                  value: 4,
                  message: '일정 제목은 최소 4글자 이상 입력해주세요.',
                },
              })}
            />
            {errors.eventTitle && <ErrorMessage>{errors.eventTitle?.message}</ErrorMessage>}
          </div>
          <div>
            <label htmlFor="start-date">일정 시작일</label>
            <input
              id="start-date"
              type="date"
              placeholder="startDate"
              {...register('startDate', {
                required: true,
                minLength: { value: 10, message: '일정 시작일을 선택해주세요.' },
              })}
            />
            {errors.startDate && <ErrorMessage>{errors.startDate?.message}</ErrorMessage>}
          </div>
          <div>
            <label htmlFor="end-date">일정 종료일</label>
            <input
              id="end-date"
              type="date"
              placeholder="endDate"
              {...register('endDate', {
                required: true,
                minLength: { value: 10, message: '일정 시작일을 선택해주세요.' },
              })}
            />
            {errors.endDate && <ErrorMessage>{errors.endDate?.message}</ErrorMessage>}
          </div>
          <div>
            <label htmlFor="event-bg-color">일정 색상</label>
            <input id="event-bg-color" type="color" {...register('bgColor')} />
          </div>
          <input type="hidden" {...register('typeId')} />
          <ButtonGroup>
            <ButtonBase
              type="button"
              text="취소"
              onClick={modalProps.hideModal}
              width={80}
              height={40}
              textColor="#333333"
              backgroundColor="#ffffff"
              borderColor="#666666"
            />
            <ButtonBase type="submit" text="생성" width={80} height={40} backgroundColor="#333333" />
          </ButtonGroup>
        </StyledForm>
      </ModalContent>
    </ModalBase>
  );
};

export default CreateModal;

const ModalContent = styled.div`
  padding: 34px 28px;
  width: 400px;
  background-color: #ffffff;
  border-radius: 8px;
  transition: all 0.2s ease-in-out;
`;

const StyledForm = styled.form`
  margin-top: 24px;
  display: flex;
  gap: 14px;
  align-items: flex-start;
  flex-direction: column;

  > div {
    display: flex;
    gap: 4px;
    justify-content: center;
    flex-direction: column;

    input {
      margin-bottom: 12px;
      padding: 0 8px;
      width: 340px;
      min-height: 40px;
      font-size: 16px;
      font-weight: 500;
      color: #666666;
      border: 1px solid #dddddd;
      border-radius: 4px;
    }
  }

  label {
    font-size: 18px;
    font-weight: 500;
  }
`;

const ErrorMessage = styled.em`
  font-size: 14px;
  font-weight: 200;
  font-style: normal;
  color: #ff0d37;
`;

const ButtonGroup = styled.div`
  margin-left: auto;
  display: flex;
  flex-direction: row !important;
`;
