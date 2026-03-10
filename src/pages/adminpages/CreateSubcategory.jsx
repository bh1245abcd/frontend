import React, { useEffect, useState } from "react";
import { getCategories, createSubcategories } from "../../api/auth";
import { toast } from "react-toastify";


const CreateSubcategory = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    description: "",
  });


  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await getCategories();
        setCategories(data);
      } catch (error) {
        console.error("Failed to fetch categories");
      }
    };

    fetchCategories();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedCategory) {
      toast.warning("❌ Please select a category");
      return;
    }

    try {
      await createSubcategories(selectedCategory, formData);
      toast.success("Subcategory added successfully!");
      setFormData({ name: "", description: "" });
      setSelectedCategory("");
    } catch (error) {
      toast.success("Error adding subcategory");
    }
  };

  return (
    <div className="flex justify-center items-center px-4">
      <div className="w-full max-w-4xl p-8 rounded-xl">
        <h1 className="text-3xl font-semibold text-center text-[#b88f5b] mb-6">
          Add New Subcategory
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">

          {/* Category Dropdown */}
          <div>
            <label className="block mb-1 font-semibold text-gray-700">
              Select Category
            </label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              required
              className="w-full px-4 py-3 border border-[#d2b48c] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#b88f5b]"
            >
              <option value="">-- Select Category --</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>

          {/* Subcategory Name */}
          <div>
            <label className="block mb-1 font-semibold text-gray-700">
              Subcategory Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Diamond Bracelet"
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
              placeholder="This bracelet for men's"
              required
              className="w-full px-4 py-3 border border-[#d2b48c] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#b88f5b]"
            />
          </div>

          {/* Button */}
          <button
            type="submit"
            className="w-full py-3 bg-[#b88f5b] text-white text-lg font-semibold rounded-lg hover:bg-[#a27648] transition"
          >
            Add Subcategory
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateSubcategory;
