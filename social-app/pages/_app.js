import "../styles/globals.css";

import { SessionProvider } from "next-auth/react";
import Layout from "../components/Layout";
export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  return (
    <SessionProvider session={session} clientMaxAge={30*24*60*60}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
    </SessionProvider>
  );
}
