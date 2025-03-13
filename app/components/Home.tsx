"use client";

import React, { useState, useCallback, useEffect, useMemo} from "react";
import { motion, useMotionValue, animate, useMotionTemplate } from "framer-motion";
import Image from "next/image";
import { Sparkles } from "lucide-react";
import profilePic from "@/app/assets/Image.png"; 
import { FiArrowRight } from 'react-icons/fi';

const COLORS_TOP = ["#13FFAA", "#1E67C6", "#CE84CF", "#DD335C"];

const StatusBadge = React.memo(() => (
  <div className="inline-block animate-float lg:mx-0" data-aos="zoom-in" data-aos-delay="400">
    <div className="relative group">
      <div className="absolute -inset-0.5 bg-gradient-to-r from-[#6366f1] to-[#a855f7] rounded-full blur opacity-30 group-hover:opacity-50 transition duration-1000"></div>
      <div className="relative px-3 sm:px-4 py-2 rounded-full bg-black/40 backdrop-blur-xl border border-white/10">
        <span className="bg-gradient-to-r from-[#6366f1] to-[#a855f7] text-transparent bg-clip-text sm:text-sm text-[0.7rem] font-medium flex items-center">
          <Sparkles className="sm:w-4 sm:h-4 w-3 h-3 mr-2 text-blue-400" />
          Ready to Innovate
        </span>
      </div>
    </div>
  </div>
));
StatusBadge.displayName = "StatusBadge";

const MainTitle = React.memo(() => (
  <div className="space-y-2" data-aos="fade-up" data-aos-delay="600">
    <h1 className="text-5xl sm:text-6xl md:text-6xl lg:text-6xl xl:text-7xl font-bold tracking-tight">
      <span className="relative inline-block">
        <span className="absolute -inset-2 bg-gradient-to-r from-[#6366f1] to-[#a855f7] blur-2xl opacity-20"></span>
        <span className="relative bg-gradient-to-r from-white via-blue-100 to-purple-200 bg-clip-text text-transparent">
          Fullstack&nbsp;
        </span>
      </span>
     
      <span className="relative inline-block mt-2">
        <span className="absolute -inset-2 bg-gradient-to-r from-[#6366f1] to-[#a855f7] blur-2xl opacity-20"></span>
        <span className="relative bg-gradient-to-r from-[#6366f1] to-[#a855f7] bg-clip-text text-transparent">
          Developer
        </span>
      </span>
    </h1>
  </div>
));
MainTitle.displayName = "MainTitle";

export const Home = () => {
    const color = useMotionValue(COLORS_TOP[0]);

    useEffect(() => {
        animate(color, COLORS_TOP, {
            ease: "easeInOut",
            duration: 10,
            repeat: Infinity,
            repeatType: "mirror",
        });
    }, [color]);

    const TYPING_SPEED = 100;
    const ERASING_SPEED = 50;
    const PAUSE_DURATION = 2000;
    const WORDS = useMemo(() => [
      "Computer Science Student", 
      "Tech Enthusiast", 
      "Cloud Computing"
  ], []);  
    const [isTyping, setIsTyping] = useState(true);
    const [charIndex, setCharIndex] = useState(0);
    const [wordIndex, setWordIndex] = useState(0);
    const [text, setText] = useState("");

    const handleTyping = useCallback(() => {
        if (isTyping) {
            if (charIndex < WORDS[wordIndex].length) {
                setText((prev) => prev + WORDS[wordIndex][charIndex]);
                setCharIndex((prev) => prev + 1);
            } else {
                setTimeout(() => setIsTyping(false), PAUSE_DURATION);
            }
        } else {
            if (charIndex > 0) {
                setText((prev) => prev.slice(0, -1));
                setCharIndex((prev) => prev - 1);
            } else {
                setWordIndex((prev) => (prev + 1) % WORDS.length);
                setIsTyping(true);
            }
        }
    }, [charIndex, isTyping, wordIndex, WORDS]);

    useEffect(() => {
        const timeout = setTimeout(
            handleTyping,
            isTyping ? TYPING_SPEED : ERASING_SPEED
        );
        return () => clearTimeout(timeout);
    }, [handleTyping, isTyping]);

    const backgroundImage = useMotionTemplate`radial-gradient(125% 125% at 50% 0%, #000 50%, ${color})`;
    const border = useMotionTemplate `1px solid ${color}`;
    const boxShadow = useMotionTemplate `0px 4px 24px ${color}`;
    return (
        <motion.section
            style={{ backgroundImage }}
            id="home"
            className="relative grid min-h-screen place-content-center overflow-hidden px-4 py-24 text-gray-200"
        >
            <div className="z-10 flex flex-col items-center text-center">
                <span className="relative inline-block group">
                    <span className="absolute -inset-0.5 bg-gradient-to-r from-[#6366f1] to-[#a855f7] rounded-full blur opacity-30 group-hover:opacity-50 transition duration-1000"></span>
                    <span className="relative mb-1.5 inline-block rounded-full bg-black/40 backdrop-blur-xl border border-white/10 px-3 py-1.5 text-sm text-transparent bg-clip-text bg-gradient-to-r from-[#6366f1] to-[#a855f7]">
                        Open for work
                    </span>
                </span>

                <h1 className="text-white/40 text-5xl md:text-7xl font-black">Hi, I am</h1>
                <h1 className="max-w-3xl bg-gradient-to-br from-white to-gray-400 bg-clip-text font-black leading-tight text-transparent text-5xl md:text-7xl">
                    Nikhil Mangla
                </h1>

                <div className="mt-4">
                    <Image
                        src={profilePic}
                        alt="Profile Picture"
                        width={250}
                        
                        className="rounded-full"
                    />
                </div>

                <div className="mt-6">
                    <StatusBadge />
                </div>
                <div className="mt-4">
                    <MainTitle />
                </div>
                {/* Typing Effect */}
                <div className="h-8 flex items-center" data-aos="fade-up" data-aos-delay="800">
                    <span className="text-xl md:text-2xl bg-gradient-to-r from-gray-100 to-gray-300 bg-clip-text text-transparent font-light">
                        {text}
                    </span>
                    <span className="w-[3px] h-6 bg-gradient-to-t from-[#6366f1] to-[#a855f7] ml-1 animate-blink"></span>
                </div>

                <p className="text-base md:text-lg text-gray-400 max-w-xl leading-relaxed font-light" data-aos="fade-up" data-aos-delay="1000">
                    Creating Innovative, Functional, and User-Friendly Websites.
                    
                </p>
                <br />
                <motion.button 
  style={{ border, boxShadow }} 
  whileHover={{ scale: 1.015 }} 
  whileTap={{ scale: 0.985 }} 
  className="flex w-fit items-center gap-2 rounded-full px-4 py-2"
  onClick={() => window.open("https://drive.google.com/file/d/1z9rO6PPwNNyXguy69WTHktbwMrdZiUcd/view?usp=sharing", "_blank")}
>

  Download Resume
  <FiArrowRight />
</motion.button>
        </div >

        <div className="bg-circle-container">
            <div className="bg-circle-background"></div>
            <div className="bg-circle"></div>
        </div>

        </motion.section>
        
    );
};
