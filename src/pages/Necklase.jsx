// import { useEffect, useState } from "react";
// import axiosInstance from "../api/axiosInstance";
// import firstp from "../assets/necklasepone.webp";
// import secondp from "../assets/necklaseptwo.webp";
// import thirdp from "../assets/necklasepthree.webp";
// import fourthp from "../assets/necklasepfour.webp";
// import fifthp from "../assets/necklasepfive.jpg";
// import sixthp from "../assets/necklasepsix.webp";
// import { Filter, SortAsc } from "lucide-react";
// import { Link } from "react-router-dom";

// const Necklase = () => {
//   const [products, setProducts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   // ✅ Images SAME
//   const images = [
//     firstp,
//     secondp,
//     thirdp,
//     fourthp,
//     fifthp,
//     sixthp,
//   ];

//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         const res = await axiosInstance.get(
//           "/vasaae/categories/2/products"
//         );

//         console.log("API RESPONSE:", res.data);

//         // Correct mapping (same logic you already learned)
//         const mappedProducts = res.data.data.map((item, index) => ({
//           id: item.id,
//           name: item.productName,
//           price: `₹${item.price}`,
//           description: item.description,
//           image: images[index % images.length],
//         }));

//         setProducts(mappedProducts);
//       } catch (err) {
//         console.error("Error fetching products:", err);
//         setError("Failed to load products");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchProducts();
//   }, []);

//   // 🔄 Loading
//   if (loading) {
//     return (
//       <div className="min-h-screen flex justify-center items-center text-gray-600">
//         Loading products...
//       </div>
//     );
//   }

//   // ❌ Error
//   if (error) {
//     return (
//       <div className="min-h-screen flex justify-center items-center text-red-600">
//         {error}
//       </div>
//     );
//   }

//   return (
//     <div className="bg-white min-h-screen py-10 px-6 md:px-16 mt-30 md:mt-20">
//       {/* ---------- Filter + Sort Bar ---------- */}
//       <div className="flex flex-wrap justify-between items-center border-b pb-4 mb-10">
//         <div className="flex items-center gap-3 text-gray-700 font-medium">
//           <Filter className="w-5 h-5 text-amber-700" />
//           <span>Filters</span>
//         </div>

//         <div className="text-gray-600 text-sm md:text-base">
//           Showing <span className="font-semibold">{products.length}</span>{" "}
//           Products
//         </div>

//         <div className="flex items-center gap-2 text-gray-700 font-medium">
//           <SortAsc className="w-5 h-5 text-amber-700" />
//           <select className="border border-gray-300 rounded-lg px-2 py-1 text-sm bg-white">
//             <option>Sort by: Featured</option>
//             <option>Price: Low to High</option>
//             <option>Price: High to Low</option>
//             <option>Newest</option>
//           </select>
//         </div>
//       </div>

//       {/* ---------- Product Grid ---------- */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
//         {products.map((item) => (
//           <div
//             key={item.id}
//             className="group shadow-md hover:shadow-xl transition-shadow duration-300 rounded-2xl overflow-hidden bg-gray-50"
//           >
//             <div className="relative">
//               <Link to={`/product/${item.id}`} state={{ product: item }}>
//                 <img
//                   src={item.image}
//                   alt={item.name}
//                   className="w-full h-80 object-cover transition-transform duration-500 group-hover:scale-105"
//                 />
//               </Link>
//             </div>

//             <div className="p-4 text-center">
//               <h3 className="font-semibold text-gray-800 text-lg">
//                 {item.name}
//               </h3>
//               <p className="text-amber-700 font-medium mt-1">
//                 {item.price}
//               </p>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Necklase;


// import { useEffect, useState } from "react";
// import { useParams } from "react-router-dom"; // ✅ for dynamic category
// import { Link } from "react-router-dom";
// import { Filter, SortAsc } from "lucide-react";
// import {
//   getProductsByCategory, // ✅ your helper function
// } from "../api/auth";

// import firstp from "../assets/necklasepone.webp";
// import secondp from "../assets/necklaseptwo.webp";
// import thirdp from "../assets/necklasepthree.webp";
// import fourthp from "../assets/necklasepfour.webp";
// import fifthp from "../assets/necklasepfive.jpg";
// import sixthp from "../assets/necklasepsix.webp";

// const Necklase = () => {
//   const { categoryId } = useParams() // default to 2 if no param
//   const [products, setProducts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   const images = [
//     firstp,
//     secondp,
//     thirdp,
//     fourthp,
//     fifthp,
//     sixthp,
//   ];

//   useEffect(() => {
//     const fetchProducts = async () => {
//       setLoading(true);
//       setError(null);

//       try {
//         const data = await getProductsByCategory(categoryId);

//         // map API response to match UI
//         const mappedProducts = (data || []).map((item, index) => ({
//           id: item.id,
//           name: item.productName,
//           price: `₹${item.price}`,
//           description: item.description,
//           image: images[index % images.length], // loop images
//         }));

//         setProducts(mappedProducts);
//       } catch (err) {
//         console.error("Error fetching products:", err);
//         setError("Failed to load products");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchProducts();
//   }, [categoryId]); // refetch if category changes

//   if (loading) {
//     return (
//       <div className="min-h-screen flex justify-center items-center text-gray-600">
//         Loading products...
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="min-h-screen flex justify-center items-center text-red-600">
//         {error}
//       </div>
//     );
//   }

//   return (
//     <div className="bg-white min-h-screen py-10 px-6 md:px-16 mt-30 md:mt-20">
//       {/* ---------- Filter + Sort Bar ---------- */}
//       <div className="flex flex-wrap justify-between items-center border-b pb-4 mb-10">
//         <div className="flex items-center gap-3 text-gray-700 font-medium">
//           <Filter className="w-5 h-5 text-amber-700" />
//           <span>Filters</span>
//         </div>

//         <div className="text-gray-600 text-sm md:text-base">
//           Showing <span className="font-semibold">{products.length}</span>{" "}
//           Products
//         </div>

//         <div className="flex items-center gap-2 text-gray-700 font-medium">
//           <SortAsc className="w-5 h-5 text-amber-700" />
//           <select className="border border-gray-300 rounded-lg px-2 py-1 text-sm bg-white">
//             <option>Sort by: Featured</option>
//             <option>Price: Low to High</option>
//             <option>Price: High to Low</option>
//             <option>Newest</option>
//           </select>
//         </div>
//       </div>

//       {/* ---------- Product Grid ---------- */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
//         {products.map((item) => (
//           <div
//             key={item.id}
//             className="group shadow-md hover:shadow-xl transition-shadow duration-300 rounded-2xl overflow-hidden bg-gray-50"
//           >
//             <div className="relative">
//               <Link to={`/product/${item.id}`} state={{ product: item }}>
//                 <img
//                   src={item.image}
//                   alt={item.name}
//                   className="w-full h-80 object-cover transition-transform duration-500 group-hover:scale-105"
//                 />
//               </Link>
//             </div>

//             <div className="p-4 text-center">
//               <h3 className="font-semibold text-gray-800 text-lg">
//                 {item.name}
//               </h3>
//               <p className="text-amber-700 font-medium mt-1">
//                 {item.price}
//               </p>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Necklase;

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProductsByCategory } from "../api/auth";
import ProductGrid from "../reusable/productgrid";

import firstp from "../assets/necklasepone.webp";
import secondp from "../assets/necklaseptwo.webp";
import thirdp from "../assets/necklasepthree.webp";
import fourthp from "../assets/necklasepfour.webp";
import fifthp from "../assets/necklasepfive.jpg";
import sixthp from "../assets/necklasepsix.webp";


const Men = () => {
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
      title="necklase's Collection"
      products={products}   // ✅ API DATA PASSED HERE
    />
  );
};

export default Men;
