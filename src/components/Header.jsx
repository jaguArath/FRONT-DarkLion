import React from "react";
import DarkLogo from "../assets/Logo.png";
import { NavLink } from "react-router-dom";
import {
  ToggleVault,
  ToggleVaultTrigger,
  ToggleVaultContent,
  ToggleVaultClose,
} from "@/components/ui/toggle-vault";

export default function Header() {
  return (
    <header className="w-full flex items-center justify-between px-3 sm:px-10 py-0 sm:py-1 bg-morado text-white shadow-md left-0 z-50">
      {/* <header className="w-full flex items-center justify-between px-6 sm:px-10 py-1 bg-morado text-white shadow-md sticky|fixed top-0 z-50"> */}
      <a className="flex justify-between" rel="noreferrer">
        <img
          src={DarkLogo}
          alt="dark logo"
          className="h-9 sm:h-16 px-2"
          title="Dark Lion"
        />
      </a>

      <nav className="hidden sm:flex items-center gap-6">
        <a
          href="/"
          style={{ fontFamily: "Chakra" }}
          className="text-white text-sm font-medium hover:bg-white hover:text-purple-700 hover:scale-100 transition-all duration-200 px-3 py-2 rounded-lg"
        >
          HOME
        </a>
        <a
          href="https://www.darklion.com.mx/"
          target="_blank"
          rel="noreferrer"
          style={{ fontFamily: "Chakra" }}
          className="text-white text-sm font-medium hover:bg-white hover:text-purple-700 hover:scale-100 transition-all duration-200 px-3 py-2 rounded-lg"
        >
          VOLVER A INICIO
        </a>
      </nav>

      <div className="flex items-center sm:hidden">
        <ToggleVault>
          <ToggleVaultTrigger className="px-2 py-0.5 text-xs font-semibold rounded">
            MENU
          </ToggleVaultTrigger>
          <ToggleVaultClose className="px-2 py-0.5 text-xs font-semibold rounded">
            ✕
          </ToggleVaultClose>
          <ToggleVaultContent className="w-48 h-auto p-4 text-sm flex flex-col gap-2">
            <a
              href="/"
              style={{ fontFamily: "Chakra" }}
              className="text-white hover:bg-white hover:text-purple-700 hover:scale-100 transition-all duration-200 px-3 py-2 rounded"
            >
              HOME
            </a>
            <a
              href="https://www.darklion.com.mx/"
              target="_blank"
              rel="noreferrer"
              style={{ fontFamily: "Chakra" }}
              className="text-white hover:bg-white hover:text-purple-700 hover:scale-100 transition-all duration-200 px-3 py-2 rounded"
            >
              VOLVER A INICIO
            </a>
          </ToggleVaultContent>
        </ToggleVault>
      </div>
    </header>
  );
}
