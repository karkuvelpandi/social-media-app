import React from "react";
import { Link } from "react-router-dom";

export const Nomatch = () => {
  return (
    <div className="flex flex-col items-center space-y-1">
      <p className="text-8xl">404</p>
      <p className="text-2xl">Page not found</p>
      <Link to="/" className="text-sm text-blue-500">
        Go to home
      </Link>
    </div>
  );
};
