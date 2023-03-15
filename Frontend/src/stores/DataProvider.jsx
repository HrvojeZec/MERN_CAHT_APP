import React from "react";
import { UsersProvider } from "./GetAllUsers";
export function DataProvider({ children }) {
  return (
    <UsersProvider>
      <>{children}</>
    </UsersProvider>
  );
}
