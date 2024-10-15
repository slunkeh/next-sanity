"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";

type NavigationProps = {
  logo: string;
  navigationItems: {
    _key: string;
    title: string;
    href: string;
  }[];
  ctaButton: {
    text: string;
    link: string;
  };
};

export function Navigation({
  logo,
  navigationItems,
  ctaButton,
}: NavigationProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const navbarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const navbarHeight = navbarRef.current?.clientHeight || 0;

    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsScrolled(scrollY >= navbarHeight);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Initialize at component mount

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleNav = () => {
    setIsOpen(!isOpen);
  };

  const handleLinkClick = () => {
    setIsOpen(false);
  };

  const bgClass = isOpen || isScrolled ? "bg-white border-b" : "bg-transparent";

  return (
    <div
      ref={navbarRef}
      className={`fixed flex justify-center w-full z-10 ${bgClass}`}
    >
      <nav className="container-main padding-global">
        <div className="flex items-center justify-between mx-auto p-4 relative">
          <Link href="/">
            <div className="flex gap-4 items-center">
              <Image
                src={logo}
                alt="Logo"
                width={42}
                height={42}
                className="h-12"
              />
              <span className="text-xl font-semibold tracking-tighter">
                Altitude Design
              </span>
            </div>
          </Link>
          <div className="flex">
            <button
              data-collapse-toggle="navbar-sticky"
              type="button"
              className="inline-flex items-center p-2 text-sm text-dark rounded-lg lg:hidden hover:bg-ad-red focus:outline-none focus:ring-2 focus:ring-ad-dark"
              aria-controls="navbar-sticky"
              aria-expanded="false"
              onClick={toggleNav}
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className="w-8 h-8"
                aria-hidden="true"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </button>
          </div>
          <div
            className={`items-center ${
              isOpen
                ? "flex justify-between absolute left-0 right-0 top-14 w-full"
                : "hidden"
            } lg:flex w-full lg:w-auto lg:order-1`}
            id="navbar-sticky"
          >
            <ul className="font-semibold flex flex-col lg:items-center p-4 mt-4 absolute bg-white top-0 right-0 left-0 h-screen gap-4 md:gap-0 lg:h-auto lg:p-0 lg:static lg:flex-row lg:space-x-8 lg:mt-0 lg:bg-transparent z-10">
              {navigationItems.map((item) => (
                <li key={item._key}>
                  <Link
                    onClick={handleLinkClick}
                    href={item.href}
                    className="hover:text-ad-red"
                  >
                    {item.title}
                  </Link>
                </li>
              ))}
              <li className="mt-6 lg:mt-0">
                <div className="inline-block pl-3 lg:pl-0">
                  <Link
                    onClick={handleLinkClick}
                    href={ctaButton?.link || "/"}
                    className="btn btn--dark"
                    aria-current="page"
                  >
                    {ctaButton?.text}
                  </Link>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}
