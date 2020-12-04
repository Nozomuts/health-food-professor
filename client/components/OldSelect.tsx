import React, { FC } from "react";
import { FieldError } from "react-hook-form";
import styled from "styled-components";
import { COLOR } from "../styles/colors";
import { Error, Text } from "../styles/common";
import { old_options } from "../util/OldOptions";

type Props = {
  register: any;
  error: FieldError | undefined;
};

export const OldSelect: FC<Props> = ({ register, error }) => {
  return (
    <Label>
      <Text>年齢{error && <Error>※{error.message}</Error>}</Text>
      <SelectContainer error={error !== undefined}>
        <select name="old" ref={register}>
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

const SelectContainer = styled.div<{ error: boolean }>`
  overflow: hidden;
  width: 100%;
  text-align: center;
  position: relative;
  border: 0.1rem solid ${COLOR.LIGHT_GRAY};
  background: ${COLOR.WHITE};
  border-radius: 0.5rem;
  :hover {
    background-color: ${COLOR.SMOKE};
  }
  &::before {
    position: absolute;
    top: 1.6rem;
    right: 1.4rem;
    width: 0;
    height: 0;
    padding: 0;
    content: "";
    border-left: 0.7rem solid transparent;
    border-right: 0.7rem solid transparent;
    border-top: 0.8rem solid ${COLOR.BLACK};
    pointer-events: none;
  }
  &::after {
    position: absolute;
    top: 0;
    right: 4rem;
    bottom: 0;
    width: 0.1rem;
    content: "";
    border-left: 0.1rem solid ${COLOR.BLACK};
  }
  select {
    width: 100%;
    height: 4rem;
    padding: 0.8rem 3.8rem 0.8rem 0.8rem;
    font-size: 1rem;
    color: ${COLOR.BLACK};
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
  ${({ error }) =>
    error &&
    `
    border: .1rem solid ${COLOR.RED};
    border-radius: .5rem;
    background-color: rgba(255,0,0,0.1)
  `}
`;
