import React, { useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { SignUp } from "./components/SignUp";
import { Login } from "./components/Login";
type AuthProps = {
  path?: string;
};
export const Auth: React.FC<AuthProps> = () => {
  const navigate = useNavigate();
  // Navigate to homepage after login or sign up
  useEffect(() => {
    return () => {
      navigate("/");
    };
  }, []);
  return (
    <div className="flex justify-center items-center flex-col w-full h-screen">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/sign_up" element={<SignUp />} />
      </Routes>
    </div>
  );
};
