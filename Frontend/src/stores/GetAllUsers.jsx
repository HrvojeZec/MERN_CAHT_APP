import React, { createContext, useContext, useEffect, useState } from "react";

const UserContext = createContext();

export function useUserdata() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("usePersonData msut be used with a PersonProveder");
  }
  return context;
}

export function UsersProvider({ children }) {
  const [data, setData] = useState();
  const [error, setError] = useState();
  /* const tokenString = localStorage.setItem("token");
  const token = JSON.stringify(tokenString); */
  const token = JSON.parse(localStorage.getItem("token"));
  console.log("token: ", token);

  useEffect(() => {
    if (token == null) {
      console.log(!token);
      return;
    }
    fetch("http://localhost:5000/api/user/all", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setData(data))
      .catch((error) => setError(error));
  }, []);

  const value = {
    data,
    error,
  };
  console.log(value);
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}
