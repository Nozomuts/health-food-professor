import React, { FC } from "react";
import styled from "styled-components";
import { MenuItem } from "./MenuItems";

type Props = {
  menu: { name: string }[][];
  page: number;
};

export const MenuList: FC<Props> = ({ menu, page }) => {
  return (
    <div>
      {menu.map((menu, i) => (
        <MenuItem key={i} menu={menu} active={page === i + 1} />
      ))}
    </div>
  );
};
