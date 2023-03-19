import { useTranslation } from 'next-i18next';
import { useMutation, useQueryClient } from 'react-query';
import { DeleteSchedulePramsType, ScheduleApi, UpdateScheduleParamsType } from '@api/schedule';
import { EventScheduleType } from '@hooks/useEventSchedule';
import useToast, { ToastEnumType } from '@hooks/useToast';

const useScheduleMutate = () => {
  const queryClient = useQueryClient();
  const { t } = useTranslation();
  const { showToast } = useToast();

  const createSchedule = () => {
    return useMutation(
      async (params: EventScheduleType) => {
        const result = await ScheduleApi.createSchedule(params);
        return result;
      },
      {
        onSuccess: (data) => {
          if (!data) {
            return;
          }
          showToast({ type: ToastEnumType.Success, message: t('common:toastMessage.registeredSuccessfully') });
          queryClient.invalidateQueries('getSchedule');
        },
      }
    );
  };

  const updateSchedule = () => {
    return useMutation(
      async ({ _id, params }: UpdateScheduleParamsType) => {
        const result = await ScheduleApi.updateSchedule(_id, params);
        return result;
      },
      {
        onSuccess: (data) => {
          if (!data) {
            return;
          }
          showToast({ type: ToastEnumType.Success, message: t('common:toastMessage.modifiedSuccessfully') });
          queryClient.invalidateQueries('getSchedule');
        },
      }
    );
  };

  const deleteSchedule = () => {
    return useMutation(
      async ({ _id }: DeleteSchedulePramsType) => {
        const result = await ScheduleApi.deleteSchedule(_id);
        return result;
      },
      {
        onSuccess: (data) => {
          if (!data) {
            return;
          }
          showToast({ type: ToastEnumType.Success, message: t('common:toastMessage.deletedSuccessfully') });
          queryClient.invalidateQueries('getSchedule');
        },
      }
    );
  };

  return { createSchedule, updateSchedule, deleteSchedule };
};

export default useScheduleMutate;
