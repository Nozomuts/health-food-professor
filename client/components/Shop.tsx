import React from "react";
import styled from "styled-components";
import { Card } from "./Card";

export const Shop = () => {
  const shop_list = [
    {
      name: "マクドナルド",
      value: "macdonalds",
    },
    {
      name: "デニーズ",
      value: "dennys",
    },
    {
      name: "モスバーガー",
      value: "mos",
    },
  ];

  return (
    <ShopContainer>
      {shop_list.map(({ name, value }) => (
        <Card key={name} name={name} value={value} is_shop />
      ))}
    </ShopContainer>
  );
};

const ShopContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin-bottom: 5rem;
`;
