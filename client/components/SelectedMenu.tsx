import React from "react";
import { useRecoilState, useResetRecoilState } from "recoil";
import styled from "styled-components";
import { menu_value } from "../recoil";
import Image from "next/image";
import { sp } from "../styles/media";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { Text } from "../styles/common";

export const SelectedMenu = () => {
  const [menu, set_menu] = useRecoilState(menu_value);
  const reset = useResetRecoilState(menu_value);
  const handle_click = (name: string) => {
    set_menu((prev) => prev.filter((el) => el !== name));
  };

  return (
    <>
      <ContainerHeader>
        <Text>選択したメニュー</Text>
        <ResetButton onClick={() => reset()}>RESET</ResetButton>
      </ContainerHeader>
      <Container>
        {menu.map((name) => (
          <Label key={name}>
            <CloseButton>
              <FontAwesomeIcon
                icon={faTimes}
                onClick={() => handle_click(name)}
              />
            </CloseButton>
            <ImgFrame>
              <Image
                src="/images/burger.png"
                height="50px"
                width="auto"
                layout="intrinsic"
                objectFit="contain"
              />
            </ImgFrame>
            <TitleBox>{name}</TitleBox>
          </Label>
        ))}
      </Container>
    </>
  );
};

const ContainerHeader = styled.div`
  display: flex;
  justify-content: left;
`;

const Label = styled.div`
  box-shadow: 2px 2px 6px rgba(0, 0, 0, 0.4);
  margin: 10px;
  height: 130px;
  min-width: 130px;
  width: 130px;
  border-radius: 5px;
  position: relative;
  ${sp`
    height: 90px;
    width: 100px;
    min-width: 100px;
  `}
`;

const ImgFrame = styled.div`
  width: 100%;
  height: auto;
  box-sizing: border-box;
  padding-top: 20px;
  ${sp`
    div {
      height: 30px;
      width: 100px;
    }
    padding-top: 10px;
  `}
`;

const TitleBox = styled.div`
  width: 100%;
  height: auto;
  padding: 15px;
  box-sizing: border-box;
  font-size: 12px;
  ${sp`
    padding: 10px;
    font-size: 8px;
  `}
`;

const Container = styled.div`
  display: flex;
  height: 200px;
  overflow-x: auto;
  overflow-y: hidden;
  margin-bottom: 50px;
  border: 1px solid #bbbbbb;
  border-radius: 5px;
  padding: 20px;
  position: relative;
  ${sp`
    height: 230px;
    padding: 0 10px;
    flex-wrap: wrap;
    flex-direction: column;
  `}
`;

const CloseButton = styled.a`
  color: red;
  position: absolute;
  top: 0;
  right: 0;
  cursor: pointer;
  padding: 10px;
  z-index: 100;
`;

const ResetButton = styled.button`
  cursor: pointer;
  margin: 8px 20px;
`;
