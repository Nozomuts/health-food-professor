import styled from "styled-components";
import { pc, sp } from "./media";

export const Row = styled.div`
  ${pc`
      display: flex;
  `}
`;

export const Column = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Text = styled.p`
  font-size: 20px;
  font-weight: bold;
  text-align: left;
  margin: 10px 0;
  ${sp`
    font-size: 16px;
  `}
`;

export const Desc = styled.p`
  opacity: 0.7;
  text-align: left;
  margin: 10px 0;
  ${sp`
    font-size: 12px;
  `}
`;