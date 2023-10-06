import React from "react";
import { Routes, Route } from "react-router-dom";
import { SignUp } from "./components/SignUp";
import { Login } from "./components/Login";
import { Nomatch } from "../Nomatch";
//
type AuthProps = {
  path?: string;
};
//
export const Auth: React.FC<AuthProps> = () => {
  return (
    <div className="flex justify-center items-center flex-col w-full h-screen">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/sign_up" element={<SignUp />} />
        <Route path="*" element={<Nomatch />} />
      </Routes>
    </div>
  );
};
