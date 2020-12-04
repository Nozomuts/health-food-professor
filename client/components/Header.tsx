import { faGraduationCap } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/dist/client/router";
import React from "react";
import styled from "styled-components";
import { COLOR } from "../styles/colors";

export const Header = () => {
  const router = useRouter();
  return (
    <HeaderContainer onClick={() => router.push("/")}>
      <FontAwesomeIcon icon={faGraduationCap} />
      <h3>Healty Food Professor v2.2.0</h3>
    </HeaderContainer>
  );
};

const HeaderContainer = styled.div`
  display: flex;
  align-items: center;
  background-color: ${COLOR.BLACK};
  color: lightgray;
  padding-left: 2rem;
  width: 100%;
  height: 6rem;
  cursor: pointer;
  margin-bottom: 2rem;
  h3 {
    margin-left: .6rem;
  }
`;
