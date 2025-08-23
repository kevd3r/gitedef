"use client";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react"; // icônes (install via `npm install lucide-react`)
import profilePic from "../../../public/images/logo/logo.svg";

const Header = () => {
  const [currentPath, setCurrentPath] = useState("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setCurrentPath(window.location.pathname);
    }
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const menu = [
    { title: "Accueil", url: "/" },
    { title: "Hébergement", url: "/housing" },
    { title: "Réservations", url: "/booking" },
    { title: "Soins bien-être", url: "/wellness" },
    { title: "Contact", url: "/contact" },

  ];

  const headerBgClass = currentPath === "/" ? "bg-transparent" : "bg-[#0C1824]";
  const textColorClass = "text-gray-300";
  const hoverTextColorClass = "hover:text-white";

  return (
    <header
      className={`w-full h-[10vh] flex justify-between items-center px-[5vw] z-10 transition-colors duration-300 ${headerBgClass}`}
    >
      <Link href={"/"}>
        <Image src={profilePic} alt="Logo" width={60} height={60} />
      </Link>

      {/* Desktop Menu */}
      <ul className="hidden md:flex gap-6">
        {menu.map((item) => (
          <Link href={item.url} key={item.title}>
            <li
              className={`${textColorClass} ${hoverTextColorClass} font-bold transition-colors duration-200`}
            >
              {item.title}
            </li>
          </Link>
        ))}
      </ul>

      {/* Hamburger Icon */}
      <button
        onClick={toggleMobileMenu}
        className="md:hidden z-50 text-gray-300"
        aria-label="Toggle Mobile Menu"
      >
        {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
      </button>

      {/* Mobile Menu */}
      <div
        className={`fixed top-0 right-0 h-full w-64 bg-[#0C1824] p-6 transition-transform duration-300 z-50 shadow-lg ${
          isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
         <div className="flex justify-end">
          <button onClick={toggleMobileMenu} className="text-gray-300" aria-label="Close Mobile Menu">
            <X size={28} />
          </button>
        </div>
        <ul className="flex flex-col gap-6 mt-12">
          {menu.map((item) => (
            <Link
              href={item.url}
              key={item.title}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <li
                className={`text-gray-300 hover:text-white text-lg font-semibold transition-colors`}
              >
                {item.title}
              </li>
            </Link>
          ))}
        </ul>
      </div>
    </header>
  );
};

export default Header;
