import { FC, ReactNode } from 'react';
import styled from '@emotion/styled';

interface LayoutProps {
  children: ReactNode;
}

const Layout: FC<LayoutProps> = ({ children }) => {
  return <LayoutContainer>{children}</LayoutContainer>;
};

export default Layout;

const LayoutContainer = styled.div`
  position: relative;
  width: 100%;
  max-width: 600px;
  min-height: 100vh;
  margin: 0 0 0 calc(33.333% - 1px);

  @media (max-width: 900px) {
    width: 100vw;
    margin: 0 auto;
  }
`;
