"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Code2, Github, User } from "lucide-react";
import AOS from 'aos';

import { Home } from "./components/Home"; 

// import Portfolio from "./portfolio";
import { Navbar } from "./components/Navbar";
import { Stack } from "./components/Stack";
import Portfolio from "./components/Portfolio";
import ContactPage from "./components/Contact";
// import AnimatedBackground from "./components/Backgroud";
// import ContactPage from "./contact";
// import AboutPage from "@/app/about";

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

const WelcomeScreen = ({ onLoadingComplete }: { onLoadingComplete: () => void }) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
    const timer = setTimeout(() => {
      setIsLoading(false);
      setTimeout(() => {
        onLoadingComplete();
      }, 1000);
    }, 2000);
    return () => clearTimeout(timer);
  }, [onLoadingComplete]);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          className="fixed inset-0 bg-[#030014]"
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

const Page = () => {
  const [showHome, setShowHome] = useState(false);

  return showHome ? (
    <div>
      <Navbar />
    <br />
    <br />
      <Home />
      {/* <AboutPage /> */}
   
    <Portfolio />
    <br />
    <br />
    <Stack />
      <ContactPage />
    </div>
  ) : (
    <WelcomeScreen onLoadingComplete={() => setShowHome(true)} />
  );
};

export default Page;