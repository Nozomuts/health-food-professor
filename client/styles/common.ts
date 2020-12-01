import styled, { keyframes } from "styled-components";
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

const rotate360 = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

export const Spinner = styled.div`
  animation: ${rotate360} 1s linear infinite;
  transform: translateZ(0);

  border-top: 2px solid gray;
  border-right: 2px solid gray;
  border-bottom: 2px solid gray;
  border-left: 2px solid grey;
  background: transparent;
  width: 10px;
  height: 10px;
  border-radius: 50%;
`;
