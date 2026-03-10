import React, { useState } from "react";
import axiosInstance from "../../api/axiosInstance";
import { createCategory } from "../../api/auth";

const CreateCategory = () => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await createCategory(formData); // ✅ ACTION CALL
      setMessage("💎 Category added successfully!");
      setFormData({ name: "", description: "" });
    } catch (error) {
      setMessage("❌ Error adding category");
    }
  };

  return (
    <div className=" flex justify-center items-center px-4">
      <div className="w-full max-w-4xl p-8 rounded-xl ">
        
        <h1 className="text-3xl font-semibold text-center text-[#b88f5b] mb-6">
          Add New Category
        </h1>

        {message && (
          <p className="text-center mb-4 font-medium text-gray-700">
            {message}
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          
          {/* Row Inputs */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Category Name */}
            <div>
              <label className="block mb-1 font-semibold text-gray-700">
                Category Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Rings"
                required
                className="w-full px-4 py-3 border border-[#d2b48c] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#b88f5b]"
              />
            </div>

            {/* Description */}
            <div>
              <label className="block mb-1 font-semibold text-gray-700">
                Description
              </label>
              <input
                type="text"
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Category description"
                required
                className="w-full px-4 py-3 border border-[#d2b48c] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#b88f5b]"
              />
            </div>
          </div>

          {/* Button */}
          <button
            type="submit"
            className="w-full py-3 bg-[#b88f5b] text-white text-lg font-semibold rounded-lg hover:bg-[#a27648] transition"
          >
            Add Category
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateCategory;
