import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import LoginPage from "./views/Auth/LoginPage";
import RegisterPage from "./views/Auth/RegisterPage";
import HomePage from "./views/Home/HomePage";

function App() {
  return (
    <Routes>
      <Route exact path="*" element={<Navigate to="/home" />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/home" element={<HomePage />} />
    </Routes>
  );
}

export default App;
