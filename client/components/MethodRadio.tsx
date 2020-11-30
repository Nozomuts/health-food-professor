import { IconDefinition } from "@fortawesome/free-solid-svg-icons";
import React, { FC } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { sp } from "../styles/media";

type Props = {
  icon: IconDefinition;
  label: string;
  checked: boolean;
  handle_click: () => void;
};

export const MethodRadio: FC<Props> = ({
  icon,
  label,
  checked,
  handle_click,
}) => {
  return (
    <InputContainer checked={checked}>
      <RadioButton type="radio" onClick={handle_click} checked={checked} />
      <RadioTile>
        <FontAwesomeIcon icon={icon} />
        <RadioLabel checked={checked}>{label}</RadioLabel>
      </RadioTile>
    </InputContainer>
  );
};

const InputContainer = styled.label<{ checked: boolean }>`
  position: relative;
  height: 7rem;
  width: 50%;
  margin: 0.5rem;
  ${({ checked }) =>
    checked &&
    `
    color: white;
    transform: scale(1.1, 1.1);
    background-color: black;
    border-radius: 5px;
  `}
  cursor: pointer;
`;

const RadioButton = styled.input`
  opacity: 0;
  position: absolute;
  top: 0;
  left: 0;
  margin: 0;
  cursor: pointer;
`;

const RadioTile = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  border: 2px solid black;
  border-radius: 5px;
  padding: 1rem;
  transition: transform 300ms ease;
`;

const RadioLabel = styled.p<{ checked: boolean }>`
  text-align: center;
  font-size: 1.5rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 1px;
  color: black;
  margin-left: 10px;
  ${sp`
    font-size: 11px;
  `};
  ${({ checked }) => checked && `color: white;`};
`;
