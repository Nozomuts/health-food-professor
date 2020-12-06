import { faBookOpen, faStore } from "@fortawesome/free-solid-svg-icons";
import React, { FC } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { sp } from "../styles/media";
import { COLOR } from "../styles/colors";

type Props = {
  method: "menu" | "shop";
  set_method: React.Dispatch<React.SetStateAction<"menu" | "shop">>;
};

export const MethodRadio: FC<Props> = ({ method, set_method }) => {
  const radio_list = [
    { icon: faBookOpen, label: "メニューから選択", value: "menu" },
    { icon: faStore, label: "店から選択", value: "shop" },
  ] as const;
  return (
    <RadioGroup>
      {radio_list.map(({ icon, label, value }) => (
        <InputContainer checked={method === value} key={value}>
          <RadioButton type="radio" onClick={() => set_method(value)} />
          <RadioTile>
            <FontAwesomeIcon icon={icon} />
            <RadioLabel checked={method === value}>{label}</RadioLabel>
          </RadioTile>
        </InputContainer>
      ))}
    </RadioGroup>
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
  border: 0.2rem solid ${COLOR.BLACK};
  border-radius: 0.5rem;
  padding: 0.5rem;
  transition: transform 300ms ease;
`;

const RadioLabel = styled.p<{ checked: boolean }>`
  text-align: center;
  font-size: 1.3rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.1rem;
  color: ${COLOR.BLACK};
  margin-left: 0.5rem;
  ${sp`
    font-size: .8rem;
  `};
  ${({ checked }) => checked && `color: ${COLOR.WHITE};`};
`;

const RadioGroup = styled.div`
  display: flex;
  justify-content: center;
  margin: 2rem 0;
`;
