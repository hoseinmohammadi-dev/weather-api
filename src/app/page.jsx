"use client";

import { useState } from "react";
import { BiSearchAlt2 } from "react-icons/bi";
import Image from "next/image";

export default function Home() {
  const [city, setCity] = useState("");

  

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-sky-400 to-blue-700">
      <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 w-80 text-center text-white shadow-xl">

        <div className="flex items-center bg-white/20 rounded-xl px-3 py-2 mb-6">
          <input
            type="text"
            placeholder="Search City"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="flex-1 bg-transparent outline-none placeholder-white/70 text-white"
          />
          <BiSearchAlt2 size={22} className="text-white/80" />
        </div>

        <div className="flex justify-center mb-6">
          <Image
            src="/imgi_3_search-city.png"
            alt="weather illustration"
            width={180}
            height={200}
            className="mx-auto"
          />
        </div>

        <h2 className="text-2xl font-bold mb-2">Search City</h2>
        <p className="text-lg text-white/60">Find out the weather conditions based on the City</p>
      </div>
    </div>
  );
}
