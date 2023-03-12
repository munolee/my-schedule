import { FC } from 'react';
import { useTheme } from '@emotion/react';
import styled from '@emotion/styled';
import NightSvg from '@assets/NightSvg';
import PlusSvg from '@assets/PlusSvg';
import ButtonBase from '@components/common/ButtonBase';
import FlatIcon from '@components/common/FlatIcon';
import { ModalPropsType } from '@hooks/useModal';

interface GlobalButtonGroupProps {
  toggleTheme: () => void;
  modalProps: ModalPropsType;
}

const GlobalButtonGroup: FC<GlobalButtonGroupProps> = ({ toggleTheme, modalProps }) => {
  const { colors, background, fontColor, fontSize } = useTheme();
  return (
    <ButtonGroup>
      <ButtonBase
        width={48}
        height={48}
        backgroundColor={colors.red010}
        buttonStyle={{ borderRadius: '50%', boxShadow: '0 0 1rem 0 rgba(0, 0, 0, 0.2)' }}
        onClick={modalProps.showModal}
      >
        <FlatIcon size={fontSize.s30} color={colors.white}>
          <PlusSvg />
        </FlatIcon>
      </ButtonBase>
      <ButtonBase
        width={48}
        height={48}
        backgroundColor={background}
        buttonStyle={{ borderRadius: '50%', boxShadow: '0 0 1rem 0 rgba(0, 0, 0, 0.2)' }}
        onClick={toggleTheme}
      >
        <FlatIcon size={fontSize.s30} color={fontColor}>
          <NightSvg />
        </FlatIcon>
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
