import { FC } from 'react';
import styled from '@emotion/styled';
import ButtonBase from '@components/common/ButtonBase';
import PlusSvg from '@assets/PlusSvg';
import NightSvg from '@assets/NightSvg';
import { ModalPropsType } from '@hooks/useModal';

interface GlobalButtonGroupProps {
  toggleTheme: () => void;
  modalProps: ModalPropsType;
}

const GlobalButtonGroup: FC<GlobalButtonGroupProps> = ({ toggleTheme, modalProps }) => {
  return (
    <>
      <ButtonGroup>
        <ButtonBase
          width={48}
          height={48}
          backgroundColor="#FF7272"
          buttonStyle={{ borderRadius: '50%', boxShadow: '0 0 10px 0 rgba(0, 0, 0, 0.2)' }}
          onClick={modalProps.showModal}
        >
          <PlusSvg width={48} height={48} />
        </ButtonBase>
        <ButtonBase
          width={48}
          height={48}
          backgroundColor="#FFFFFF"
          buttonStyle={{ borderRadius: '50%', boxShadow: '0 0 10px 0 rgba(0, 0, 0, 0.2)' }}
          onClick={toggleTheme}
        >
          <NightSvg width={34} height={34} bgColor="#111111" />
        </ButtonBase>
      </ButtonGroup>
    </>
  );
};

export default GlobalButtonGroup;

const ButtonGroup = styled.div`
  position: absolute;
  bottom: 0.8rem;
  right: 0.8rem;
  display: flex;
  gap: 0.8rem;
  justify-content: flex-end;
  align-items: flex-end;
`;
