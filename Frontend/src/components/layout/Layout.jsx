import React from "react";
import { Header } from "./Header";
import { Footer } from "./Footer";

export function Layout(props) {
  return (
    <>
      <Header />
      <main>{props.children}</main>
      <Footer />
    </>
  );
}
