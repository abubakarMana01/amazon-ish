import "../styles/globals.css";
import type { AppProps } from "next/app";
import { Sidebar } from "components";
import Head from "next/head";

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<>
			<Head>
				<title>Amazon-ish</title>
				<link rel="icon" href="/favicon.png" />
			</Head>
			<Sidebar />
			<Component {...pageProps} />;
		</>
	);
}

export default MyApp;
