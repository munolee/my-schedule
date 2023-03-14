import { FC, useState } from 'react';
import { useTheme } from '@emotion/react';
import styled from '@emotion/styled';
import { useTranslation } from 'next-i18next';
import { FieldValues, useForm } from 'react-hook-form';
import { LoginParamsType } from '@api/auth';
import ArrowLeftSvg from '@assets/ArrowLeftSvg';
import FlatIcon from '@components/common/FlatIcon';
import ButtonBase from '@components/common/buttons/ButtonBase';
import useAuthLogin from '@hooks/useAuthLogin';

const LoginForm: FC = () => {
  const [isShowLoginForm, setIsShowLoginForm] = useState<boolean>(false);
  const { userLogin } = useAuthLogin();
  const { mutateAsync } = userLogin();
  const { t } = useTranslation();
  const { colors, fontColor, fontSize } = useTheme();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    mode: 'onChange',
    defaultValues: { id: '', pw: '' },
  });

  const onSubmit = async (data: FieldValues | LoginParamsType) => {
    await mutateAsync(data as LoginParamsType);
    reset();
  };

  return (
    <LoginWrapper>
      <FormContent>
        {isShowLoginForm && (
          <ButtonBase
            onClick={() => setIsShowLoginForm(false)}
            backgroundColor="transparent"
            buttonStyle={{ padding: 0 }}
          >
            <FlatIcon size={fontSize.s30} color={fontColor}>
              <ArrowLeftSvg />
            </FlatIcon>
          </ButtonBase>
        )}
        <GuestLoginButtonGroup isShow={isShowLoginForm}>
          <ButtonBase
            width={280}
            height={60}
            text={t('common:guestLogin')}
            textColor={colors.white}
            backgroundColor={colors.blue010}
            buttonStyle={{ borderRadius: '10rem', fontWeight: 500 }}
            onClick={() => onSubmit({ id: process.env.GUEST_ID, pw: process.env.GUEST_PW })}
          />
          <ButtonBase
            text={t('common:idUserLogin')}
            textColor={fontColor}
            backgroundColor="transparent"
            buttonStyle={{ border: 'none', fontSize: fontSize.s14, fontWeight: 300 }}
            onClick={() => setIsShowLoginForm((prev) => !prev)}
          />
        </GuestLoginButtonGroup>
        <StyledForm onSubmit={handleSubmit(onSubmit)} autoComplete="off" isShow={isShowLoginForm}>
          <div>
            <input
              type="text"
              placeholder={t('common:userName')}
              autoFocus
              {...register('id', {
                required: true,
                minLength: {
                  value: 4,
                  message: t('common:errorMessage.idMinLength'),
                },
                maxLength: {
                  value: 12,
                  message: t('common:errorMessage.idMaxLength'),
                },
              })}
            />
            {errors.id && <ErrorMessage>{errors.id?.message}</ErrorMessage>}
          </div>
          <div>
            <input
              type="password"
              placeholder={t('common:password')}
              autoFocus
              {...register('pw', {
                required: true,
                minLength: {
                  value: 5,
                  message: t('common:errorMessage.pwMinLength'),
                },
                maxLength: {
                  value: 16,
                  message: t('common:errorMessage.pwMaxLength'),
                },
              })}
            />
            {errors.pw && <ErrorMessage>{errors.pw?.message}</ErrorMessage>}
          </div>
          <div>
            <ButtonBase
              type="submit"
              height={50}
              text={t('common:login')}
              textColor={colors.white}
              backgroundColor={colors.blue010}
              buttonStyle={{ borderRadius: '10rem', fontWeight: 500 }}
            />
          </div>
        </StyledForm>
      </FormContent>
    </LoginWrapper>
  );
};

const LoginWrapper = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const FormContent = styled.div`
  padding: 3.6rem 1.6rem;
  width: 34rem;
  height: 44rem;
  background-color: ${({ theme }) => theme.calendarBackground};
  border-radius: 0.75rem;
  box-shadow: 0.4rem 0.4rem 1.4rem rgba(0, 0, 0, 0.5);
`;

const GuestLoginButtonGroup = styled.div<{ isShow: boolean }>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 0.4rem;
  visibility: ${({ isShow }) => (isShow ? 'hidden' : 'visible')};
  opacity: ${({ isShow }) => (isShow ? '0' : '1')};
  transform: ${({ isShow }) => (isShow ? 'translate3d(0, 0, 0)' : 'translate3d(0, 10.4rem, 0)')};
  transition: transform 0.3s ease-in-out, opacity 0.3s ease-in-out;
  -webkit-transition: transform 0.3s ease-in-out, opacity 0.3s ease-in-out;
`;

const StyledForm = styled.form<{ isShow: boolean }>`
  padding: 0 1.6rem;
  visibility: ${({ isShow }) => (isShow ? 'visible' : 'hidden')};
  opacity: ${({ isShow }) => (isShow ? '1' : '0')};
  transform: ${({ isShow }) => (isShow ? '0' : 'translate3d(0, 10.4rem, 0)')};
  transition: transform 0.3s ease-in-out, opacity 0.3s ease-in-out;
  -webkit-transition: transform 0.3s ease-in-out, opacity 0.3s ease-in-out;

  > div {
    margin-top: 3.6rem;
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
    }
  }
`;

const ErrorMessage = styled.em`
  margin-top: 0.4rem;
  font-size: ${({ theme }) => theme.fontSize.s14};
  font-weight: 300;
  font-style: normal;
  color: ${({ theme }) => theme.colors.red020};
  text-align: center;
`;

export default LoginForm;
