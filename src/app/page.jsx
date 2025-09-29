"use client";

import { useState } from "react";
import Image from "next/image";
import { BiSearchAlt2 } from "react-icons/bi";
import { WiDaySunny, WiCloud, WiRain, WiSnow, WiThunderstorm, WiFog, WiHumidity } from "react-icons/wi";
import { LuWind } from "react-icons/lu";


export default function Home() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(null);

  async function getWeather() {
    try {
      setError(null);
      setWeather(null);

      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.NEXT_PUBLIC_WEATHER_API_KEY}&units=metric`
      );

      if (!res.ok) {
        throw new Error("City not found!");
      }

      const data = await res.json();
      setWeather(data);
    } catch (err) {
      setError(err.message);
    }
  }

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
          <BiSearchAlt2 size={22} className="text-white/80 cursor-pointer" onClick={getWeather} />
        </div>

        {!weather && !error && (
          <section>
            <div className="flex justify-center mb-6">
              <Image
                src="/imgi_3_search-city.png"
                alt="weather illustration"
                width={200}
                height={200}
                className="mx-auto"
              />
            </div>
            <h2 className="text-2xl font-bold mb-2">Search City</h2>
            <p className="text-lg text-white/60">Find out the weather conditions based on the City</p>
          </section>
        )}

        {weather && (
          <section className="flex flex-col items-center gap-4">
            <div className="text-6xl">
              {weather.weather[0].main === "Clear" && <WiDaySunny size={100} className="text-yellow-400" />}
              {weather.weather[0].main === "Clouds" && <WiCloud size={100} className="text-gray-300" />}
              {weather.weather[0].main === "Rain" && <WiRain size={100} className="text-blue-400" />}
              {weather.weather[0].main === "Snow" && <WiSnow size={100} className="text-white" />}
              {weather.weather[0].main === "Thunderstorm" && <WiThunderstorm size={100} className="text-purple-400" />}
              {(weather.weather[0].main === "Fog" || weather.weather[0].main === "Mist") && <WiFog className="text-gray-200" />}
            </div>

            <h2 className="text-3xl font-bold">{weather.name}</h2>

            <p className="text-4xl font-extrabold">{Math.round(weather.main.temp)}°C</p>

            <p className="capitalize text-white/70 text-lg">{weather.weather[0].description}</p>

            <div className="flex justify-around w-full mt-4 text-white/80">
              <div className="flex items-center">
                <WiHumidity size={40} className="mr-1.5"/>
                <div className="flex flex-col items-center">
                  <span className="font-semibold">{weather.main.humidity}%</span>
                <span className="text-sm">Humidity</span>
                </div>
              </div>
              <div className="flex items-center">
                <LuWind size={30} className="mr-1.5"/>
                <div className="flex flex-col items-center">
                  <span className="font-semibold">{Math.round(weather.wind.speed)} m/s</span>
                  <span className="text-sm">Wind</span>
                </div>
              </div>
            </div>
          </section>
        )}


        {error && (
          <section>
            <div className="flex justify-center mb-6">
              <Image
                src="/imgi_4_not-found.png"
                alt="error illustration"
                width={200}
                height={150}
                className="mx-auto"
              />
            </div>
            <h2 className="text-3xl font-bold text-white mb-2">Error</h2>
            <p className="text-lg text-red-50/70">{error}</p>
          </section>
        )}

      </div>
    </div>
  );
}
