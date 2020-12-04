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
  border: .1rem solid #bbbbbb;
  border-radius: .2rem;
  background: #fff;
  border-radius: .5rem;
  :hover {
    box-shadow: 0 0 .6rem rgba(0, 0, 0, 0.5);
  }
  &::before {
    position: absolute;
    top: 1.6rem;
    right: 1rem;
    width: 0;
    height: 0;
    padding: 0;
    content: "";
    border-left: 1rem solid transparent;
    border-right: 1rem solid transparent;
    border-top: 1rem solid #000;
    pointer-events: none;
  }
  &::after {
    position: absolute;
    top: 0;
    right: 4rem;
    bottom: 0;
    width: .1rem;
    content: "";
    border-left: .1rem solid #000;
  }
  select {
    width: 100%;
    height: 4rem;
    padding: .8rem 3.8rem .8rem .8rem;
    font-size: 1rem;
    color: #000;
    padding-right: 1.5rem;
    cursor: pointer;
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
