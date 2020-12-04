import { IconDefinition } from "@fortawesome/free-solid-svg-icons";
import React, { FC } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { sp } from "../styles/media";
import { COLOR } from "../styles/colors";

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
  height: 6rem;
  width: 50%;
  margin: 0.5rem;
  ${({ checked }) =>
    checked &&
    `
    color: ${COLOR.WHITE};
    transform: scale(1.1, 1.1);
    background-color: ${COLOR.BLACK};
    border-radius: .5rem;
  `}
  cursor: pointer;
  transition: ease-in-out 0.3s;
  :hover {
    transform: scale(1.1, 1.1);
  }
  ${sp`
    height: 5rem;
  `};
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
  border: .2rem solid ${COLOR.BLACK};
  border-radius: .5rem;
  padding: .5rem;
  transition: transform 300ms ease;
`;

const RadioLabel = styled.p<{ checked: boolean }>`
  text-align: center;
  font-size: 1.3rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: .1rem;
  color: ${COLOR.BLACK};
  margin-left: .5rem;
  ${sp`
    font-size: .8rem;
  `};
  ${({ checked }) => checked && `color: ${COLOR.WHITE};`};
`;
