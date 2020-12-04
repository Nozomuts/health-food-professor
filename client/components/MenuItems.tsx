import React, { FC } from "react";
import styled from "styled-components";
import { Card } from "./Card";

type Props = {
  menu: { name: string }[];
};

export const MenuItem: FC<Props> = ({ menu }) => {
  return (
    <Page>
      {menu.map(({ name }) => (
        <Card name={name} key={name} />
      ))}
    </Page>
  );
};

const Page = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;
