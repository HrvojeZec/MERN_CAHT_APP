import React, { createContext, useContext, useEffect, useState } from "react";

const UserContext = createContext();

export function useUserdata() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("usePersonData must be used with a PersonProveder");
  }
  return context;
}

export function UserProvider({ children }) {
  const [error, setError] = useState();
  const [user, setUser] = useState();
  const [effectHasRun, setEffectHasRun] = useState(false);
  const [loading, setLoading] = useState(true);

  const refreshToken = async () => {
    const response = await fetch(
      "http://localhost:5000/api/user/refreshToken",
      {
        credentials: "include",
      }
    ).catch((error) => setError(error));
    const data = await response.json();
    return data;
  };
  const sendRequest = async () => {
    const response = await fetch("http://localhost:5000/api/user", {
      credentials: "include",
    }).catch((error) => setError(error));
    const data = await response.json();
    setUser(data.findUser);
    setLoading(false);
    console.log("user: ", data);
    return data;
  };

  useEffect(() => {
    if (user === undefined) {
      setLoading(true);
    }
    if (!effectHasRun) {
      sendRequest();

      setEffectHasRun(true);
    }
    let interval = setInterval(() => {
      refreshToken();
    }, 1000 * 5);
    return () => clearInterval(interval);
  }, []);

  const value = {
    user,
    loading,
    error,
  };
  console.log(value);
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}
