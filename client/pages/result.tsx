import { useRouter } from "next/dist/client/router";
import React, { useEffect } from "react";
import { useRecoilValue, useResetRecoilState } from "recoil";
import styled from "styled-components";
import { Button } from "../components/Button";
import { Chart } from "../components/Chart";
import { Table } from "../components/Table";
import { result_value } from "../recoil";
import { Text } from "../styles/common";
import { sp } from "../styles/media";

export default function Result() {
  const result = useRecoilValue(result_value);
  const router = useRouter();

  useEffect(() => {
    if (result.length === 0) {
      router.push("/");
    }
  }, []);

  return (
    <>
      <Text
        css={`
          text-align: center;
        `}>
        診断結果
      </Text>
      {result.length === 2 ? (
        <Container>
          <Chart result={result[1] as { [name: string]: string }} />
          <Table result={result[0] as { [name: string]: string }} />
        </Container>
      ) : (
        <h1>そんな都合のいいメニューはありません！</h1>
      )}
      <ButtonContainer>
        <Button handle_click={() => location.replace("/")}>TOPへ戻る</Button>
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

const ButtonContainer = styled.div`
  width: 300px;
  margin: 0 auto;
`;
