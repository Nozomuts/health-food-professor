import Axios from "axios";
import { useRouter } from "next/dist/client/router";
import React, { FC, useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useRecoilValue } from "recoil";
import { useSetRecoilState } from "recoil";
import styled from "styled-components";
import { Button } from "../components/Button";
import { GenderRadio } from "../components/GenderRadio";
import { InputNum } from "../components/InputNum";
import { Menu } from "../components/Menu";
import { MethodRadio } from "../components/MethodRadio";
import { OldSelect } from "../components/OldSelect";
import { SelectedMenu } from "../components/SelectedMenu";
import { Shop } from "../components/Shop";
import { menu_value, ResultType, result_value, shop_state } from "../recoil";
import { Text, Desc, Error } from "../styles/common";
import { sp } from "../styles/media";

export type FormData = {
  gender: string;
  old: string;
  up_value: string;
  menu: string[];
  shop: string[];
};

export default function Home() {
  useEffect(() => {
    window.scroll(0, 0);
  }, []);

  const {
    reset,
    register,
    handleSubmit,
    errors,
    setError,
    clearErrors,
    formState: { isSubmitting },
  } = useForm<FormData>();
  const shop = useRecoilValue(shop_state);
  const menu = useRecoilValue(menu_value);
  const set_result_value = useSetRecoilState<ResultType>(result_value);

  const router = useRouter();
  const [method, set_method] = useState<"menu" | "shop">("menu");
  const first_ref = useRef<HTMLDivElement>(null);
  const second_ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (errors.menu && (menu.length > 0 || shop.length > 0)) {
      clearErrors("menu");
    }
  }, [menu, shop]);

  useEffect(() => {
    if (errors.old || errors.gender || errors.up_value)
      second_ref.current?.scrollIntoView({
        behavior: "smooth",
      });
  }, [errors.old, errors.gender, errors.up_value]);

  const on_submit = async (data: FormData) => {
    try {
      data["menu"] = menu;
      if (method === "shop" && shop.length > 0) data["shop"] = shop;
      else if (method === "menu" && menu.length > 0) {
        data["menu"] = menu;
        data["shop"] = ["macdonalds", "dennys"];
      } else {
        setError("menu", { type: "required" });
        first_ref.current?.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
        return;
      }
      const res = await Axios.post(
        "https://nutrient-app-server.herokuapp.com/api/check",
        {
          data,
        }
      );
      set_result_value(res.data);
      reset();
      router.push("/result");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Container>
      <Text>1日に必要な栄養を取るためのメニューを診断！</Text>
      <Text>
        あなたに必要な1日の栄養のうち、選んだメニューがどれだけ補えるか（充足率）をチェックすることができます。
      </Text>
      <br />
      <Text
        ref={first_ref}
        css={`
          ${sp`flex-direction: column; p { margin: .5rem 0 0 0; }`}
        `}>
        1.メニューまたは店の種類を選択
        {errors.menu && (
          <Error>※メニューまたは店を1つ以上選択してください</Error>
        )}
      </Text>
      <Desc>※ 店を選択した場合は店の全メニューから計算されます。</Desc>
      <MethodRadio method={method} set_method={set_method} />
      {method === "menu" ? <Menu /> : <Shop />}
      {method === "menu" && <SelectedMenu />}
      <Text ref={second_ref}>2.基本情報を入力</Text>
      <Form onSubmit={handleSubmit(on_submit)}>
        <Box>
          <InputContainer>
            <Text>
              性別{errors.gender && <Error>※{errors.gender.message}</Error>}
            </Text>
            <GenderRadio
              register={register({ required: "選択してください" })}
              error={errors.gender}
            />
          </InputContainer>
          <InputContainer>
            <OldSelect
              register={register({ required: "選択してください" })}
              error={errors.old}
            />
            <InputNum
              register={register({ required: "入力してください" })}
              error={errors.up_value}
            />
          </InputContainer>
        </Box>
        <Desc>※ 入力内容によって結果が変化します。</Desc>
        <Desc>※ "上限"は1つのメニューの最大数を示します。</Desc>
        <Button
          type="submit"
          loading={isSubmitting}
          disabled={isSubmitting || Object.values(errors).length > 0}>
          診断する
        </Button>
      </Form>
    </Container>
  );
}

const Container = styled.div`
  text-align: center;
  width: 80%;
  max-width: 90rem;
  margin: 0 auto;
`;

const Form = styled.form`
  margin-bottom: 2rem;
`;

const InputContainer = styled.div`
  flex: 1;
  margin: 0 2rem;
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
