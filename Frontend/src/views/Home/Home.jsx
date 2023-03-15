import React, { useEffect, useState } from "react";

let firstRender = true;
export function Home() {
  const [user, setUser] = useState();
  const token = JSON.parse(localStorage.getItem("token"));
  console.log("token: ", token);
  const sednRequest = async () => {
    await fetch("http://localhost:5000/api/user", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    if (firstRender) {
      firstRender = false;
      sednRequest().then((data) => setUser(data.findUser));
    }
  }, []);

  return <div>{user && <h1>{user.username}</h1>}</div>;
}
