// app/components/WelcomeScreen.tsx
"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Code2, Github, User } from "lucide-react";
import AOS from 'aos';
import 'aos/dist/aos.css';

interface WelcomeScreenProps {
  onLoadingComplete: () => void;
}

const BackgroundEffect = () => (
  <div className="absolute inset-0 overflow-hidden">
    <div className="absolute inset-0 bg-gradient-to-r from-indigo-600/20 to-purple-600/20 blur-3xl animate-pulse" />
    <div className="absolute inset-0 bg-gradient-to-tr from-indigo-600/10 via-transparent to-purple-600/10 blur-2xl animate-float" />
  </div>
);

const IconButton = ({ Icon }: { Icon: React.ElementType }) => (
  <div className="relative group hover:scale-110 transition-transform duration-300">
    <div className="absolute -inset-2 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full blur opacity-30 group-hover:opacity-75 transition duration-300" />
    <div className="relative p-2 sm:p-3 bg-black/50 backdrop-blur-sm rounded-full border border-white/10">
      <Icon className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 text-white" />
    </div>
  </div>
);

export const WelcomeScreen = ({ onLoadingComplete }: WelcomeScreenProps) => {
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Check if welcome screen has been shown in this session
    if (typeof window !== "undefined" && !sessionStorage.getItem("welcomeShown")) {
      AOS.init({ duration: 1000, once: true });
      setIsLoading(true);

      const timer = setTimeout(() => {
        setIsLoading(false);
        setTimeout(() => {
          sessionStorage.setItem("welcomeShown", "true"); // Mark as shown
          onLoadingComplete();
        }, 1000); // Fade-out duration
      }, 2000); // Initial display duration

      return () => clearTimeout(timer);
    } else {
      // Skip welcome screen if already shown
      onLoadingComplete();
    }
  }, [onLoadingComplete]);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          className="fixed inset-0 bg-[#030014] z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)", transition: { duration: 0.8 } }}
        >
          <BackgroundEffect />
          <div className="relative min-h-screen flex items-center justify-center px-4">
            <div className="w-full max-w-4xl mx-auto">
              <motion.div className="flex justify-center gap-4 mb-8">
                {[Code2, User, Github].map((Icon, index) => (
                  <div key={index} data-aos="fade-down" data-aos-delay={index * 200}>
                    <IconButton Icon={Icon} />
                  </div>
                ))}
              </motion.div>
              <motion.div className="text-center mb-8">
                <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold">
                  <div className="mb-4">
                    {["Welcome", "To", "My"].map((word, index) => (
                      <span
                        key={index}
                        data-aos="fade-right"
                        data-aos-delay={200 * index}
                        className="px-2 bg-gradient-to-r from-white via-blue-100 to-purple-200 bg-clip-text text-transparent"
                      >
                        {word}
                      </span>
                    ))}
                  </div>
                  <div>
                    {["Portfolio", "Website"].map((word, index) => (
                      <span
                        key={index}
                        data-aos="fade-up"
                        data-aos-delay={800 + 200 * index}
                        className="px-2 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent"
                      >
                        {word}
                      </span>
                    ))}
                  </div>
                </h1>
              </motion.div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};