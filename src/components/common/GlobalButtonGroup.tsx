import { useTheme } from '@emotion/react';
import styled from '@emotion/styled';
import { FC } from 'react';
import NightSvg from '@assets/NightSvg';
import PlusSvg from '@assets/PlusSvg';
import ButtonBase from '@components/common/ButtonBase';
import { ModalPropsType } from '@hooks/useModal';

interface GlobalButtonGroupProps {
  toggleTheme: () => void;
  modalProps: ModalPropsType;
}

const GlobalButtonGroup: FC<GlobalButtonGroupProps> = ({ toggleTheme, modalProps }) => {
  const { colors, background, fontColor } = useTheme();
  return (
    <ButtonGroup>
      <ButtonBase
        width={48}
        height={48}
        backgroundColor={colors.red010}
        buttonStyle={{ borderRadius: '50%', boxShadow: '0 0 10px 0 rgba(0, 0, 0, 0.2)' }}
        onClick={modalProps.showModal}
      >
        <PlusSvg width={48} height={48} />
      </ButtonBase>
      <ButtonBase
        width={48}
        height={48}
        backgroundColor={background}
        buttonStyle={{ borderRadius: '50%', boxShadow: '0 0 10px 0 rgba(0, 0, 0, 0.2)' }}
        onClick={toggleTheme}
      >
        <NightSvg width={34} height={34} bgColor={fontColor} />
      </ButtonBase>
    </ButtonGroup>
  );
};

export default GlobalButtonGroup;

const ButtonGroup = styled.div`
  position: absolute;
  bottom: 1.6rem;
  right: 0.8rem;
  display: flex;
  gap: 0.8rem;
  justify-content: flex-end;
  align-items: flex-end;

  @media (max-width: 900px) {
    position: fixed;
  }
`;
