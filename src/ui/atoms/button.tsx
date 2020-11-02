import { Button as ButtonAntd } from "antd";
import styled from "styled-components";

export const Button = styled(ButtonAntd)`
  background: ${(props) => props.theme.primary};
`;
