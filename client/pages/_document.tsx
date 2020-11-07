import Document, { DocumentContext } from 'next/document';
import { ServerStyleSheet as StyledComponentSheets } from 'styled-components';
import { ServerStyleSheets as MaterialUiServerStyleSheets } from '@material-ui/styles';

/**
 * Next.jsでstyled-componentsとMaterialUIがうまく表示されるようにする
 */
export default class MyDocument extends Document {
    static async getInitialProps(ctx: DocumentContext) {
        const styledComponentSheets = new StyledComponentSheets();
        const materialUiServerStyleSheets = new MaterialUiServerStyleSheets();
        const originalRenderPage = ctx.renderPage;

        try {
            ctx.renderPage = () =>
                originalRenderPage({
                    enhanceApp: (App) => (props) =>
                        styledComponentSheets.collectStyles(
                            materialUiServerStyleSheets.collect(
                                <App {...props} />
                            )
                        ),
                });

            const initialProps = await Document.getInitialProps(ctx);
            return {
                ...initialProps,
                styles: (
                    <>
                        {initialProps.styles}
                        {styledComponentSheets.getStyleElement()}
                        {materialUiServerStyleSheets.getStyleElement()}
                    </>
                ),
            };
        } finally {
            styledComponentSheets.seal();
        }
    }
}
