import { faGraduationCap } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/dist/client/router";
import React from "react";
import styled from "styled-components";

export const Header = () => {
  const router = useRouter();
  return (
    <>
      <HeaderContainer onClick={() => router.push("/")}>
        <FontAwesomeIcon icon={faGraduationCap} />
        <h3>栄養診断App v2.0.0</h3>
      </HeaderContainer>
      <LayoutHeader />
    </>
  );
};

const HeaderContainer = styled.div`
  display: flex;
  align-items: center;
  background-color: black;
  color: lightgray;
  padding-left: 30px;
  position: fixed;
  width: 100%;
  height: 100px;
  z-index: 100;
  cursor: pointer;
  h3 {
    margin-left: 10px;
  }
`;

const LayoutHeader = styled.div`
  padding-bottom: 130px;
`;
