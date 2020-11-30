import Axios from "axios";
import { useRouter } from "next/dist/client/router";
import React, { FC } from "react";
import { useForm } from "react-hook-form";
import { useRecoilValue } from "recoil";
import { useSetRecoilState } from "recoil";
import styled from "styled-components";
import { menu_value, ResultType, result_value, shop_state } from "../recoil";
import { Text, Desc } from "../styles/common";
import { sp } from "../styles/media";
import { Button } from "./Button";
import { GenderRadio } from "./GenderRadio";
import { InputNum } from "./InputNum";
import { OldSelect } from "./OldSelect";

export type FormData = {
  gender: string;
  old: string;
  up_value: string;
  menu: string[];
  shop: string[];
};

type Props = {
  method: "menu" | "shop";
};

/**
 * 性別、年齢、上限などを入力するフォーム
 */
export const UserDataForm: FC<Props> = ({ method }) => {
  const { reset, register, handleSubmit, errors } = useForm<FormData>();
  const shop = useRecoilValue(shop_state);
  const menu = useRecoilValue(menu_value);
  const set_result_value = useSetRecoilState<ResultType>(result_value);
  const router = useRouter();

  const on_submit = async (data: FormData) => {
    console.log(data);
    try {
      data["menu"] = menu;
      data["shop"] =
        method === "shop"
          ? shop
          : menu.length > 0
          ? ["macdonalds", "dennys"]
          : [];
      const res = await Axios.post("http://localhost:5000/api/check", {
        data,
      });
      console.log(res);
      set_result_value(res.data);
      reset();
      router.push("/result");
    } catch (res) {
      console.log(res);
    }
  };

  return (
    <Form onSubmit={handleSubmit(on_submit)}>
      {(errors.gender ||
        errors.menu ||
        errors.old ||
        errors.shop ||
        errors.up_value) && <Error>※ 全ての項目を入力してください。</Error>}
      <Box>
        <InputContainer>
          <Text>性別</Text>
          <GenderRadio register={register} />
        </InputContainer>
        <InputContainer>
          <OldSelect register={register} />
          <InputNum register={register} />
        </InputContainer>
      </Box>
      <Desc>※ 入力内容によって結果が変化します。</Desc>
      <Desc>※ "上限"は1つのメニューの最大数を示します。</Desc>
      <Button type="submit">診断する</Button>
    </Form>
  );
};

const Form = styled.form`
  margin-bottom: 20px;
`;

const Error = styled.p`
  color: red;
  text-align: left;
`;

const InputContainer = styled.div`
  flex: 1;
  margin: 0 20px;
  ${sp`
    margin: 0;
  `};
`;

const Box = styled.div`
  display: flex;
  ${sp`
    flex-direction: column;
  `};
`;
