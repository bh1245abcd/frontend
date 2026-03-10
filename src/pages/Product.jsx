// import React, { useState } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import axiosInstance from "../api/axiosInstance";
// import Swal from "sweetalert2";
// import jwtDecode from "jwt-decode";
// import earptwo from "../assets/earptwo.webp"



// const Product = () => {
//   const { state } = useLocation();
//   const navigate = useNavigate();
//   const product = state?.product;

//   const [quantity, setQuantity] = useState(1);

//   if (!product) {
//     return <p className="text-center mt-20">Product not found.</p>;
//   }

//   // 🔐 Decode userId from JWT (SAME FILE)
//   const getUserIdFromToken = () => {
//     const token = localStorage.getItem("token");
//     if (!token) return null;

//     const decoded = jwtDecode(token);
//     return decoded.userId; // backend must include this
//   };

//   const increaseQty = () => setQuantity(q => q + 1);
//   const decreaseQty = () => setQuantity(q => (q > 1 ? q - 1 : 1));

//   // 🛒 Add to Cart API
//   const handleAddToCart = async () => {
//     const userId = getUserIdFromToken();

//     if (!userId) {
//       Swal.fire("Login Required", "Please login first", "warning");
//       return;
//     }

//     const payload = {
//       productId: product.id,
//       quantity: quantity,
//       variantId: "default",
//       promoCode: "",
//       itemId: product.id,
//       userId: userId,
//     };

//     console.log("ADD TO CART PAYLOAD 👉", payload);

//     try {
//       await axiosInstance.post("/vasaae/user/cart/add", payload);

//       Swal.fire({
//         title: "Added to Cart!",
//         text: `${product.name} added successfully.`,
//         icon: "success",
//         timer: 1500,
//         showConfirmButton: false,
//       });

//     } catch (error) {
//       console.error("Add to cart error", error);
//       Swal.fire("Error", "Failed to add product to cart", "error");
//     }
//   };

//   return (
//     <div className="bg-white px-6 md:px-16 py-10 mt-30 md:mt-20">
//       <div className="max-w-4xl mx-auto flex flex-col md:flex-row gap-10 items-center">

//         <img
//           src={earptwo}
//           alt={product.name}
//           className="w-full md:w-1/2 rounded-2xl shadow-lg"
//         />

//         <div className="flex-1">
//           <h1 className="text-3xl font-semibold mb-3">{product.name}</h1>
//           <p className="text-amber-700 text-xl font-bold mb-4">
//             {product.price}
//           </p>

//           {/* Quantity */}
//           <div className="flex items-center gap-4 mb-6">
//             <button onClick={decreaseQty} className="px-4 py-2 bg-gray-200">-</button>
//             <span className="font-semibold">{quantity}</span>
//             <button onClick={increaseQty} className="px-4 py-2 bg-gray-200">+</button>
//           </div>

//           {/* Buttons */}
//           <button
//             onClick={handleAddToCart}
//             className="bg-amber-700 text-white px-6 py-3 rounded-lg w-[360px] mb-4"
//           >
//             Add to Cart
//           </button>

//           <button
//             onClick={() => navigate("/checkout")}
//             className="bg-amber-700 text-white px-6 py-3 rounded-lg w-[360px]"
//           >
//             Checkout
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Product;
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import earptwo from "../assets/earptwo.webp";
import { addToCart } from "../api/auth";

const Product = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const product = state?.product;

  const [quantity, setQuantity] = useState(1);

  if (!product) {
    return <p className="text-center mt-20">Product not found.</p>;
  }

  const increaseQty = () => setQuantity((q) => q + 1);
  const decreaseQty = () => setQuantity((q) => (q > 1 ? q - 1 : 1));

  const handleAddToCart = async () => {
    try {
      await addToCart({
        productId: product.id,
        quantity,
      });

      Swal.fire({
        title: "Added to Cart!",
        text: `${product.productName} added successfully.`,
        icon: "success",
        timer: 1500,
        showConfirmButton: false,
      });
    } catch (error) {
      Swal.fire(
        "Login Required",
        "Please login first to add items to cart",
        "warning"
      );
    }
  };

  return (
    <div className="bg-white px-6 md:px-16 py-10 mt-30 md:mt-20">
      <div className="max-w-4xl mx-auto flex flex-col md:flex-row gap-10 items-center">
        <img
          src={earptwo}
          alt={product.productName}
          className="w-full md:w-1/2 rounded-2xl shadow-lg"
        />

        <div className="flex-1">
          <h1 className="text-3xl font-semibold mb-3">
            {product.productName}
          </h1>

          <p className="text-amber-700 text-xl font-bold mb-4">
            ₹{product.price}
          </p>

          <div className="flex items-center gap-4 mb-6">
            <button onClick={decreaseQty} className="px-4 py-2 bg-gray-200">
              -
            </button>

            <span className="font-semibold">{quantity}</span>

            <button onClick={increaseQty} className="px-4 py-2 bg-gray-200">
              +
            </button>
          </div>

          <button
            onClick={handleAddToCart}
            className="bg-amber-700 text-white px-6 py-3 rounded-lg w-[360px] mb-4"
          >
            Add to Cart
          </button>

          <button
            onClick={() => navigate("/checkout")}
            className="bg-amber-700 text-white px-6 py-3 rounded-lg w-[360px]"
          >
            Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Product;
