import { useRouter } from "next/dist/client/router";
import React, { useEffect } from "react";
import { useRecoilValue, useResetRecoilState } from "recoil";
import styled from "styled-components";
import { Button } from "../components/Button";
import { Chart } from "../components/Chart";
import { Table } from "../components/Table";
import { menu_value, result_value, shop_state } from "../recoil";
import { Text } from "../styles/common";
import { sp } from "../styles/media";

export default function Result() {
  const result = useRecoilValue(result_value);
  const reset_shop = useResetRecoilState(shop_state);
  const reset_menu = useResetRecoilState(menu_value);
  const router = useRouter();

  useEffect(() => {
    if (result.length === 0) {
      router.push("/");
    }
    window.scroll(0, 0);
    return () => {
      reset_shop();
      reset_menu();
    };
  }, []);

  return (
    <>
      <Text
        css={`
          text-align: center;
          margin-bottom: 50px;
        `}>
        診断結果
      </Text>
      {result.length === 2 ? (
        <Container>
          <Chart result={result[1] as { [name: string]: string }} />
          <Table result={result[0] as { [name: string]: string }} />
        </Container>
      ) : (
        <H1>そんな都合のいいメニューはありません！</H1>
      )}
      <ButtonContainer>
        <Button handle_click={() => router.push("/")}>TOPへ戻る</Button>
      </ButtonContainer>
    </>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  ${sp`
    flex-direction: column;
  `}
`;

const H1 = styled.h1`
  text-align: center;
  margin: 100px auto;
  font-size: 30px;
  font-weight: bold;
`;

const ButtonContainer = styled.div`
  width: 300px;
  margin: 0 auto;
`;
