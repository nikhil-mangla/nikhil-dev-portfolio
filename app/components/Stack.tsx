import React, { useEffect } from "react";

import { FaHtml5, FaCss3Alt, FaJs, FaReact, FaPython } from "react-icons/fa";
import { SiTailwindcss, SiVite, SiAmazon, SiDocker, SiFlutter, SiFirebase, SiMongodb } from "react-icons/si";

import { TbBrandNextjs } from "react-icons/tb";
import { motion, animate, useMotionValue, useMotionTemplate } from "framer-motion";

const stackItems = [
    { id: 1, name: "HTML", icon: FaHtml5, color: "#E34F26" },
    { id: 2, name: "CSS", icon: FaCss3Alt, color: "#1572B6" },
    { id: 3, name: "JavaScript", icon: FaJs, color: "#F7DF1E" },
    { id: 4, name: "Tailwind CSS", icon: SiTailwindcss, color: "#38BDF8" },
    { id: 5, name: "ReactJS", icon: FaReact, color: "#61DAFB" },
    { id: 6, name: "Vite", icon: SiVite, color: "#646CFF" },
    { id: 7, name: "AWS", icon: SiAmazon, color: "#FF9900" },
    { id: 8, name: "Docker", icon: SiDocker, color: "#2496ED" },
    { id: 9, name: "Flutter", icon: SiFlutter, color: "#02569B" },
    { id: 10, name: "Firebase", icon: SiFirebase, color: "#FFCA28" },
    { id: 11, name: 'Next.js', icon: TbBrandNextjs, color: '#000000' },
    { id: 12, name: "Python", icon: FaPython, color: "#3776AB" },
    { id: 13, name: 'MongoDB', icon: SiMongodb, color: '#47A248' },
];

const COLORS_TOP = ["#13FFAA", "#1E67C6", "#CE84CF", "#DD335C"];

export const Stack = () => {
    const color = useMotionValue(COLORS_TOP[0]);

    useEffect(() => {
        animate(color, COLORS_TOP, {
            ease: "easeInOut",
            duration: 10,
            repeat: Infinity,
            repeatType: "mirror",
        });
    }, [color]);

    const backgroundImage = useMotionTemplate`radial-gradient(125% 125% at 50% 0%, #000 50%, ${color})`;

    return (
        <motion.section className="py-16" id="techstack" style={{ backgroundImage }}>
            <div className="max-w-[1200px] mx-auto px-4 text-center">
                <h2 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#6366f1] to-[#a855f7] mb-4">
                    My TechStack
                </h2>
                <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
                    {stackItems.map((item) => (
                        <div
                            key={item.id}
                            className="flex flex-col items-center justify-center rounded-xl p-4"
                        >
                            {React.createElement(item.icon, {
                                size: 100,
                                color: item.color,
                            })}
                            <p className="text-gray-400 font-semibold mt-4">{item.name}</p>
                        </div>
                    ))}
                </div>
            </div>
        </motion.section>
    );
};