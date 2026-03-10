import React, { useState,useEffect } from "react";
import { useLocation } from "react-router-dom";
import { createOrder } from "../api/auth";
import jwt_decode from "jwt-decode"; // ✅ CORRECT

const Checkout = () => {
  const [formData, setFormData] = useState({
    email: "",
    fullName: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    phone: "",
    country: "USA", // default country
  });


  const [customerId, setCustomerId] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const location = useLocation();
  const { cartItems = [], totalItems = 0, totalPrice = 0 } = location.state || {};

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

useEffect(() => {
  const token = sessionStorage.getItem("token"); // wherever your JWT is stored
  if (token) {
    try {
      const decoded = jwt_decode(token);
      console.log("Decoded JWT:", decoded);
      console.log(decoded.customerId)
      setCustomerId(decoded.customerId); // ✅ store it in state
    } catch (err) {
      console.error("Failed to decode JWT", err);
    }
  }
}, []);

  // const handleCheckout = async () => {
  //   if (!paymentMethod) {
  //     setError("Please select a payment method to continue.");
  //     return;
  //   }

  //   if (!customerId) {
  //     setError("You must be logged in to place an order.");
  //     return;
  //   }

  //   if (cartItems.length === 0) {
  //     setError("Cart is empty. Add some items before placing order.");
  //     return;
  //   }

  //   setLoading(true);
  //   setError("");

  //   try {
  //     const payload = {
  //       customerId, // extracted from JWT
  //       items: cartItems.map((item) => ({
  //         productId: item.productId,
  //         quantity: item.quantity,
  //         unitPrice: item.unitPrice || item.totalPrice / item.quantity,
  //       })),
  //       shippingAddress: {
  //         street: formData.address,
  //         city: formData.city,
  //         state: formData.state,
  //         zipCode: formData.zip,
  //         country: formData.country,
  //       },
  //       paymentMethod: paymentMethod === "cod" ? "CASH_ON_DELIVERY" : "CREDIT_CARD",
  //     };

  //     console.log("Order payload:", payload);

  //     const response = await createOrder(payload);
  //     console.log("Order created successfully:", response);
  //     alert("✅ Order placed successfully!");

  //     setFormData({
  //       email: "",
  //       fullName: "",
  //       address: "",
  //       city: "",
  //       state: "",
  //       zip: "",
  //       phone: "",
  //       country: "USA",
  //     });
  //     setPaymentMethod("");
  //   } catch (err) {
  //     console.error(err);
  //     setError(err.message || "Failed to place order");
  //   } finally {
  //     setLoading(false);
  //   }
  // };



  const handleCheckout = async () => {
  if (!paymentMethod) {
    setError("Please select a payment method.");
    return;
  }

  if (!customerId) {
    setError("You must be logged in to place an order.");
    return;
  }

  if (cartItems.length === 0) {
    setError("Cart is empty.");
    return;
  }

  setLoading(true);
  setError("");

  try {
    const payload = {
      customerId: customerId,           // from JWT
      shippingAddressId: 0,
      shippingAddress: {
        street: formData.address,
        city: formData.city,
        state: formData.state,
        zipCode: formData.zip,
        country: formData.country,
      },
      paymentMethod: "COD",
      customerNotes: "Please deliver between 10 AM - 5 PM",
      currency: "INR",
      discountAmount: 50.0,
      discountCode: "NEWUSER50",
      items: cartItems.map((item) => ({
        productId: item.productId,
        quantity: item.quantity,
        price: item.unitPrice || item.totalPrice / item.quantity,
      })),
    };

    console.log("✅ Final Order Payload:", payload);

    const response = await createOrder(payload);
    console.log("✅ Order created:", response);

    alert("🎉 Order placed successfully!");

    // Reset form
    setFormData({
      email: "",
      fullName: "",
      address: "",
      city: "",
      state: "",
      zip: "",
      phone: "",
      country: "IND",
    });
    setPaymentMethod("");

  } catch (err) {
    console.error(err);
    setError(err.message || "Failed to place order");
  } finally {
    setLoading(false);
  }
};
  return (
    <div className="min-h-screen bg-gray-50 pt-28 pb-12 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">

        {/* LEFT SECTION */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm p-8">
          <h1 className="text-2xl font-semibold text-gray-800 mb-8">Checkout</h1>

          {/* Contact Information */}
          <div className="mb-8">
            <h2 className="text-lg font-semibold text-gray-800 border-b-2 border-blue-500 inline-block pb-1 mb-4">
              Contact Information
            </h2>
            <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
            <input
              type="email"
              name="email"
              placeholder="your@email.com"
              value={formData.email}
              onChange={handleChange}
              className="w-full border rounded-md px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          {/* Shipping Address */}
          <div>
            <h2 className="text-lg font-semibold text-gray-800 border-b-2 border-blue-500 inline-block pb-1 mb-4">
              Shipping Address
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                <input
                  type="text"
                  name="fullName"
                  placeholder="John Doe"
                  value={formData.fullName}
                  onChange={handleChange}
                  className="w-full border rounded-md px-4 py-2"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
                <input
                  type="text"
                  name="address"
                  placeholder="123 Main St"
                  value={formData.address}
                  onChange={handleChange}
                  className="w-full border rounded-md px-4 py-2"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">City</label>
                <input
                  type="text"
                  name="city"
                  placeholder="New York"
                  value={formData.city}
                  onChange={handleChange}
                  className="w-full border rounded-md px-4 py-2"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">State</label>
                <select
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                  className="w-full border rounded-md px-4 py-2 bg-white"
                >
                  <option value="">Select State</option>
                  <option value="New York">New York</option>
                  <option value="California">California</option>
                  <option value="Texas">Texas</option>
                  <option value="Florida">Florida</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Zip / Postal Code</label>
                <input
                  type="text"
                  name="zip"
                  placeholder="342001"
                  value={formData.zip}
                  onChange={handleChange}
                  className="w-full border rounded-md px-4 py-2"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                <input
                  type="text"
                  name="phone"
                  placeholder="1234567890"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full border rounded-md px-4 py-2"
                />
              </div>
            </div>
          </div>

          {/* Payment Method */}
          <h2 className="text-lg font-semibold text-gray-800 border-b-2 border-blue-500 inline-block pb-1 mt-8">
            Payment Method
          </h2>
          <div className="mt-4 space-y-3">
            <label className="flex items-center justify-between border rounded-md p-4 cursor-pointer">
              <div className="flex items-center gap-3">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="cod"
                  checked={paymentMethod === "cod"}
                  onChange={(e) => {
                    setPaymentMethod(e.target.value);
                    setError("");
                  }}
                  className="w-5 h-5 text-blue-600"
                />
                <span className="text-gray-700 font-medium">Cash on Delivery (COD)</span>
              </div>
            </label>

            {error && <p className="text-sm text-red-600">{error}</p>}
          </div>

          <button
            onClick={handleCheckout}
            disabled={loading}
            className={`mt-6 w-full py-3 rounded-md text-white font-semibold ${
              paymentMethod ? "bg-blue-600 hover:bg-blue-700" : "bg-gray-400 cursor-not-allowed"
            }`}
          >
            {loading ? "Placing Order..." : "Place Order"}
          </button>
        </div>

        {/* RIGHT SECTION */}
        <div className="bg-white rounded-xl shadow-sm p-8 h-fit">
          <h2 className="text-xl font-semibold text-gray-800 mb-6">Order Summary</h2>
          {cartItems.length === 0 ? (
            <p className="text-gray-500 text-sm">No items in cart</p>
          ) : (
            cartItems.map((item) => (
              <div key={item.id} className="flex gap-4 mb-6">
                <div className="w-16 h-16 bg-gray-200 rounded-md flex items-center justify-center text-xs text-gray-500">
                  Image
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-gray-800">Product ID: {item.productId}</p>
                  <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                  <p className="text-sm font-medium text-gray-700">₹{item.totalPrice.toLocaleString()}</p>
                </div>
              </div>
            ))
          )}
          <hr className="my-4" />
          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>₹{totalPrice.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span>Shipping</span>
              <span className="text-green-600">Free</span>
            </div>
            <div className="flex justify-between">
              <span>Tax</span>
              <span>₹0</span>
            </div>
          </div>
          <hr className="my-4" />
          <div className="flex justify-between text-lg font-semibold">
            <span>Total</span>
            <span>₹{totalPrice.toLocaleString()}</span>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Checkout;
