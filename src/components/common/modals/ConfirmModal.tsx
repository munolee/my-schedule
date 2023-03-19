import { FC, useEffect } from 'react';
import { useTheme } from '@emotion/react';
import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import ButtonBase from '@components/common/buttons/ButtonBase';
import ModalBase, { ModalEnum } from '@components/common/modals/ModalBase';
import { ModalPropsType } from '@hooks/useModal';

interface ConfirmModalProps {
  modalProps: ModalPropsType;
  confirmMethod: () => void;
  text: string;
  subText?: string;
  buttonText?: string;
}

const ConfirmModal: FC<ConfirmModalProps> = ({ modalProps, text, subText, confirmMethod, buttonText }) => {
  const { replace, query } = useRouter();
  const { fontColor, fontSize, colors } = useTheme();
  const { t } = useTranslation();

  useEffect(() => {
    const { date } = query;
    if (!modalProps.isShow) {
      replace({ pathname: '/', query: { date: date } });
    }
  }, [modalProps.isShow]);

  return (
    <ModalBase modalProps={modalProps} modalType={ModalEnum.Alert}>
      <ModalContent>
        <ConfirmText>{text}</ConfirmText>
        {subText && <ConfirmSubText>{subText}</ConfirmSubText>}
        <ButtonGroup>
          <ButtonBase
            onClick={modalProps.hideModal}
            text="취소"
            width={60}
            height={48}
            textColor={fontColor}
            buttonStyle={{ border: 'none', fontSize: fontSize.s16, fontWeight: 500 }}
          />
          <ButtonBase
            onClick={() => {
              confirmMethod();
              modalProps.hideModal();
            }}
            text={buttonText ?? '확인'}
            width={60}
            height={48}
            textColor={colors.white}
            backgroundColor={colors.red010}
            buttonStyle={{ border: 'none', fontSize: fontSize.s16, fontWeight: 500 }}
          />
        </ButtonGroup>
      </ModalContent>
    </ModalBase>
  );
};

export default ConfirmModal;

const ModalContent = styled.div`
  padding: 2.4rem 1.6rem 1.8rem 3rem;
  min-width: 30rem;
  background-color: ${({ theme }) => theme.calendarBackground};
  border-radius: 1.2rem;
  box-shadow: 0.4rem 0.4rem 2rem 0.4rem rgba(0, 0, 0, 0.1);
`;

const ConfirmText = styled.h2`
  margin-bottom: 0.8rem;
  font-size: ${({ theme }) => theme.fontSize.s16};
  font-weight: 500;
  color: ${({ theme }) => theme.fontColor};
`;

const ConfirmSubText = styled.span`
  font-size: ${({ theme }) => theme.fontSize.s14};
  font-weight: 400;
  color: ${({ theme }) => theme.fontColor};
`;

const ButtonGroup = styled.div`
  margin-top: 2rem;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 1.2rem;
`;
