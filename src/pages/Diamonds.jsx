import React from 'react'
import firstp from "../assets/diamondpone.webp";
import secondp from "../assets/diamondptwo.webp";
import thirdp from "../assets/diamondpthree.webp";
import fourthp from "../assets/diamondpfour.webp";
import fifthp from "../assets/diamondpfive.webp";
import sixthp from "../assets/diamondpsixth.webp";
import { SlidersHorizontal, Filter, SortAsc } from "lucide-react";
import { Link, useNavigate } from 'react-router-dom';

const Diamonds = () => {
    const nav = useNavigate()
    const products = [
       { id: "D1", name: "Royal Diamond Ring", price: "₹75,000", image: firstp },
       { id: "D2", name: "Royal Diamond Earing", price: "₹65,500", image: secondp },
       { id: "D3", name: "Ripple curve Diamond Ring", price: "₹58,000", image: thirdp },
       { id: "D4", name: "Classy Diamond Ring", price: "₹42,000", image: fourthp },
       { id: "D5", name: "Premium Diamond Ring", price: "₹70,000", image: fifthp },
       { id: "D6", name: "Infinite Diamond Earing", price: "₹65,000", image: sixthp },
     ];
  
   return (
       <div className="bg-white min-h-screen py-10 px-6 md:px-16 mt-30 md:mt-20">
         {/* ---------- Top Filter + Sort Bar ---------- */}
         <div className="flex flex-wrap justify-between items-center border-b pb-4 mb-10">
           <div className="flex items-center gap-3 text-gray-700 font-medium">
             <Filter className="w-5 h-5 text-amber-700" />
             <span>Filters</span>
           </div>
   
           <div className="text-gray-600 text-sm md:text-base">
             Showing <span className="font-semibold">{products.length}</span> Products
           </div>
   
           <div className="flex items-center gap-2 text-gray-700 font-medium">
             <SortAsc className="w-5 h-5 text-amber-700" />
             <select
               className="border border-gray-300 rounded-lg px-2 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-amber-600 bg-white"
             >
               <option>Sort by: Featured</option>
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
               className="group shadow-md hover:shadow-xl transition-shadow duration-300 rounded-2xl overflow-hidden bg-gray-50"
             >
               <div className="relative">
                 <Link  to={`/product/${item.id}`} state={{ product: item }}> <img
                   src={item.image}
                   alt={item.name}
                   className="w-full h-80 object-cover transition-transform duration-500 group-hover:scale-105"
                 /></Link>
                {/* <button className="absolute bottom-3 right-3 bg-white px-3 py-1 text-sm font-medium text-amber-700 border border-amber-700 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300">
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
       </div>
     );
}

export default Diamonds