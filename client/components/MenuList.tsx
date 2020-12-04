import React, { FC } from "react";
import SwipeableViews from "react-swipeable-views";
import { MenuItem } from "./MenuItems";

type Props = {
  menu: { name: string }[][];
  page: number;
};

export const MenuList: FC<Props> = ({ menu, page }) => {
  return (
    <SwipeableViews index={page - 1}>
      {menu.map((menu, i) => (
        <MenuItem key={i} menu={menu} />
      ))}
    </SwipeableViews>
  );
};
