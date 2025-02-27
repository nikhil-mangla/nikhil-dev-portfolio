"use client"; // Required for Next.js App Router (optional but ensures interactivity)

import { Linkedin, Github } from "lucide-react";

const socialLinks = [
  {
    name: "LinkedIn",
    displayName: "Let's Connect",
    subText: "on LinkedIn",
    icon: Linkedin,
    url: "https://www.linkedin.com/in/nikhil-mangla/",
    color: "#0A66C2",
    gradient: "from-[#0A66C2] to-[#0077B5]",
    isPrimary: true,
  },
  {
    name: "GitHub",
    displayName: "Github",
    subText: "@Nikhil",
    icon: Github,
    url: "https://github.com/nikhil-mangla",
    color: "#ffffff",
    gradient: "from-[#333] to-[#24292e]",
  },
];

const SocialLinks = () => {
  const linkedIn = socialLinks.find((link) => link.isPrimary);
  const github = socialLinks.find((link) => link.name === "GitHub");

  return (
    <div className="w-full bg-gradient-to-br from-white/10 to-white/5 rounded-2xl p-6 py-8 backdrop-blur-xl">
      <h3 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
        <span className="inline-block w-8 h-1 bg-indigo-500 rounded-full"></span>
        Connect With Me
      </h3>

      <div className="flex flex-col gap-4">
        {[linkedIn, github].map(
          (link, index) =>
            link && (
              <a
                key={index}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative flex items-center w-full md:w-auto justify-start p-4 rounded-lg bg-white/5 border border-white/10 overflow-hidden hover:border-white/20 transition-all duration-500"
              >
                <div
                  className={`absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-500 bg-gradient-to-r ${link.gradient}`}
                />
                <div className="relative flex items-center gap-4 w-full">
                  <div className="relative flex items-center justify-center">
                    <div
                      className="absolute inset-0 opacity-20 rounded-md transition-all duration-500 group-hover:scale-110 group-hover:opacity-30"
                      style={{ backgroundColor: link.color }}
                    />
                    <div className="relative p-2 rounded-md">
                      <link.icon className="w-6 h-6 transition-all duration-500 group-hover:scale-105 text-white" />
                    </div>
                  </div>

                  <div className="flex flex-col flex-1">
                    <span className="text-lg font-bold text-gray-200 tracking-tight leading-none group-hover:text-white transition-colors duration-300">
                      {link.displayName}
                    </span>
                    <span className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors duration-300">
                      {link.subText}
                    </span>
                  </div>
                </div>
              </a>
            )
        )}
      </div>
    </div>
  );
};

export default SocialLinks;