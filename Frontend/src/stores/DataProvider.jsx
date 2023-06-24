import React from "react";
import { ServerError } from "../components/shared/Error/ServerError";
import { FullscreenLoader } from "../components/shared/Loader/Fullscreenloader";
import { UsersProvider, useUsersdata } from "./GetAllUsers";
import { UserProvider, useUserdata } from "./PersonContxt";

function DataProvidersInner({ children }) {
  const { loading: userLoading, error: userError } = useUserdata();
  const { loading: usersLoading, error: usersError } = useUsersdata();
  console.log(userLoading);
  if (userLoading || usersLoading) {
    return <FullscreenLoader />;
  }

  if (userError || usersError) {
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
