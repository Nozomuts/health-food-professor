import styled, { keyframes } from "styled-components";
import { COLOR } from "./colors";
import { sp } from "./media";

export const Text = styled.p`
  font-size: 1.3rem;
  font-weight: bold;
  text-align: left;
  margin: 1rem 0;
  display: flex;
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

  border-top: 0.2rem solid gray;
  border-right: 0.2rem solid gray;
  border-bottom: 0.2rem solid gray;
  border-left: 0.2rem solid white;
  background: transparent;
  border-radius: 50%;
  width: 3rem;
  height: 3rem;
  ${sp`
    width: 2rem;
    height: 2rem;
  `}
`;

export const Error = styled.p`
  color: ${COLOR.RED};
  text-align: left;
  margin-left: 1rem;
  font-weight: normal;
`;
