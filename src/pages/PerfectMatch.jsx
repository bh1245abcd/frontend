import React from "react";
import bangles from "../assets/bangles.jpg";
import earrings from "../assets/earrings.webp";
import fingerings from "../assets/fingerings.jpg";
import pendents from "../assets/pendents.webp";
import { useNavigate } from "react-router-dom";

const PerfectMatch = () => {

  const nav = useNavigate()

  const items = [
    { name: "Bangles", image: bangles,path: "/bangles" },
    { name: "Earrings", image: earrings,path: "/earrings" },
    { name: "Finger Rings", image: fingerings,path: "/fingerings" },
    { name: "Pendants", image: pendents,path: "/pendents" },
  ];

  return (
    <section className="py-16 bg-gray-50">
      <h2 className="text-4xl font-bold text-center text-[#330000] fraunce-font">
        Find Your Perfect Match
      </h2>
      <p className="text-gray-500 text-2xl text-center mb-8 fraunce-font-light">
        Shop by Category
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 px-6 md:px-11">
        {items.map((item, index) => (
          <div
            key={index}
            onClick={() => nav(item.path)}
            className="relative group rounded-3xl overflow-hidden shadow-2xl cursor-pointer hover:scale-105 transition-transform duration-500"
          >
            {/* Image */}
            <img
              src={item.image}
              alt={item.name}
              className="w-full h-72 object-cover group-hover:scale-110 transition-transform duration-500"
            />
            {/* Overlay */}
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-500"></div>
            {/* Text */}
            <h3 className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white text-xl font-semibold tracking-wide">
              {item.name}
            </h3>
          </div>
        ))}
      </div>
    </section>
  );
};

export default PerfectMatch;
