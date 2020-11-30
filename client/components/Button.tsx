import { relative } from "path";
import React, { FC } from "react";
import styled from "styled-components";
import { sp } from "../styles/media";

type Props = {
  type?: "button" | "submit";
  handle_click?: () => void;
};

export const Button: FC<Props> = ({ children, type, handle_click }) => {
  return (
    <StyledButton type={type} onClick={handle_click}>
      <span>{children}</span>
    </StyledButton>
  );
};

const StyledButton = styled.button`
  text-decoration: none;
  overflow: hidden;
  padding: 1.5rem 6rem;
  background: #fff;
  font-size: 1.6rem;
  font-weight: 700;
  line-height: 1.5;
  position: relative;
  display: inline-block;
  border-radius: 5px;
  border: #000 solid 1px;
  width: 100%;
  margin-top: 50px;
  cursor: pointer;
  ${sp`
    font-size: 15px;
    margin-top: 20px;
  `}
  &:hover {
    color: #fff;
  }
  &:before {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    content: "";
    -webkit-transition: all 0.3s ease-in-out;
    transition: all 0.3s ease-in-out;
    -webkit-transform: translateX(-96%);
    transform: translateX(-96%);
    background: #000;
  }
  &:hover:before {
    -webkit-transform: translateX(0%);
    transform: translateX(0%);
  }
  > span {
    position: relative;
  }
`;
