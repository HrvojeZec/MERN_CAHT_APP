import React from "react";
import { useSelector } from "react-redux";
import { Route, Routes, Navigate } from "react-router-dom";
import LoginPage from "./views/Auth/LoginPage";
import RegisterPage from "./views/Auth/RegisterPage";
import HomePage from "./views/Home/HomePage";

function App() {
  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  console.log("loggedin: ", isLoggedIn);
  return (
    <Routes>
      {!isLoggedIn && (
        <Route exact path="*" element={<Navigate to="/login" />} />
      )}{" "}
      {!isLoggedIn && <Route path="/login" element={<LoginPage />} />}{" "}
      {!isLoggedIn && <Route path="/register" element={<RegisterPage />} />}{" "}
      {isLoggedIn && <Route path="/home" element={<HomePage />} />}{" "}
    </Routes>
  );
}

export default App;
