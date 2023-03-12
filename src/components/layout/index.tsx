import styled from '@emotion/styled';
import { FC, ReactNode } from 'react';

interface LayoutProps {
  children: ReactNode;
}

const Layout: FC<LayoutProps> = ({ children }) => {
  return <LayoutContainer>{children}</LayoutContainer>;
};

export default Layout;

const LayoutContainer = styled.div`
  margin: 0 0 0 calc(33.333% - 1px);
  position: relative;
  width: 100%;
  max-width: 600px;
  min-height: 100vh;

  @media (max-width: 900px) {
    margin: 0 auto;
    width: 100vw;
  }
`;
