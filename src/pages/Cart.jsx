import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import {
  getCartItems,
  deleteCartItem,
  getUserIdFromToken,
} from "../api/auth";


const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);

  // 🛒 FETCH CART
  const fetchCartItems = async () => {
    const userId = getUserIdFromToken();

    // ✅ User not logged in
    if (!userId) {
      setCartItems([]);
      setLoading(false);
      return;
    }

    try {
      const items = await getCartItems();

      const mappedItems = (Array.isArray(items) ? items : []).map((item) => ({
        id: item.id,
        productId: item.productId,
        quantity: item.quantity,
        unitPrice: item.unitPrice || 0,
        totalPrice:
          item.totalPrice ||
          (item.unitPrice || 0) * item.quantity,
      }));


      setCartItems(mappedItems);
    } catch (error) {
      console.error("Failed to fetch cart items", error);
      setCartItems([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCartItems();
  }, []);

  // ❌ DELETE ITEM
  const handleDelete = (itemId) => {
    Swal.fire({
      title: "Remove item?",
      text: "This item will be removed from your cart",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#b45309",
      cancelButtonColor: "#9ca3af",
      confirmButtonText: "Yes, remove",
    }).then(async (result) => {
      if (!result.isConfirmed) return;

      try {
        await deleteCartItem(itemId);

        setCartItems((prev) =>
          prev.filter((item) => item.id !== itemId)
        );

        Swal.fire("Removed!", "Item removed from cart", "success");
      } catch (error) {
        console.error("Delete failed", error);
        Swal.fire("Error", "Failed to remove item", "error");
      }
    });
  };

  // ⏳ LOADING
  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        Loading cart...
      </div>
    );
  }

  // 🛒 EMPTY CART
  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center text-xl">
        🛒 Your cart is empty.
      </div>
    );
  }

  // 💰 TOTALS
  const totalItems = cartItems.reduce(
    (sum, item) => sum + item.quantity,
    0
  );
  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.totalPrice,
    0
  );

  return (
    <div className="min-h-screen bg-white px-6 md:px-16 py-15 mt-30 md:mt-18">
      <h2 className="text-3xl font-semibold mb-8 text-gray-800">
        Your Cart
      </h2>

      <div className="flex flex-col lg:flex-row gap-10">
        {/* 🧾 CART TABLE */}
        <div className="flex-1 overflow-x-auto shadow-lg rounded-xl border border-gray-200">
          <table className="min-w-full bg-white">
            <thead className="bg-amber-700 text-white">
              <tr>
                <th className="py-3 px-4 text-left">Product ID</th>
                <th className="py-3 px-4 text-left">Unit Price</th>
                <th className="py-3 px-4 text-left">Quantity</th>
                <th className="py-3 px-4 text-left">Total</th>
                <th className="py-3 px-4 text-center">Action</th>
              </tr>
            </thead>

            <tbody>
              {cartItems.map((item) => (
                <tr
                  key={item.id}
                  className="border-b border-gray-200 hover:bg-gray-50"
                >
                  <td className="py-4 px-4">{item.productId}</td>
                  <td className="py-4 px-4">
                    ₹{(item.unitPrice || 0).toLocaleString()}
                  </td>
                  <td className="py-4 px-4">{item.quantity}</td>
                  <td className="py-4 px-4 font-semibold text-amber-700">
                    ₹{(item.totalPrice || 0).toLocaleString()}
                  </td>
                  <td className="py-4 px-4 text-center">
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="px-4 py-1 text-sm font-semibold text-red-600 border border-red-500 rounded-lg hover:bg-red-600 hover:text-white transition"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* 📊 SUMMARY */}
        <div className="w-full lg:w-1/3 border border-gray-200 rounded-xl p-5 bg-gray-50 shadow-md">
          <h3 className="text-xl font-semibold mb-4">
            Cart Summary
          </h3>

          <div className="flex justify-between mb-2">
            <span>Total Items</span>
            <span>{totalItems}</span>
          </div>

          <div className="flex justify-between mb-2">
            <span>Subtotal</span>
            <span>₹{totalPrice.toLocaleString()}</span>
          </div>

          <div className="flex justify-between font-semibold text-amber-700 text-lg border-t pt-3">
            <span>Total Payable</span>
            <span>₹{totalPrice.toLocaleString()}</span>
          </div>

          <Link to="/checkout" 
            state={{
            cartItems,
            totalItems,
            totalPrice,
          }}>
            <button className="mt-5 w-full bg-amber-700 text-white py-2 rounded-lg hover:bg-amber-800 transition">
              Proceed to Checkout
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Cart;

