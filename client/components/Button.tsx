import React, { FC } from "react";
import styled from "styled-components";
import { COLOR } from "../styles/colors";

type Props = {
  type?: "button" | "submit";
  handle_click?: () => void;
  loading?: boolean;
  disabled?: boolean;
};
import { Spinner } from "../styles/common";
import { sp } from "../styles/media";

export const Button: FC<Props> = ({
  children,
  loading,
  handle_click,
  type,
  disabled,
}) => {
  return (
    <ToggleButton type={type} onClick={handle_click} disabled={disabled}>
      {loading ? <Spinner /> : children}
    </ToggleButton>
  );
};

export const ToggleButton = styled.button`
  margin-top: 2rem;
  font-weight: bold;
  padding: 1.5rem;
  border-radius: .5rem;
  cursor: pointer;
  outline: none;
  font-size: 2rem;
  width: 100%;
  color: ${COLOR.WHITE};
  background-color: ${COLOR.BLACK};
  border: ${COLOR.BLACK} solid .1rem;
  :disabled {
    cursor: not-allowed;
    opacity: 0.5;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  :hover {
    opacity: 0.5;
  }
  ${sp`
    font-size: 1.2rem;
    margin-top: 1rem;
  `}
`;
