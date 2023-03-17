import { FC, useState, MutableRefObject } from 'react';
import { useTheme } from '@emotion/react';
import styled from '@emotion/styled';
import { useTranslation } from 'next-i18next';
import { useForm, FieldValues } from 'react-hook-form';
import useEventSchedule, { EventScheduleType } from '@hooks/useEventSchedule';
import { ModalPropsType } from '@hooks/useModal';

interface ScheduleFormProps {
  modalProps: ModalPropsType;
  initSchedule?: EventScheduleType;
  submitRef: MutableRefObject<HTMLInputElement | null>;
}

const ScheduleForm: FC<ScheduleFormProps> = ({ modalProps, initSchedule, submitRef }) => {
  const { createSchedule, initScheduleValues } = useEventSchedule();
  const { mutateAsync } = createSchedule();
  const { colors } = useTheme();
  const { t } = useTranslation();
  const [selectBgColor, setSelectBgColor] = useState<string>(colors.event1);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    mode: 'onChange',
    defaultValues: initSchedule || initScheduleValues,
  });

  const onSubmit = async (data: FieldValues) => {
    await mutateAsync(data as EventScheduleType);
    modalProps.hideModal();
  };

  const eventBgColors = [colors.event1, colors.event2, colors.event3, colors.event4, colors.event5];
  return (
    <StyledForm onSubmit={handleSubmit(onSubmit)} autoComplete="off">
      <div>
        <input
          type="text"
          placeholder={t('common:scheduleTitle')}
          autoFocus
          {...register('eventTitle', {
            required: true,
            minLength: {
              value: 2,
              message: t('common:errorMessage.titleMinLength'),
            },
            maxLength: {
              value: 10,
              message: t('common:errorMessage.titleMaxLength'),
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
            minLength: { value: 10, message: t('common:errorMessage.selectStartDate') },
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
            minLength: { value: 10, message: t('common:errorMessage.selectEndDate') },
          })}
        />
        {errors.endDate && <ErrorMessage>{errors.endDate?.message}</ErrorMessage>}
      </div>
      <div>
        <input type="hidden" {...register('bgColor')} />
        <ColorPickerFiled>
          {eventBgColors.map((color) => (
            <ColorPicker
              key={color}
              active={selectBgColor === color}
              color={color}
              onClick={() => {
                setSelectBgColor(color);
                setValue('bgColor', color);
              }}
            />
          ))}
        </ColorPickerFiled>
      </div>
      <input type="hidden" {...register('typeId')} />
      <input type="submit" style={{ display: 'none' }} ref={submitRef} />
    </StyledForm>
  );
};

export default ScheduleForm;

const StyledForm = styled.form`
  > div {
    margin-top: 3.6rem;
    padding: 0 2.4rem;
    display: flex;
    gap: 0.4rem;
    justify-content: center;
    flex-direction: column;

    &:first-of-type {
      margin-top: 0;
    }

    input {
      padding: 0 0.8rem;
      width: 100%;
      min-height: 4rem;
      font-size: ${({ theme }) => theme.fontSize.s18};
      font-weight: 500;
      color: ${({ theme }) => theme.fontColor};
      background-color: transparent;
      border: 0.1rem solid transparent;
      border-bottom: 0.1rem solid ${({ theme }) => theme.fontColor};
      border-radius: 0;
      text-align: center;

      &::placeholder {
        color: ${({ theme }) => theme.colors.gray030};
      }

      ::-webkit-calendar-picker-indicator {
        padding-left: 100%;
        position: absolute;
        cursor: pointer;
        background-image: none;
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
  width: 20%;
  height: 4rem;
  border: 0.2rem solid ${({ active, theme }) => (active ? theme.fontColor : 'none')};
  border-radius: 0.4rem;
  background-color: ${({ color }) => color};
  cursor: pointer;
`;

const ErrorMessage = styled.em`
  margin-top: 0.4rem;
  font-size: ${({ theme }) => theme.fontSize.s14};
  font-weight: 300;
  font-style: normal;
  color: ${({ theme }) => theme.colors.red020};
  text-align: center;
`;
