import React from "react";
import { AppProps } from "next/app";
import "../styles/global.scss";
import { RecoilRoot } from "recoil";
import { Footer } from "../components/Footer";
import { Header } from "../components/Header";
import { Reset } from "styled-reset";
import type {} from "styled-components/cssprop";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";

config.autoAddCss = false;

/**
 * Next.jsでstyled-componentsとMaterialUIがうまく表示されるようにする
 * 全体のラップ
 */
export default function App({ Component, pageProps }: AppProps) {
  return (
    <RecoilRoot>
      <Reset />
      <Header />
      <Component {...pageProps} />
      <Footer />
    </RecoilRoot>
  );
}
