import React, { useEffect } from 'react';
import { AppProps } from 'next/app';
import { ThemeProvider as StyledComponentsThemeProvider } from 'styled-components';
import { ThemeProvider as MaterialUIThemeProvider } from '@material-ui/core/styles';
import { StylesProvider } from '@material-ui/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import { theme } from '../styles/theme';
import '../styles/global.scss';
import { AppBar, Toolbar, Typography } from '@material-ui/core';
import { ElevationScroll } from '../components/ElevationScroll';

/**
 * Next.jsでstyled-componentsとMaterialUIがうまく表示されるようにする
 * 全体のラップ
 */
export default function App({ Component, pageProps }: AppProps) {
    // Remove the server-side injected CSS.(https://material-ui.com/guides/server-rendering/)
    useEffect(() => {
        const jssStyles = document.querySelector('#jss-server-side');
        if (jssStyles && jssStyles.parentNode) {
            jssStyles.parentNode.removeChild(jssStyles);
        }
    }, []);

    return (
        <StylesProvider injectFirst>
            <MaterialUIThemeProvider theme={theme}>
                <StyledComponentsThemeProvider theme={theme}>
                    <CssBaseline />
                    <ElevationScroll {...pageProps}>
                        <AppBar>
                            <Toolbar>
                                <Typography variant="h6">
                                    栄養診断App v1.2.0
                                </Typography>
                            </Toolbar>
                        </AppBar>
                    </ElevationScroll>
                    <Component {...pageProps} />
                </StyledComponentsThemeProvider>
            </MaterialUIThemeProvider>
        </StylesProvider>
    );
}
