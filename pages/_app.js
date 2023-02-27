import * as React from "react";
import {useEffect ,useState} from "react"
import { useRouter } from 'next/router'
import PropTypes from "prop-types";
import Head from "next/head";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { CacheProvider } from "@emotion/react";
import theme from "../src/theme/theme";
import createEmotionCache from "../src/createEmotionCache";
import FullLayout from "../src/layouts/FullLayout";
import "../styles/style.css";
import LoadingBar from 'react-top-loading-bar'
// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

export default function MyApp(props) {
  const [progress, setProgress] = useState(0)
  const router = useRouter()
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
  useEffect(() => {
    router.events.on('routeChangeStart', () => {setProgress(40)});
    router.events.on('routeChangeComplete', () => {setProgress(100)});
  }, [])

  return (
    <CacheProvider value={emotionCache}>
      <LoadingBar
        color='#03c9d7'
        progress={progress}
        onLoaderFinished={() => setProgress(0)}
      />
      <Head>
        <title>Prmovies Admin Panel</title>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <FullLayout>
          <Component {...pageProps} />
        </FullLayout>
      </ThemeProvider>
    </CacheProvider>
  );
}

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  emotionCache: PropTypes.object,
  pageProps: PropTypes.object.isRequired,
};
