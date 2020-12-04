import React, { FC } from "react";
import { FieldError } from "react-hook-form";
import styled from "styled-components";
import { COLOR } from "../styles/colors";
import { Error, Text } from "../styles/common";

type Props = {
  register: any;
  error: FieldError | undefined;
};

export const InputNum: FC<Props> = ({ register, error }) => {
  return (
    <Label>
      <Text>上限{error && <Error>※{error.message}</Error>}</Text>
      <InputBox error={error !== undefined}>
        <input
          type="number"
          name="up_value"
          defaultValue={5}
          ref={register}
          min={1}
          max={30}
        />
      </InputBox>
    </Label>
  );
};

const Label = styled.label`
  cursor: text;
`;

const InputBox = styled.div<{ error: boolean }>`
  width: 100%;
  position: relative;
  pointer-events: none;

  &:before {
    position: absolute;
    top: 0.6rem;
    right: 1.5rem;
    color: ${COLOR.BLACK};
    font-size: 1.2rem;
    content: "▲";
    pointer-events: none; // 当たり判定をなくす
  }

  &:after {
    position: absolute;
    bottom: 0.6rem;
    right: 1.5rem;
    color: ${COLOR.BLACK};
    font-size: 1.2rem;
    content: "▼";
    pointer-events: none; // 当たり判定をなくす
  }

  input {
    box-sizing: border-box;
    display: block;
    border: 0.1rem solid ${COLOR.LIGHT_GRAY};
    padding: 2rem 6rem 2rem 2rem;
    width: 100%;
    height: 4rem;
    -webkit-appearance: none;
    background-color: ${COLOR.WHITE};
    color: ${COLOR.BLACK};
    font-size: 1.3rem;
    border-radius: 0.5rem;
    ${({ error }) =>
      error &&
      `
    border: .1rem solid ${COLOR.RED};
    border-radius: .5rem;
    background-color: rgba(255,0,0,0.1)
  `};

    :hover {
      background-color: ${COLOR.SMOKE};
    }

    &:focus {
      outline: none;
    }

    &::-webkit-inner-spin-button {
      position: absolute;
      top: 0;
      bottom: 0;
      right: 0; // 右端に固定
      margin: auto;
      transform: scale(5); // 当たり判定を大きくする
      transform-origin: right center;
      opacity: 0; // 透明にして見えなくする
    }

    &::-webkit-contacts-auto-fill-button {
      opacity: 0; // Safariのオートフィルボタンを透明にして見えなくする
    }
  }
`;
