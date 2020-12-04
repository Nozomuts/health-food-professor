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
  box-shadow: .2rem .2rem .6rem rgba(0, 0, 0, 0.4);
  margin: 1rem;
  cursor: pointer;
  border-radius: .5rem;
  overflow: hidden;
  ${({ include }) => include && `box-shadow: 0 0 .4rem; opacity: 0.3;`};
  ${tab`
    width: 25%;
  `}
  ${sp`
    width: 40%;
    margin: .5rem;
  `}
  :hover {
    box-shadow: 0 0 .6rem rgba(0, 0, 0, 0.5);
  }
`;

const ImgFrame = styled.div`
  width: 100%;
  box-sizing: border-box;
  padding-top: 1rem;
  ${tab`
    div {
      height: 7rem;
    }
  `};
  ${sp`
    div {
      height: 4rem;
    }
  `};
`;

const TitleBox = styled.div`
  width: 100%;
  padding: 2rem 1.8rem;
  box-sizing: border-box;
  font-weight: bold;
  ${tab`
    padding: 1rem;
  `};
  ${sp`
    font-size: .7rem;
    padding: .7rem;
  `};
`;
