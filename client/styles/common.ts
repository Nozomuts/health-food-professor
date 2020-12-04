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
  font-size: 1.3rem;
  font-weight: bold;
  text-align: left;
  margin: 1rem 0;
  ${sp`
    font-size: 1rem;
  `}
`;

export const Desc = styled.p`
  opacity: 0.7;
  text-align: left;
  margin: 1rem 0;
  ${sp`
    font-size: .8rem;
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

  border-top: .2rem solid gray;
  border-right: .2rem solid gray;
  border-bottom: .2rem solid gray;
  border-left: .2rem solid grey;
  background: transparent;
  width: 1rem;
  height: 1rem;
  border-radius: 50%;
`;
