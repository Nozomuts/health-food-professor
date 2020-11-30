import React, { FC } from "react";
import styled from "styled-components";
import { useRecoilState } from "recoil";
import { menu_value, shop_state } from "../recoil";
import Image from "next/image";
import { sp, tab } from "../styles/media";

type Props = {
  name: string;
  value?: string;
  is_shop?: boolean;
};

export const Card: FC<Props> = ({ name, is_shop, value }) => {
  const [menu, set_menu] = useRecoilState(menu_value);
  const [shop, set_shop] = useRecoilState(shop_state);
  const include = is_shop ? shop.includes(value!) : menu.includes(name);

  const handle_click_menu = () => {
    if (include) {
      set_menu((prev) => prev.filter((el) => el !== name));
      return;
    }
    set_menu((prev) => [...prev, name]);
  };

  const handle_click_shop = () => {
    if (include) {
      set_shop((prev) => prev.filter((el) => el !== value!));
      return;
    }
    set_shop((prev) => [...prev, value!]);
  };

  return (
    <Label include={include}>
      <ImgFrame>
        <Image
          src={`/images/${value ? value : "burger"}.png`}
          height="auto"
          width="auto"
          layout="intrinsic"
          objectFit="contain"
        />
      </ImgFrame>
      <TitleBox>{name}</TitleBox>
      <input
        type="checkbox"
        onClick={is_shop ? handle_click_shop : handle_click_menu}
        checked={include}
        hidden
      />
    </Label>
  );
};

const Label = styled.label<{ include: boolean }>`
  width: 30%;
  box-shadow: 2px 2px 6px rgba(0, 0, 0, 0.4);
  margin: 10px;
  cursor: pointer;
  border-radius: 5px;
  overflow: hidden;
  ${({ include }) => include && `box-shadow: none; opacity: 0.3;`};
  ${tab`
    width: 25%;
  `}
  ${sp`
    width: 40%;
    margin: 5px;
  `}
`;

const ImgFrame = styled.div`
  width: 100%;
  box-sizing: border-box;
  padding-top: 20px;
  ${tab`
    padding-top: 0;
    div {
      height: 100px;
    }
  `};
  ${sp`
    padding-top: 0;
    div {
      height: 80px;
    }
  `};
`;

const TitleBox = styled.div`
  width: 100%;
  padding: 20px 18px;
  box-sizing: border-box;
  ${tab`
    padding: 0 10px 10px 10px;
  `};
  ${sp`
    font-size: 12px;
    padding: 0 10px 10px 10px;
  `};
`;
