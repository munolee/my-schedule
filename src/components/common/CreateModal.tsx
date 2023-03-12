import { FC, useState } from 'react';
import { useTheme } from '@emotion/react';
import styled from '@emotion/styled';
import moment from 'moment';
import { useForm, FieldValues } from 'react-hook-form';
import { UseMutationResult } from 'react-query';
import CloseSvg from '@assets/CloseSvg';
import ConfirmSvg from '@assets/ConfirmSvg';
import ButtonBase from '@components/common/ButtonBase';
import FlatIcon from '@components/common/FlatIcon';
import ModalBase from '@components/common/ModalBase';
import { DATE_FORMAT } from '@constants/format';
import { EventScheduleType } from '@hooks/useEventSchedule';
import { ModalPropsType } from '@hooks/useModal';

interface CreateModalProps {
  modalProps: ModalPropsType;
  mutateMethod: () => UseMutationResult<EventScheduleType, unknown, EventScheduleType, unknown>;
}

const CreateModal: FC<CreateModalProps> = ({ modalProps, mutateMethod }) => {
  const [selectBgColor, setSelectBgColor] = useState<string>('#cfdd8e');
  const { mutateAsync } = mutateMethod();
  const { colors, fontColor, fontSize } = useTheme();

  const initValues = {
    eventTitle: '',
    startDate: moment().format(DATE_FORMAT.BASIC_FORMAT),
    endDate: moment().format(DATE_FORMAT.BASIC_FORMAT),
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
        <ButtonGroup>
          <ButtonBase type="button" text="취소" onClick={resetFormModal} backgroundColor="transparent">
            <FlatIcon size={fontSize.s30} color={colors.blue020}>
              <CloseSvg />
            </FlatIcon>
          </ButtonBase>
          <ButtonBase type="submit" text="생성" backgroundColor="transparent">
            <FlatIcon size={fontSize.s30} color={colors.blue020}>
              <ConfirmSvg />
            </FlatIcon>
          </ButtonBase>
        </ButtonGroup>
        <StyledForm onSubmit={handleSubmit(onSubmit)}>
          <div>
            <input
              type="text"
              placeholder="일정 제목"
              autoFocus
              {...register('eventTitle', {
                required: true,
                minLength: {
                  value: 2,
                  message: '일정 제목은 최소 2글자 이상 입력해주세요.',
                },
                maxLength: {
                  value: 10,
                  message: '일정 제목은 최대 10글자 이하로 입력해주세요.',
                },
              })}
            />
            {errors.eventTitle && <ErrorMessage>{errors.eventTitle?.message}</ErrorMessage>}
          </div>
          <div>
            <input
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
            <input
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
            <input type="hidden" value={selectBgColor} {...register('bgColor')} />
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
        </StyledForm>
      </ModalContent>
    </ModalBase>
  );
};

export default CreateModal;

const ModalContent = styled.div`
  padding: 3.2rem 2.4rem;
  width: 100%;
  height: 100%;
  background-color: ${({ theme }) => theme.calendarBackground};
  border-radius: 1.2rem;
`;

const StyledForm = styled.form`
  margin-top: 2.4rem;
  display: flex;
  gap: 1.4rem;
  align-items: flex-start;
  flex-direction: column;

  > div {
    display: flex;
    gap: 0.4rem;
    justify-content: center;
    flex-direction: column;

    input {
      margin-bottom: 1.2rem;
      padding: 0 0.8rem;
      width: 30rem;
      min-height: 4rem;
      font-size: ${({ theme }) => theme.fontSize.s18};
      font-weight: 500;
      color: ${({ theme }) => theme.fontColor};
      background-color: transparent;
      border: 0.1rem solid transparent;
      border-bottom: 0.1rem solid ${({ theme }) => theme.fontColor};
      border-radius: 0;

      &::placeholder {
        color: ${({ theme }) => theme.colors.gray030};
      }
    }
  }

  label {
    font-size: ${({ theme }) => theme.fontSize.s14};
    font-weight: 500;
  }
`;

const ColorPickerFiled = styled.div`
  display: flex;
  flex-direction: row;
  gap: 1rem;
`;

const ColorPicker = styled.div<{ active: boolean; color: string }>`
  width: 4.8rem;
  height: 3.2rem;
  border: 0.2rem solid ${({ active, theme }) => (active ? theme.fontColor : 'none')};
  border-radius: 0.4rem;
  background-color: ${({ color }) => color};
  cursor: pointer;
`;

const ErrorMessage = styled.em`
  font-size: ${({ theme }) => theme.fontSize.s12};
  font-weight: 200;
  font-style: normal;
  color: ${({ theme }) => theme.colors.red020};
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: space-between;
`;
