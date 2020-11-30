import React, { FC } from "react";
import styled from "styled-components";
import { Text } from "../styles/common";

type Props = {
  register: any;
};

export const InputNum: FC<Props> = ({ register }) => {
  return (
    <label>
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
    </label>
  );
};

const InputBox = styled.div`
  width: 100%;
  height: 50px;
  position: relative;
  pointer-events: none;

  &:before {
    position: absolute;
    top: 8px;
    right: 20px;
    color: #000;
    font-size: 18px;
    content: "▲";
    pointer-events: none; // 当たり判定をなくす
  }

  &:after {
    position: absolute;
    bottom: 8px;
    right: 20px;
    color: #000;
    font-size: 18px;
    content: "▼";
    pointer-events: none; // 当たり判定をなくす
  }

  input {
    box-sizing: border-box;
    display: block;
    margin: 0 auto 40px;
    border: 1px solid #bbbbbb;
    padding: 20px 60px 20px 20px;
    width: 100%;
    height: 50px;
    -webkit-appearance: none;
    background-color: white;
    color: black;
    font-size: 20px;
    border-radius: 5px;

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
