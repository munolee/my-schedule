import { FC, useState } from 'react';
import styled from '@emotion/styled';
import { useForm, FieldValues } from 'react-hook-form';
import { ModalPropsType } from '@hooks/useModal';
import { UseMutationResult } from 'react-query';
import { EventScheduleType } from '@hooks/useEventSchedule';
import ModalBase from '@components/common/ModalBase';
import ButtonBase from '@components/common/ButtonBase';

interface CreateModalProps {
  modalProps: ModalPropsType;
  mutateMethod: () => UseMutationResult<EventScheduleType, unknown, EventScheduleType, unknown>;
}

const CreateModal: FC<CreateModalProps> = ({ modalProps, mutateMethod }) => {
  const [selectBgColor, setSelectBgColor] = useState<string>('#cfdd8e');
  const { mutateAsync } = mutateMethod();

  const initValues = {
    eventTitle: '',
    startDate: '',
    endDate: '',
    bgColor: '#cfdd8e',
    typeId: 0,
  };
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    mode: 'onChange',
    defaultValues: initValues,
  });

  const onSubmit = async (data: FieldValues) => {
    await mutateAsync(data as EventScheduleType);
    resetFormModal();
  };

  const resetFormModal = () => {
    setSelectBgColor(initValues.bgColor);
    reset(initValues);
    modalProps.hideModal();
  };

  const eventBgColors = ['#cfdd8e', '#eeb8b8', '#6eceda', '#b57fb3', '#f5ddad'];
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
                  value: 2,
                  message: '일정 제목은 최소 2글자 이상 입력해주세요.',
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
            <input id="event-bg-color" type="text" value={selectBgColor} {...register('bgColor')} />
            <ColorPickerFiled>
              {eventBgColors.map((color) => (
                <ColorPicker
                  key={color}
                  active={selectBgColor === color}
                  color={color}
                  onClick={() => setSelectBgColor(color)}
                />
              ))}
            </ColorPickerFiled>
          </div>
          <input type="hidden" {...register('typeId')} />
          <ButtonGroup>
            <ButtonBase
              type="button"
              text="취소"
              onClick={resetFormModal}
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
      font-size: 15px;
      font-weight: 500;
      color: #666666;
      border: 1px solid #999999;
      border-radius: 4px;
    }
  }

  label {
    font-size: 16px;
    font-weight: 500;
  }
`;

const ColorPickerFiled = styled.div`
  display: flex;
  flex-direction: row;
  gap: 10px;
`;

const ColorPicker = styled.div<{ active: boolean; color: string }>`
  width: 60px;
  height: 40px;
  border: 2px solid ${({ active }) => (active ? '#333333' : 'none')};
  border-radius: 4px;
  background-color: ${({ color }) => color};
  cursor: pointer;
`;

const ErrorMessage = styled.em`
  font-size: 14px;
  font-weight: 200;
  font-style: normal;
  color: #ff0d37;
`;

const ButtonGroup = styled.div`
  margin-top: 12px;
  margin-left: auto;
  display: flex;
  flex-direction: row !important;
`;
