// import React from 'react'
// import firstp from "../assets/kidpone.webp";
// import secondp from "../assets/kidptwo.webp";
// import thirdp from "../assets/kidpfour.webp";
// import fourthp from "../assets/earpone.webp";
// import fifthp from "../assets/earptwo.webp";
// import sixthp from "../assets/earpthree.webp";
// import { SlidersHorizontal, Filter, SortAsc } from "lucide-react";
// import { Link, useNavigate } from 'react-router-dom';

// const Earings = () => {
//    const nav = useNavigate()
//    const products = [
//      { id: "E1", name: "Royal Jali Earings", price: "₹65,000", image: firstp },
//      { id: "E2", name: "Emerald Earings", price: "₹75,500", image: secondp },
//      { id: "E3", name: "Premium Diamond Earings", price: "₹78,000", image: thirdp },
//      { id: "E4", name: "Premium Green Diamond Earings", price: "₹52,000", image: fourthp },
//      { id: "E5", name: "Premium Gold Earings", price: "₹72,000", image: fifthp },
//      { id: "E6", name: "Premium Sapphire Earings", price: "₹65,000", image: sixthp },
//    ];
 
//    return (
//      <div className="bg-white min-h-screen py-10 px-6 md:px-16 mt-38 md:mt-20">
//        {/* ---------- Top Filter + Sort Bar ---------- */}
//        <div className="flex flex-wrap justify-between items-center border-b pb-4 mb-10">
//          <div className="flex items-center gap-3 text-gray-700 font-medium">
//            <Filter className="w-5 h-5 text-amber-700" />
//            <span>Filters</span>
//          </div>
 
//          <div className="text-gray-600 text-sm md:text-base">
//            Showing <span className="font-semibold">{products.length}</span> Products
//          </div>
 
//          <div className="flex items-center gap-2 text-gray-700 font-medium">
//            <SortAsc className="w-5 h-5 text-amber-700" />
//            <select
//              className="border border-gray-300 rounded-lg px-2 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-amber-600 bg-white"
//            >
//              <option>Sort by: Featured</option>
//              <option>Price: Low to High</option>
//              <option>Price: High to Low</option>
//              <option>Newest</option>
//            </select>
//          </div>
//        </div>
 
//        {/* ---------- Product Grid ---------- */}
//        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
//          {products.map((item) => (
//            <div
//              key={item.id}
//              className="group shadow-md hover:shadow-xl transition-shadow duration-300 rounded-2xl overflow-hidden bg-gray-50"
//            >
//              <div className="relative">
//                <Link to={`/product/${item.id}`} state={{ product: item }}><img
//                  src={item.image}
//                  alt={item.name}
//                  className="w-full h-80 object-cover transition-transform duration-500 group-hover:scale-105"
//                /></Link>
//                {/* <button className="absolute bottom-3 right-3 bg-white px-3 py-1 text-sm font-medium text-amber-700 border border-amber-700 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300">
//                  View
//                </button> */}
//              </div>
 
//              <div className="p-4 text-center">
//                <h3 className="font-semibold text-gray-800 text-lg">{item.name}</h3>
//                <p className="text-amber-700 font-medium mt-1">{item.price}</p>
//              </div>
//            </div>
//          ))}
//        </div>
//      </div>
//    );
// }

// export default Earings

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProductsByCategory } from "../api/auth";
import ProductGrid from "../reusable/productgrid";

import firstp from "../assets/menpone.webp";
import secondp from "../assets/menptwo.webp";
import thirdp from "../assets/menpthree.webp";
import fourthp from "../assets/menpfour.webp";
import fifthp from "../assets/menpfive.webp";
import sixthp from "../assets/menpsix.webp";

const Earings = () => {
  const { categoryId } = useParams(); // 🔥 dynamic category
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const images = [
    firstp,
    secondp,
    thirdp,
    fourthp,
    fifthp,
    sixthp,
  ];

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getProductsByCategory(categoryId);

        const mappedProducts = (data || []).map((item, index) => ({
          id: item.id,
          name: item.productName,
          price: `₹${item.price}`,
          image: images[index % images.length],
        }));

        setProducts(mappedProducts);
      } catch (error) {
        console.error("API Error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [categoryId]);

  if (loading) return <div className="mt-20 text-center">Loading...</div>;

  return (
    <ProductGrid
      title="Earings's Collection"
      products={products}   // ✅ API DATA PASSED HERE
    />
  );
};

export default Earings;