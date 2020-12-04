import React, { FC } from "react";
import styled from "styled-components";
import { COLOR } from "../styles/colors";
import { Text } from "../styles/common";

type Props = {
  register: any;
};

export const InputNum: FC<Props> = ({ register }) => {
  return (
    <Label>
      <Text>上限</Text>
      <InputBox>
        <input
          type="number"
          name="up_value"
          defaultValue={5}
          ref={register({ required: true })}
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

const InputBox = styled.div`
  width: 100%;
  height: 4rem;
  position: relative;
  pointer-events: none;

  &:before {
    position: absolute;
    top: .6rem;
    right: 1.5rem;
    color: #000;
    font-size: 1.5rem;
    content: "▲";
    pointer-events: none; // 当たり判定をなくす
  }

  &:after {
    position: absolute;
    bottom: .4rem;
    right: 1.5rem;
    color: #000;
    font-size: 1.5rem;
    content: "▼";
    pointer-events: none; // 当たり判定をなくす
  }

  input {
    box-sizing: border-box;
    display: block;
    border: .1rem solid #bbbbbb;
    padding: 2rem 6rem 2rem 2rem;
    width: 100%;
    height: 4rem;
    -webkit-appearance: none;
    background-color: ${COLOR.WHITE};
    color: ${COLOR.BLACK};
    font-size: 1.6rem;
    border-radius: .5rem;

    :hover {
      border-radius: .5rem;
      box-shadow: 0 0 .6rem rgba(0, 0, 0, 0.5);
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
