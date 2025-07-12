import React from "react";
import HeroImage from "../assets/hero.jpg";
import { MdArrowOutward } from "react-icons/md";
import { Link } from "react-router";

const Hero = () => {
  return (
    <div className="relative font-display">
      <img
        src={HeroImage}
        alt="HeroImage"
        loading="lazy"
        className="w-full h-screen bg-cover"
        style={{ filter: "brightness(50%)" }}
      />
      <div className="absolute bottom-1/5 left-1/18 text-white">
        <div className="flex flex-col gap-8 justify-baseline items-baseline">
          <h1 className="text-8xl font-display font-normal tracking-tight ">
            Choose your best package
          </h1>
          <Link to={"/availabletrips"}>
            <button style={{ filter: "opacity(80%)" }} className="bg-[var(--primary-50)] backdrop-blur-xl flex items-center gap-2 justify-center cursor-pointer text-[var(--primary-950)] text-center tracking-wider rounded-full px-4 py-2 pr-2">
              Find a package
              <span className="text-2xl rounded-full border-2 border-[var(--primary-700)] bg-[var(--primary-color)] p-1">
                <MdArrowOutward />
              </span>
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Hero;
