// import React, { createContext, useContext, useState, useEffect } from "react";

// const CartContext = createContext();
// export const useCart = () => useContext(CartContext);

// export const CartProvider = ({ children }) => {
//   // GLOBAL USER STATE
//   const [user, setUser] = useState({
//     username: localStorage.getItem("username") || "",
//     role: localStorage.getItem("role") || "",
//     token: localStorage.getItem("token") || "",
//   });

//   const [cartItems, setCartItems] = useState([]);

//   const getStorageKey = (username) =>
//     username ? `cart_${username}` : "cart_guest";

//   // LOAD CART FOR CURRENT USER
//   const loadCart = () => {
//     const currentUser = localStorage.getItem("username");
//     const storageKey = getStorageKey(currentUser);
//     const saved = localStorage.getItem(storageKey);

//     setCartItems(saved ? JSON.parse(saved) : []);
//   };

//   // RUN ONLY ON FIRST LOAD
//   useEffect(() => {
//     loadCart();
//   }, []);

//   // UPDATE USER + CART WHEN LOGIN/LOGOUT HAPPENS
//   const updateUser = () => {
//     const newUser = {
//       username: localStorage.getItem("username") || "",
//       role: localStorage.getItem("role") || "",
//       token: localStorage.getItem("token") || "",
//     };

//     setUser(newUser);
//     loadCart();
//   };

//   // ADD TO CART
//   const addToCart = (product) => {
//     setCartItems((prev) => {
//       const exist = prev.find((item) => item.id === product.id);
//       if (exist) {
//         return prev.map((item) =>
//           item.id === product.id
//             ? { ...item, quantity: item.quantity + product.quantity }
//             : item
//         );
//       }
//       return [...prev, product];
//     });
//   };

//   // REMOVE FROM CART
//   const removeFromCart = (id) => {
//     setCartItems((prev) => prev.filter((item) => item.id !== id));
//   };

//   const clearCart = () => setCartItems([]);

//   // SAVE CART WHEN UPDATED
//   useEffect(() => {
//     const storageKey = getStorageKey(user.username);
//     localStorage.setItem(storageKey, JSON.stringify(cartItems));
//   }, [cartItems, user.username]);

//   return (
//     <CartContext.Provider
//       value={{
//         user,
//         cartItems,
//         addToCart,
//         removeFromCart,
//         clearCart,
//         updateUser,
//       }}
//     >
//       {children}
//     </CartContext.Provider>
//   );
// };
