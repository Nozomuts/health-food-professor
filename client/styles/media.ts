import {
  css,
  CSSObject,
  FlattenSimpleInterpolation,
  SimpleInterpolation,
} from "styled-components";

export const sp = (
  first: CSSObject | TemplateStringsArray,
  ...interpolations: SimpleInterpolation[]
): FlattenSimpleInterpolation => css`
  @media (max-width: 56rem) {
    ${css(first, ...interpolations)}
  }
`;

export const tab = (
  first: CSSObject | TemplateStringsArray,
  ...interpolations: SimpleInterpolation[]
): FlattenSimpleInterpolation => css`
  @media (min-width: 56.1rem) and (max-width: 102.4rem) {
    ${css(first, ...interpolations)}
  }
`;
export const pc = (
  first: CSSObject | TemplateStringsArray,
  ...interpolations: SimpleInterpolation[]
): FlattenSimpleInterpolation => css`
  @media (min-width: 102.5rem) {
    ${css(first, ...interpolations)}
  }
`;

let is_sp_cache: boolean | null = null;

export const is_sp = () => {
  if (is_sp_cache === null) {
    if (process.browser) {
      is_sp_cache = window.innerWidth <= 560;
    }
  }
  return is_sp_cache;
};
