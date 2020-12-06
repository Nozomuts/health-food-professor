import { useRouter } from "next/dist/client/router";
import React, { useEffect } from "react";
import { useRecoilValue, useResetRecoilState } from "recoil";
import styled from "styled-components";
import { Button } from "../components/Button";
import { Chart } from "../components/Chart";
import { Table } from "../components/Table";
import { menu_value, result_value, shop_state } from "../recoil";
import { COLOR } from "../styles/colors";
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
      {result.length === 2 ? (
        <Container>
          <Chart result={result[1] as { [name: string]: string }} />
          <Table result={result[0] as { [name: string]: string }} />
        </Container>
      ) : (
        <RecommendContainer>
          <H1>
            残念ながら選択されたお店では一日の栄養素を満たすものはないようです。
            <br />
            <br />
            {result.length === 1 && "こんなメニューはいかがですか？"}
          </H1>
          <Recommend>
            {result.length === 1 && (
              <RecommendList>
                {Object.keys(result[0]).map((el, i) => (
                  <li>{el.trim()}</li>
                ))}
              </RecommendList>
            )}
          </Recommend>
        </RecommendContainer>
      )}
      <ButtonContainer>
        <Button handle_click={() => router.push("/")}>TOPへ戻る</Button>
      </ButtonContainer>
    </>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  ${sp`
    flex-direction: column;
  `}
`;

const H1 = styled.h1`
  text-align: left;
  font-size: 1.5rem;
  font-weight: bold;
`;

const ButtonContainer = styled.div`
  width: 18rem;
  margin: 2rem auto;
`;

const Recommend = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 2rem;
  flex-direction: column;
`;

const RecommendContainer = styled.div`
  width: 80%;
  margin: 0 auto;
`;

const RecommendList = styled.div`
  font-size: 2rem;
  margin-top: 2rem;
  text-align: left;
  border-radius: 0.5rem;
  border: 2px solid ${COLOR.BLACK};
  padding: 2rem;
  ${sp`
    font-size: 1rem;
    padding: 1rem;
  `}
`;
