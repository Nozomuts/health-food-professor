import styled from "styled-components";
import { UserDataForm } from "../components/UserDataForm";
import { Menu } from "../components/Menu";
import { SelectedMenu } from "../components/SelectedMenu";
import { MethodRadio } from "../components/MethodRadio";
import { faBookOpen, faStore } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { Desc, Text } from "../styles/common";
import { Shop } from "../components/Shop";

export default function Home() {
  const [method, set_method] = useState<"menu" | "shop">("menu");

  return (
    <Container>
      <Text>1日に必要な栄養を取るためのメニューを診断！</Text>
      <Text>
        あなたに必要な1日の栄養のうち、選んだメニューがどれだけ補えるか（充足率）をチェックすることができます。
      </Text>
      <br />
      <Text>1.メニューまたは店の種類を選択してください。</Text>
      <Desc>※ 店を選択した場合は店の全メニューから計算されます。</Desc>
      <RadioGroup>
        <MethodRadio
          icon={faBookOpen}
          label="メニューから選択"
          checked={method === "menu"}
          handle_click={() => set_method("menu")}
        />
        <MethodRadio
          icon={faStore}
          label="店から選択"
          checked={method === "shop"}
          handle_click={() => set_method("shop")}
        />
      </RadioGroup>
      {method === "menu" ? <Menu /> : <Shop />}
      {method === "menu" && <SelectedMenu />}
      <Text>2.基本情報を入力</Text>
      <UserDataForm method={method} />
    </Container>
  );
}

const Container = styled.div`
  text-align: center;
  width: 80%;
  max-width: 900px;
  margin: 0 auto;
`;

const RadioGroup = styled.div`
  display: flex;
  justify-content: center;
  margin: 50px 0;
`;
