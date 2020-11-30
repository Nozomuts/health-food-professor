import React, { FC } from "react";
import styled from "styled-components";
import { Card } from "./Card";

type Props = {
  menu: { name: string }[];
  active: boolean;
};

export const MenuItem: FC<Props> = ({ menu, active }) => {
  return (
    <Page active={active}>
      {menu.map(({ name }) => (
        <Card name={name} key={name} />
      ))}
    </Page>
  );
};

const Page = styled.div<{ active: boolean }>`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  ${({ active }) => !active && `display: none;`};
`;
