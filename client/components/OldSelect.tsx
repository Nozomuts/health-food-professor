import React, { FC } from "react";
import styled from "styled-components";
import { Text } from "../styles/common";
import { old_options } from "../util/OldOptions";

type Props = {
  register: any;
};

export const OldSelect: FC<Props> = ({ register }) => {
  return (
    <Label>
      <Text>年齢</Text>
      <SelectContainer>
        <select name="old" ref={register({ required: true })}>
          {old_options.map(({ value, text, hidden }) => (
            <option key={value} value={value} hidden={hidden}>
              {text}
            </option>
          ))}
        </select>
      </SelectContainer>
    </Label>
  );
};

const Label = styled.label`
  display: flex;
  flex-direction: column;
`;

const SelectContainer = styled.div`
  overflow: hidden;
  width: 100%;
  text-align: center;
  position: relative;
  border: 1px solid #bbbbbb;
  border-radius: 2px;
  background: #fff;
  border-radius: 5px;
  &::before {
    position: absolute;
    top: 20px;
    right: 16px;
    width: 0;
    height: 0;
    padding: 0;
    content: "";
    border-left: 10px solid transparent;
    border-right: 10px solid transparent;
    border-top: 10px solid #000;
    pointer-events: none;
  }
  &::after {
    position: absolute;
    top: 0;
    right: 50px;
    bottom: 0;
    width: 1px;
    content: "";
    border-left: 1px solid #000;
  }
  select {
    width: 100%;
    height: 50px;
    padding: 8px 38px 8px 8px;
    font-size: 16px;
    color: #000;
    padding-right: 1em;
    cursor: pointer;
    text-indent: 0.01px;
    text-overflow: ellipsis;
    border: none;
    outline: none;
    background: transparent;
    background-image: none;
    box-shadow: none;
    -webkit-appearance: none;
    appearance: none;
    &::-ms-expand {
      display: none;
    }
  }
`;
