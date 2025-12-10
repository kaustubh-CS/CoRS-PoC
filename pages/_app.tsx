import App from "next/app";
import Head from "next/head";
import Layout from "../components/layout";
import "../styles/style.css"; // Ensure this matches your CSS filename

function MyApp({ Component, pageProps }: any) {
  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, minimum-scale=1"
        />
      </Head>
      {/* FIX: We removed all the extra props here. Just wrap the component. */}
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  );
}

export default MyApp;