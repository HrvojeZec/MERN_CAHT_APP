import React from "react";
import { ServerError } from "../components/shared/Error/ServerError";
import { FullscreenLoader } from "../components/shared/Loader/Fullscreenloader";
import { UsersProvider } from "./GetAllUsers";
import { UserProvider, useUserdata } from "./PersonContxt";

function DataProvidersInner({ children }) {
  const { loading: userLoading, error: userError } = useUserdata();

  console.log(userLoading);
  if (userLoading) {
    return <FullscreenLoader />;
  }

  if (userError) {
    return <ServerError error={userError} />;
  }

  return children;
}

export function DataProvider({ children }) {
  return (
    <UserProvider>
      <UsersProvider>
        <DataProvidersInner>{children}</DataProvidersInner>
      </UsersProvider>
    </UserProvider>
  );
}
