import React, { useState } from "react";
import axiosInstance from "../../api/axiosInstance";
import { createCategory } from "../../api/auth";

const Addnavbaritem = () => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    active: true,
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await createCategory(formData); // ✅ API from auth file
      setMessage("💎 Navbar item added successfully!");
      setFormData({ name: "", description: "", active: true });
    } catch (error) {
      console.error(error);
      setMessage("❌ Failed to add navbar item.");
    }
  };

  return (
    <div className="px-4 flex justify-center items-center">
      <div className="w-full max-w-3xl p-8">
        <h1 className="text-3xl font-semibold text-center text-[#b88f5b] mb-6">
          Add New Navbar Item
        </h1>

        {message && (
          <p className="text-center font-medium mb-4 text-gray-700">
            {message}
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* ONE ROW INPUTS */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Item Name */}
            <div>
              <label className="block font-semibold text-gray-700 mb-1">
                Item Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Home, Shop"
                required
                className="w-full px-4 py-3 border border-[#d2b48c] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#b88f5b]"
              />
            </div>

            {/* Description */}
            <div>
              <label className="block font-semibold text-gray-700 mb-1">
                Description
              </label>
              <input
                type="text"
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Navbar description"
                required
                className="w-full px-4 py-3 border border-[#d2b48c] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#b88f5b]"
              />
            </div>
          </div>

          {/* Active Checkbox */}
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              name="active"
              checked={formData.active}
              onChange={handleChange}
              className="w-4 h-4 accent-[#b88f5b]"
            />
            <label className="font-semibold text-gray-700">Active</label>
          </div>

          {/* Button */}
          <button
            type="submit"
            className="w-full py-3 bg-[#b88f5b] text-white text-lg font-semibold rounded-lg hover:bg-[#a27648] transition"
          >
            Add Navbar Item
          </button>
        </form>
      </div>
    </div>
  );
};

export default Addnavbaritem;
