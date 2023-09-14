import React from "react";
import { Link, NavLink } from "react-router-dom";

export const ProfileTabs = () => {
  const navLinkStyles = ({ isActive }: any) => {
    return isActive ? { borderBottom: "2px solid blue" } : {};
  };
  const isProfileRoute = window.location.pathname === "/profile";
  return (
    <section className="mt-1 m-auto bg-myPrimary rounded-md shadow-myShadowColor shadow-md flex">
      <Link to="/profile/*" className="cursor-pointer p-2 ">
        Timeline &nbsp; <i className="pi pi-history" />
      </Link>
      {/* <NavLink
        style={navLinkStyles}
        to="/profile/about"
        className="cursor-pointer p-2"
      >
        About &nbsp; <i className="pi pi-user-edit" />
      </NavLink> */}
      {/* <NavLink
        style={navLinkStyles}
        to="/profile/people"
        className="cursor-pointer p-2"
      >
        People &nbsp; <i className="pi pi-users" />
      </NavLink>
      <NavLink
        style={navLinkStyles}
        to="/profile/photos"
        className="cursor-pointer p-2"
      >
        Photos &nbsp; <i className="pi pi-images" />
      </NavLink> */}
    </section>
  );
};
