import React from "react";
import { Layout } from "../../components/layout/Layout";
import { Home } from "./Home";
import { DataProvider } from "../../stores/DataProvider";
function HomePage() {
  return (
    /*    <DataProvider> */
    <Layout>
      <Home />
    </Layout>
    /*     </DataProvider> */
  );
}

export default HomePage;
