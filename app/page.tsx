// app/page.tsx
"use client";

import React, { useState, useEffect, useRef } from "react";
import { Home } from "./components/Home"; 
import { Navbar } from "./components/Navbar";
import { Stack } from "./components/Stack";
import Portfolio from "./components/Portfolio";
import ContactPage from "./components/Contact";
import { WelcomeScreen } from "./components/WelcomeScreen";

// Define allowed section IDs
type SectionId = "home" | "portfolio" | "techstack" | "contact";

const Page = () => {
  const [showContent, setShowContent] = useState(false);
  const homeRef = useRef<HTMLDivElement | null>(null);
  const portfolioRef = useRef<HTMLDivElement | null>(null);
  const stackRef = useRef<HTMLDivElement | null>(null);
  const contactRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (showContent && typeof window !== "undefined") {
      const hash = window.location.hash as `#${SectionId}` | "";
      const sectionRefs: Record<`#${SectionId}`, React.RefObject<HTMLDivElement | null>> = {
        "#home": homeRef,
        "#portfolio": portfolioRef,
        "#techstack": stackRef,
        "#contact": contactRef,
      };

      const targetRef = hash ? sectionRefs[hash] : undefined;
      if (targetRef?.current) {
        targetRef.current.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [showContent]);

  const handleNavClick = (sectionId: SectionId) => {
    const sectionRefs: Record<SectionId, React.RefObject<HTMLDivElement | null>> = {
      home: homeRef,
      portfolio: portfolioRef,
      techstack: stackRef,
      contact: contactRef,
    };

    const targetRef = sectionRefs[sectionId];
    if (targetRef?.current) {
      targetRef.current.scrollIntoView({ behavior: "smooth" });
      window.history.pushState(null, "", `#${sectionId}`);
    }
  };

  const handleWelcomeComplete = () => {
    setShowContent(true);
  };

  return (
    <>
      <WelcomeScreen onLoadingComplete={handleWelcomeComplete} />
      {showContent && (
        <div className="bg-[#030014] text-white">
          <Navbar onNavClick={handleNavClick} />
          <div className="pt-16">
            <section ref={homeRef} id="home">
              <Home />
            </section>
            <section ref={portfolioRef} id="portfolio" className="py-16">
              <Portfolio />
            </section>
            <section ref={stackRef} id="techstack" className="py-16">
              <Stack />
            </section>
            <section ref={contactRef} id="contact" className="py-16">
              <ContactPage />
            </section>
          </div>
        </div>
      )}
    </>
  );
};

export default Page;