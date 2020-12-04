import { useRouter } from "next/dist/client/router";
import React, { useEffect } from "react";
import { useRecoilValue, useResetRecoilState } from "recoil";
import styled from "styled-components";
import { Button } from "../components/Button";
import { Chart } from "../components/Chart";
import { Table } from "../components/Table";
import { menu_value, result_value, shop_state } from "../recoil";

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
  flex-wrap: wrap;
  align-items: center;
`;

const H1 = styled.h1`
  text-align: center;
  margin: 5rem auto;
  font-size: 1.5rem;
  font-weight: bold;
`;

const ButtonContainer = styled.div`
  width: 18rem;
  margin: 2rem auto;
`;
