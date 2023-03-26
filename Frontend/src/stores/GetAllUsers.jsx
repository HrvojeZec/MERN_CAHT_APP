import React, { createContext, useContext, useEffect, useState } from "react";

const UsersContext = createContext();

export function useUsersdata() {
  const context = useContext(UsersContext);
  if (context === undefined) {
    throw new Error("usePersonData msut be used with a PersonProveder");
  }
  return context;
}

export function UsersProvider({ children }) {
  const [data, setData] = useState();
  const [error, setError] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch("http://localhost:5000/api/user/all", {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => setData(data))
      .catch((error) => setError(error))
      .finally(setLoading(false));
  }, []);

  const value = {
    data,
    error,
    loading,
  };

  return (
    <UsersContext.Provider value={value}>{children}</UsersContext.Provider>
  );
}
