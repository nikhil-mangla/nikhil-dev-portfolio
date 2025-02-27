// "use client";
// import React, { useRef } from "react";
// import Navbar from "@/app/components/Navbar";
// import Home from "./components/Home";
// import Portfolio from "./components/Portfolio";
// import TechStack from "./components/Stack";
// import Contact from "./components/Contact";

// export default function App() {
//   const homeRef = useRef(null);
//   const portfolioRef = useRef(null);
//   const techStackRef = useRef(null);
//   const contactRef = useRef(null);

//   return (
//     <div>
//       <Navbar sections={{ homeRef, portfolioRef, techStackRef, contactRef }} />
      
//       <div ref={homeRef}>
//         <Home />
//       </div>

//       <div ref={portfolioRef}>
//         <Portfolio />
//       </div>

//       <div ref={techStackRef}>
//         <TechStack />
//       </div>

//       <div ref={contactRef}>
//         <Contact />
//       </div>
//     </div>
//   );
// }