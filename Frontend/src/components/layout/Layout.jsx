import React from "react";
import { HeaderSearch } from "./Header";
import { Footer } from "./Footer";
import { Sidebar } from "./Sidebar";
export function Layout(props) {
  return (
    <>
      <HeaderSearch />
      <Sidebar />
      <main>{props.children}</main>
      <Footer />
    </>
  );
}
