import React, { useEffect, useState } from "react";

export function Home() {
  const [user, setUser] = useState();
  const [effectHasRun, setEffectHasRun] = useState(false);
  const sendRequest = async () => {
    const response = await fetch("http://localhost:5000/api/user", {
      credentials: "include",
    }).catch((error) => console.log(error));
    const data = await response.json();
    console.log(data);
    return data;
  };

  const refreshToken = async () => {
    const response = await fetch(
      "http://localhost:5000/api/user/refreshToken",
      {
        credentials: "include",
      }
    ).catch((error) => console.log(error));
    const data = await response.json();
    return data;
  };
  useEffect(() => {
    if (!effectHasRun) {
      sendRequest().then((data) => setUser(data.findUser));
      setEffectHasRun(true);
    }
    /* 
    let interval = setInterval(() => {
      refreshToken().then((data) => setUser(data.findUser));
    }, 1000 * 29);
    return () => clearInterval(interval); */
  }, []);

  return <div>{user && <h1>{user.username}</h1>}</div>;
}
