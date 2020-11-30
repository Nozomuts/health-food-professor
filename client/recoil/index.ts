import { atom } from "recoil";

export type ResultType =
  | {
      [name: string]: string;
    }[]
  | string;

export const result_value = atom<ResultType>({
  key: "result_value",
  default: [] as ResultType,
});

export const menu_value = atom<string[]>({
  key: "menu_value",
  default: [],
});

export const shop_state = atom<string[]>({
  key: "shop_state",
  default: [],
});
