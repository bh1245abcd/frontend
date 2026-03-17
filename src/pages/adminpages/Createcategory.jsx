import React, { useState } from "react";
import { createCategory } from "../../api/auth";

const CreateCategory = () => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    active: true,
    flag: "",
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
      console.log("Payload:", formData); // ✅ debug

      await createCategory(formData);

      setMessage("💎 Category added successfully!");
      setFormData({
        name: "",
        description: "",
        active: true,
        flag: "",
      });

    } catch (error) {
      setMessage("❌ Error adding category");
    }
  };

  return (
    <div className="flex justify-center items-center px-4">
      <div className="w-full max-w-4xl p-8 rounded-xl">

        <h1 className="text-3xl font-semibold text-center text-[#b88f5b] mb-6">
          Add New Category
        </h1>

        {message && (
          <p className="text-center mb-4 font-medium text-gray-700">
            {message}
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            {/* Name */}
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
                className="w-full px-4 py-3 border rounded-lg"
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
                className="w-full px-4 py-3 border rounded-lg"
              />
            </div>

            {/* Flag */}
            <div>
              <label className="block mb-1 font-semibold text-gray-700">
                Flag
              </label>
              <input
                type="text"
                name="flag"
                value={formData.flag}
                onChange={handleChange}
                placeholder="e.g. FEATURED / NEW"
                className="w-full px-4 py-3 border rounded-lg"
              />
            </div>

            {/* Active */}
            <div className="flex items-center gap-3 mt-6">
              <input
                type="checkbox"
                name="active"
                checked={formData.active}
                onChange={handleChange}
                className="w-5 h-5"
              />
              <label className="font-semibold text-gray-700">
                Active
              </label>
            </div>

          </div>

          <button
            type="submit"
            className="w-full py-3 bg-[#b88f5b] text-white text-lg font-semibold rounded-lg"
          >
            Add Category
          </button>

        </form>
      </div>
    </div>
  );
};

export default CreateCategory;