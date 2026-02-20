import React from "react";
import DarkLogo from "../assets/Logo.png";
import { NavLink } from "react-router-dom";

export default function Header() {
  return (
    <header className="w-full flex items-center justify-between px-6 sm:px-10 py-1 bg-morado text-white shadow-md left-0 z-50">
    {/* <header className="w-full flex items-center justify-between px-6 sm:px-10 py-1 bg-morado text-white shadow-md sticky|fixed top-0 z-50"> */}
      <a className="flex justify-between" rel="noreferrer">
        <img
          src={DarkLogo}
          alt="dark logo"
          className="h-14 sm:h-16 px-2"
          title="Dark Lion "
        />
      </a>

      <nav className="flex flex-col items-start mt-0 gap-2 sm:flex-row sm:m-0">
        <a
          href="https://www.darklion.com.mx/"
          target="_blank"
          rel="noreferrer"
          style={{ fontFamily: "Chakra, sans-serif" }}
          className="text-white hover:bg-white w-full text-left px-2 rounded-full hover:text-purple-700 hover:scale-100"
        >
          VOLVER A INICIO
        </a>
      </nav>
    </header>
  );
}


