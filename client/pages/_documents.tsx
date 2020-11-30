import Document, { DocumentContext } from "next/document";
import { ServerStyleSheet } from "styled-components";

/**
 * Next.jsでstyled-componentsとMaterialUIがうまく表示されるようにする
 */
export default class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const styledComponentSheets = new ServerStyleSheet();
    const originalRenderPage = ctx.renderPage;

    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: (App) => (props) =>
            styledComponentSheets.collectStyles(<App {...props} />),
        });

      const initialProps = await Document.getInitialProps(ctx);
      return {
        ...initialProps,
        styles: (
          <>
            {initialProps.styles}
            {styledComponentSheets.getStyleElement()}
          </>
        ),
      };
    } finally {
      styledComponentSheets.seal();
    }
  }
}
