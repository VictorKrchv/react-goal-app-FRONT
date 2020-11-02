import React from "react";
import styled from "styled-components";
import { Container } from "./container";

interface Props {
  children: React.ReactNode;
}

export const Header: React.FC<Props> = ({ children }) => {
  return (
    <HeaderBox>
      <Container>
        <HeaderInner>
          {children}
        </HeaderInner>
      </Container>
    </HeaderBox>
  );
};

const HeaderBox = styled.div`
  background-color: #fff;
`;

const HeaderInner = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`
