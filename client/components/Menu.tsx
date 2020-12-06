import React, { useEffect, useState } from "react";
import { MenuList } from "./MenuList";
import styled from "styled-components";
import { mac_menu } from "../util/MacMenu";
import { dennys_menu } from "../util/DennysMenu";
import { COLOR } from "../styles/colors";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { useResetRecoilState } from "recoil";
import { menu_value } from "../recoil";
import { sp } from "../styles/media";
import { mos_menu } from "../util/MosMenu";

export const Menu = () => {
  const [active, set_active] = useState(0);
  const [page, set_page] = useState(1);
  const reset_menu = useResetRecoilState(menu_value);

  useEffect(() => {
    return () => {
      reset_menu();
    };
  }, []);

  useEffect(() => {
    set_page(1);
  }, [active]);

  const shop_list = [
    {
      id: 0,
      name: "マクドナルド",
      menu: mac_menu,
    },
    {
      id: 1,
      name: "デニーズ",
      menu: dennys_menu,
    },
    {
      id: 2,
      name: "モスバーガー",
      menu: mos_menu,
    },
  ];

  return (
    <>
      <Tabs>
        {shop_list.map(({ name, id }) => (
          <Tab onClick={() => set_active(id)} active={active === id} key={id}>
            {name}
          </Tab>
        ))}
      </Tabs>
      <Container>
        <IconButton
          css={`
            left: 0;
            ${sp`
              left: -1.5rem;
            `}
          `}
          disabled={page === 1}
          onClick={() => set_page((prev) => prev - 1)}>
          <FontAwesomeIcon icon={faAngleLeft} />
        </IconButton>
        {shop_list.map(({ id, menu }) => (
          <Content active={active === id} key={id}>
            <MenuList menu={menu} page={page} />
          </Content>
        ))}
        <IconButton
          css={`
            right: 0;
            ${sp`
              right: -1.5rem;
            `}
          `}
          disabled={page === shop_list[active].menu.length}
          onClick={() => set_page((prev) => prev + 1)}>
          <FontAwesomeIcon icon={faAngleRight} />
        </IconButton>
      </Container>
      <PageNum>{`${page}/${shop_list[active].menu.length}`}</PageNum>
    </>
  );
};

const Tabs = styled.div`
  overflow: hidden;
  background: ${COLOR.WHITE};
`;

const Tab = styled.button<{ active: boolean }>`
  border: none;
  outline: none;
  cursor: pointer;
  width: 33%;
  position: relative;
  font-size: 1rem;
  border-radius: 0.5rem;
  font-weight: bold;
  ${({ active }) =>
    active
      ? `
    border: .1rem solid #ccc;
    border-bottom: none;
    background-color: ${COLOR.WHITE};
    height: 4rem;
  `
      : `
    height: 3.5rem;
    top: .5rem;
  `}
  transition: background-color 0.5s ease-in-out;

  :hover {
    background-color: ${COLOR.WHITE};
  }
  ${sp`
    font-size: .7rem;
  `}
`;

const Content = styled.div<{ active: boolean }>`
  width: 90%;
  margin: 0 auto;
  ${({ active }) => !active && "display: none"}
`;

const IconButton = styled.button`
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${COLOR.BLACK};
  color: ${COLOR.WHITE};
  width: 3.5rem;
  height: 3.5rem;
  border-radius: 50%;
  outline: none;
  position: absolute;
  border: none;
  top: calc(50% - 2.5rem);
  :disabled {
    opacity: 0.3;
    cursor: not-allowed;
  }
  :hover {
    opacity: 0.3;
  }
  ${sp`
    width: 2.5rem;
    height: 2.5rem;
  `}
`;

const Container = styled.div`
  position: relative;
`;

const PageNum = styled.div`
  margin-bottom: 2rem;
`;
