import React from "react";
import { useRecoilState, useResetRecoilState } from "recoil";
import styled from "styled-components";
import { menu_value } from "../recoil";
import Image from "next/image";
import { sp } from "../styles/media";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { Text } from "../styles/common";
import { COLOR } from "../styles/colors";

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
  box-shadow: 0.2rem 0.2rem 0.6rem rgba(0, 0, 0, 0.4);
  margin: 1rem;
  height: 9rem;
  min-width: 10rem;
  width: 10rem;
  border-radius: 0.5rem;
  position: relative;
  ${sp`
    height: 7rem;
    width: 7rem;
    min-width: 7rem;
    margin: .5rem;
  `}
`;

const ImgFrame = styled.div`
  width: 100%;
  box-sizing: border-box;
  padding-top: 2rem;
  ${sp`
    div {
      height: 3rem;
      width: 6rem;
    }
    padding-top: 1rem;
  `}
`;

const TitleBox = styled.div`
  width: 100%;
  height: auto;
  padding: 1rem;
  box-sizing: border-box;
  font-size: 1rem;
  ${sp`
    padding: .5rem;
    font-size: .8rem;
  `}
`;

const Container = styled.div`
  display: flex;
  height: 14rem;
  overflow-x: auto;
  overflow-y: hidden;
  margin-bottom: 5rem;
  border: 0.1rem solid ${COLOR.LIGHT_GRAY};
  border-radius: 0.5rem;
  padding: 1.5rem;
  position: relative;
  ${sp`
    height: 17rem;
    padding: 0;
    flex-wrap: wrap;
    flex-direction: column;
    margin-bottom: 3rem;
  `}
`;

const CloseButton = styled.a`
  color: ${COLOR.RED};
  position: absolute;
  top: 0;
  right: 0;
  cursor: pointer;
  padding: 0.5rem;
  z-index: 100;
  :hover {
    svg {
      opacity: 0.5;
    }
  }
`;

const ResetButton = styled.button`
  cursor: pointer;
  margin: 0.8rem 2rem;
`;
