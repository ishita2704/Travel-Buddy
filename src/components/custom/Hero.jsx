import React from "react";
import pic from "../../assets/backpacker (1).png";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <div className="relative flex flex-col md:flex-row items-center justify-center min-h-screen w-screen bg-white px-6 md:px-10 pt-20 md:pt-0 overflow-hidden">
      {/* Left Side - Text */}
      <div className="md:w-1/2 text-center md:text-left space-y-6 max-w-screen-xl">
        <h1 className="text-4xl md:text-5xl font-extrabold leading-tight">
          <span className="text-blue-600">Travel Buddy</span> : Your AI Powered
          Trip Planner
        </h1>
        <p className="text-gray-600 text-lg md:text-xl">
          Plan smarter, explore better. Let AI craft the perfect itinerary just
          for you!
        </p>
        <Link to={'/create-trip'} >
        <button className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-full shadow-md hover:bg-blue-700 transition-all duration-300 transform hover:scale-105">
          Get Started, It's Free
        </button>
        </Link>
      </div>

      {/* Right Side - Image with Blob Background */}
      <div className="relative md:w-1/2 flex justify-center mt-3 left-12 max-w-screen-xl">
        {/* Blob SVG (Hidden on Small Screens) */}
        <img
          src="/blob.svg"
          alt="Background Blob"
          className="absolute w-[900px] md:w-[950px] opacity-70 right-8 ml-32 -mt-32 hidden md:block"
        />

        {/* Backpacker Image */}
        <img
          src={pic}
          alt="Backpacker"
          className="w-64 md:w-80 drop-shadow-xl transition-transform duration-300 hover:scale-105 relative z-10"
        />
      </div>
    </div>
  );
};

export default Hero;
