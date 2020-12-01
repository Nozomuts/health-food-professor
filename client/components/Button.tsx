import React, { FC } from "react";
import styled from "styled-components";

type Props = {
  type?: "button" | "submit";
  handle_click?: () => void;
  loading?: boolean;
  disabled?: boolean;
};
import { Spinner } from "../styles/common";

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
  margin-top: 30px;
  font-weight: bold;
  padding: 15px;
  border-radius: 5px;
  cursor: pointer;
  outline: none;
  font-size: 25px;
  width: 100%;
  color: white;
  background-color: black;
  border: black solid 1px;
  :disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }
  :hover {
    opacity: 0.7;
  }
`;
