import Head from "next/head";
import React from "react";
import styles from "../styles/Layout.module.scss";
import Footer from "./Footer";
import Navbar from "./Navbar";

const Layout = ({ children }) => {
  return (
    <div className={styles.layout}>
      <Head>
        <title>Bookerei</title>
      </Head>
      <header>
        <Navbar />
      </header>
      <main className={styles.mainContainer}>{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
