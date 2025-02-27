'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

interface CardItemProps {
  Title: string;
  Description: string;
  LiveLink: string;
  id: string;
}

const CardItem: React.FC<CardItemProps> = ({ Title, Description, id }) => {
  // const handleLiveDemo = (e: React.MouseEvent<HTMLAnchorElement>) => {
    // if (!LiveLink) {
    //   console.log("Live demo link is empty");
    //   e.preventDefault();
    //   alert("Live demo is not available");
    // }
  // };

  const handleDetails = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!id) {
      console.log("ID is empty");
      e.preventDefault();
      alert("Details are not available");
    }
  };

  return (
    <div className="group relative w-full">
      <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-gray-900/90 to-gray-800/90 backdrop-blur-lg border border-white/10 shadow-2xl transition-all duration-300 hover:shadow-blue-500/20">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-green-500/10 to-yellow-500/10 opacity-50 group-hover:opacity-70 transition-opacity duration-300"></div>

        <div className="relative p-5 z-10">
          <div className="mt-4 space-y-3">
            <h3 className="text-xl font-semibold bg-gradient-to-r from-blue-200 via-green-200 to-yellow-200 bg-clip-text text-transparent">
              {Title}
            </h3>

            <div className="text-gray-300/80 text-sm leading-relaxed line-clamp-2">
              {Description}
            </div>

            <div className="pt-4 flex items-center justify-between">
              {id ? (
                <Link
                  href={`/projects/${id}`}
                  onClick={handleDetails}
                  className="inline-flex items-center space-x-2 px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-white/90 transition-all duration-200 hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                >
                  <span className="text-sm font-medium">More Info</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              ) : (
                <span className="text-gray-500 text-sm">Details Not Available</span>
              )}
              
              {/* {LiveLink && (
                <a
                  href={LiveLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={handleLiveDemo}
                  className="inline-flex items-center space-x-2 px-4 py-2 rounded-lg bg-gradient-to-r from-blue-600/20 to-purple-600/20 hover:from-blue-600/30 hover:to-purple-600/30 text-white/90 transition-all duration-200 hover:scale-105 active:scale-95"
                > */}
                  {/* <span className="text-sm font-medium">Live Demo</span> */}
                  {/* <ExternalLink className="w-4 h-4" /> */}
                {/* </a>
              )} */}
            </div>
          </div>

          <div className="absolute inset-0 border border-white/0 group-hover:border-blue-500/50 rounded-xl transition-colors duration-300 -z-50"></div>
        </div>
      </div>
    </div>
  );
};

export default CardItem;