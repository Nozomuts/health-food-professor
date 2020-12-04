import { faGraduationCap } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/dist/client/router";
import React from "react";
import styled from "styled-components";
import { COLOR } from "../styles/colors";

export const Header = () => {
  const router = useRouter();
  return (
    <>
      <HeaderContainer onClick={() => router.push("/")}>
        <FontAwesomeIcon icon={faGraduationCap} />
        <h3>栄養診断App v2.2.0</h3>
      </HeaderContainer>
      <LayoutHeader />
    </>
  );
};

const HeaderContainer = styled.div`
  display: flex;
  align-items: center;
  background-color: ${COLOR.BLACK};
  color: lightgray;
  padding-left: 3rem;
  width: 100%;
  height: 6rem;
  cursor: pointer;
  h3 {
    margin-left: 1rem;
  }
`;

const LayoutHeader = styled.div`
  padding-bottom: 2rem;
`;
