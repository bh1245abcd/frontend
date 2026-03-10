
import React, { useState } from 'react'
import firstp from "../assets/menpone.webp";
import secondp from "../assets/menptwo.webp";
import thirdp from "../assets/menpthree.webp";
import fourthp from "../assets/menpfour.webp";
import fifthp from "../assets/menpfive.webp";
import sixthp from "../assets/menpsix.webp";
import { Filter, SortAsc, X } from "lucide-react";
import { Link } from 'react-router-dom';

const Gift = () => {
  const [openFilter, setOpenFilter] = useState(false);

  const products = [
    { id: "GI1", name: "Royal Gold Chain", price: "₹45,000", image: firstp },
    { id: "GI2", name: "Emerald Ring", price: "₹35,500", image: secondp },
    { id: "GI3", name: "Diamond Bracelet", price: "₹58,000", image: thirdp },
    { id: "GI4", name: "Gold Kada", price: "₹42,000", image: fourthp },
    { id: "GI5", name: "Platinum Pendant", price: "₹64,000", image: fifthp },
    { id: "GI6", name: "Sapphire Brooch", price: "₹55,000", image: sixthp },
  ];

  return (
    <div className="bg-white min-h-screen py-10 px-4 sm:px-6 md:px-16 mt-38 md:mt-20">

      {/* ---------- Top Filter + Sort Bar ---------- */}
      <div className="flex flex-wrap justify-between items-center border-b pb-4 mb-10 gap-4">

        {/* Filter Button (opens on mobile) */}
        <button
          onClick={() => setOpenFilter(true)}
          className="flex items-center gap-2 text-gray-700 font-medium"
        >
          <Filter className="w-5 h-5 text-amber-700" />
          <span>Filters</span>
        </button>

        <div className="text-gray-600 text-sm md:text-base">
          Showing <span className="font-semibold">{products.length}</span> Products
        </div>

        {/* Sort Dropdown */}
        <div className="flex items-center gap-2 text-gray-700 font-medium">
          <SortAsc className="w-5 h-5 text-amber-700" />
          <select className="border border-gray-300 rounded-lg px-2 py-1 text-sm bg-white">
            <option>Featured</option>
            <option>Price: Low to High</option>
            <option>Price: High to Low</option>
            <option>Newest</option>
          </select>
        </div>
      </div>

      {/* ---------- Product Grid ---------- */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
        {products.map((item) => (
          <div
            key={item.id}
            className="group shadow-md hover:shadow-xl transition duration-300 rounded-2xl overflow-hidden bg-gray-50"
          >
            <div className="relative">
              <Link to={`/product/${item.id}`} state={{ product: item }}><img
                src={item.image}
                alt={item.name}
                className="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-500"
              /></Link>

              
                {/* <button className="absolute bottom-3 right-3 bg-white px-3 py-1 text-sm font-medium text-amber-700 border border-amber-700 rounded-full opacity-0 group-hover:opacity-100 transition">
                  View
                </button> */}
              
            </div>

            <div className="p-4 text-center">
              <h3 className="font-semibold text-gray-800 text-lg">{item.name}</h3>
              <p className="text-amber-700 font-medium mt-1">{item.price}</p>
            </div>
          </div>
        ))}
      </div>

      {/* ---------- MOBILE FILTER SLIDE-UP PANEL ---------- */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm z-40 transition-opacity duration-300 ${openFilter ? "opacity-100 visible" : "opacity-0 invisible"
          }`}
        onClick={() => setOpenFilter(false)}
      />

      <div
        className={`fixed bottom-0 left-0 w-full bg-white rounded-t-3xl shadow-xl z-50 p-6 transition-transform duration-300 
        ${openFilter ? "translate-y-0" : "translate-y-full"}`}
      >
        <div className="flex justify-between items-center border-b pb-3">
          <h2 className="text-lg font-semibold text-gray-800">Filters</h2>
          <button onClick={() => setOpenFilter(false)}>
            <X className="w-6 h-6 text-gray-700" />
          </button>
        </div>

        {/* Filters Content */}
        <div className="mt-5 space-y-5 text-gray-700">

          <div>
            <h3 className="font-medium mb-2">Price Range</h3>
            <ul className="space-y-2 text-sm">
              <li><input type="checkbox" /> ₹10,000 - ₹30,000</li>
              <li><input type="checkbox" /> ₹30,000 - ₹50,000</li>
              <li><input type="checkbox" /> ₹50,000 - ₹80,000</li>
            </ul>
          </div>

          <div>
            <h3 className="font-medium mb-2">Material</h3>
            <ul className="space-y-2 text-sm">
              <li><input type="checkbox" /> Gold</li>
              <li><input type="checkbox" /> Platinum</li>
              <li><input type="checkbox" /> Diamond</li>
            </ul>
          </div>

        </div>

        <button
          onClick={() => setOpenFilter(false)}
          className="mt-6 w-full bg-amber-700 text-white py-2 rounded-lg font-medium"
        >
          Apply Filters
        </button>
      </div>
    </div>
  );
};

export default Gift;
