import React, { useEffect } from "react";
import { AppProps } from "next/app";
import "../styles/global.scss";
import { RecoilRoot } from "recoil";
import { Footer } from "../components/Footer";
import { Header } from "../components/Header";
import { Reset } from "styled-reset";
import type {} from "styled-components/cssprop";

/**
 * Next.jsでstyled-componentsとMaterialUIがうまく表示されるようにする
 * 全体のラップ
 */
export default function App({ Component, pageProps }: AppProps) {
  // Remove the server-side injected CSS.(https://material-ui.com/guides/server-rendering/)
  useEffect(() => {
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles && jssStyles.parentNode) {
      jssStyles.parentNode.removeChild(jssStyles);
    }
  }, []);

  return (
    <RecoilRoot>
      <Reset />
      <Header />
      <Component {...pageProps} />
      <Footer />
    </RecoilRoot>
  );
}
