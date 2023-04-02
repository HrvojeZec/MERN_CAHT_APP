import React, { useState } from "react";
import { HeaderSearch } from "./Header";
import { Footer } from "./Footer";
import { Sidebar } from "./Sidebar";
import { Home } from "../../views/Home/Home";
export function Layout(props) {
  const [userClicked, setUserClicked] = useState();

  const handleUserClicked = (userID) => {
    setUserClicked(userID);
  };

  return (
    <div
      style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}
    >
      <HeaderSearch />
      <div style={{ display: "flex", flex: 1 }}>
        <Sidebar
          onUserClicked={handleUserClicked}
          style={{ flex: "0 0 auto" }}
        />
        <main style={{ flex: "1 1 auto", padding: "100px" }}>
          <Home userID={userClicked} />
        </main>
      </div>
      <Footer style={{ flex: "0 0 83px" }} />
    </div>
  );
}
