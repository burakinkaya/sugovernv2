"use client";
import React, { useState, useEffect } from "react";
import { WalletConnect } from "@/helpers/UserHelper";
import Image from "next/image";
import sugovernLogo from "../../public/logo.svg";

const Header = () => {
  const [hamburger, setHamburger] = useState(false);
  const [account, setAccount] = useState<string | null>(null);

  useEffect(() => {
    WalletConnect().then((res) => {
      setAccount(res);
    });
  }, []);

  const handleHamburger = () => {
    setHamburger(!hamburger);
  };

  return (
    <header className="bg-[#16141D] text-white fixed w-full h-fit flex justify-center items-center z-30">
      <div className="container mx-auto px-4 flex justify-between items-center w-full h-full max-w-6xl">
        <div className="flex flex-row justify-center items-center gap-3">
          <Image src={sugovernLogo} alt="SuGovern" className="w-12"></Image>
          <a href="/" className="text-3xl text-[#973B82]">
            SuGovern
          </a>
        </div>

        <nav className="hidden md:flex items-center gap-6">
          <a
            href="https://sugovern.github.io/sugovern-user-docs/what-is-sugovern/"
            className="px-4 py-2 rounded-md bg-transparent hover:bg-white hover:text-[#16141D] transition-colors"
          >
            User Docs
          </a>

          <a
            href="https://sugovern.github.io/sugovern-dev-docs/what-is-sugovern/"
            className="px-4 py-2 rounded-md bg-transparent hover:bg-white hover:text-[#16141D] transition-colors"
          >
            Dev Docs
          </a>

          {account ? (
            <div className="px-4 py-2 rounded-md hover:bg-white hover:text-[#16141D] transition-colors">
              {account}
            </div>
          ) : (
            <button
              onClick={WalletConnect}
              className="px-4 py-2 rounded-md hover:bg-white hover:text-[#16141D] transition-colors"
            >
              Connect Wallet
            </button>
          )}
        </nav>
        <div className="md:hidden">
          <button onClick={handleHamburger}></button>
        </div>
      </div>
      {/* Hamburger menu for mobile view */}
      {hamburger && (
        <div className="absolute top-full left-0 w-full bg-[#16141D] p-4">
          {/* Links for mobile navigation */}
        </div>
      )}
    </header>
  );
};

export default Header;
