import "../styles/globals.css";
import type { AppProps } from "next/app";
import { Disclaimer, Footer, Sidebar } from "components";
import Head from "next/head";
import { AppProvider } from "contexts";
import ProgressBar from "@badrap/bar-of-progress";
import Router from "next/router";

function MyApp({ Component, pageProps }: AppProps) {
  const progress = new ProgressBar({
    size: 4,
    color: "#fe595e",
    delay: 100,
  });

  Router.events.on("routeChangeStart", progress.start);
  Router.events.on("routeChangeComplete", progress.finish);
  Router.events.on("routeChangeError", progress.finish);

  return (
    <AppProvider>
      <>
        <Head key="head">
          <title>Amazon-ish</title>
          <link rel="icon" href="/favicon.png" />
        </Head>
        <Sidebar />

        <Component {...pageProps} />

        <Disclaimer />
        <Footer />
      </>
    </AppProvider>
  );
}

export default MyApp;
