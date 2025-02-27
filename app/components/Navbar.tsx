"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import { motion, useMotionValue, useMotionTemplate, animate } from "framer-motion";

const navLinks = [
  { title: "Home", path: "/#home" },
  { title: "Portfolio", path: "/#portfolio" },
  { title: "Techstack", path: "/#techstack" },
  { title: "Contact", path: "/#contact" },
];

const COLORS_TOP = ["#13FFAA", "#1E67C6", "#CE84CF", "#DD335C"];

export const Navbar = () => {
  const color = useMotionValue(COLORS_TOP[0]);
  const [nav, setNav] = useState(false);
  const [showNavbar, setShowNavbar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const toggleNav = () => setNav(!nav);
  const closeNav = () => setNav(false);

  // Detect scroll direction
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setShowNavbar(currentScrollY < lastScrollY);
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  // Update color dynamically
  useEffect(() => {
    animate(color, COLORS_TOP, {
        ease: "easeInOut",
        duration: 10,
        repeat: Infinity,
        repeatType: "mirror",
    });
}, [color]);

  // Fix: Get string values from MotionTemplate
  const border = useMotionTemplate`1px solid ${color}`;
  const boxShadow = useMotionTemplate`0px 4px 24px ${color}`;

  return (
    <motion.section
      className={`z-50 fixed top-0 w-full transition-transform duration-300 ${
        showNavbar ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      {/* Desktop Navbar */}
      <motion.section 
        className="border border-white/20 mt-8 backdrop-blur-3xl rounded-3xl hidden md:flex items-center justify-center p-2 max-w-[400px] mx-auto font-bold"
        style={{ border: border.get(), boxShadow: boxShadow.get() }}
      >
        <ul className="flex flex-row p-2 space-x-8">
          {navLinks.map((link, index) => (
            <li
              key={index}
              className="transform hover:text-white/50 transition-all duration-300 ease-in-out"
            >
              <Link href={link.path}>{link.title}</Link>
            </li>
          ))}
        </ul>
      </motion.section>

      {/* Mobile Menu Toggle */}
      <div
        onClick={toggleNav}
        className="md:hidden absolute top-5 right-14 border rounded z-50 text-white/70 border-white p-2"
      >
        {nav ? <AiOutlineClose size={30} /> : <AiOutlineMenu size={30} />}
      </div>

      {/* Mobile Navigation Menu */}
      <div
        className={`fixed left-0 top-0 w-full h-full bg-black/90 transform transition-transform duration-300 ${
          nav ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <ul className="flex flex-col items-center justify-center space-y-8 h-full">
          {navLinks.map((link, index) => (
            <li key={index}>
              <Link href={link.path} onClick={closeNav} className="text-5xl">
                {link.title}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </motion.section>
  );
};