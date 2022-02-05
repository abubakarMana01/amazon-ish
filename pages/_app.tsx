import "../styles/globals.css";
import type { AppProps } from "next/app";
import { Disclaimer, Footer, Sidebar } from "components";
import Head from "next/head";
import { AppProvider } from "contexts";

function MyApp({ Component, pageProps }: AppProps) {
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
