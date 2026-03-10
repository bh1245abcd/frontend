import React, { useEffect, useState } from "react";
import { addProduct, getCategories, getSubcategoriesByCategory } from "../../api/auth";

const AddProduct = () => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    stockQuantity: "",
    categoryId: "",
    subCategoryId: "" // ✅ Correct casing
  });

  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [message, setMessage] = useState("");

  // Fetch categories once
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await getCategories();
        setCategories(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchCategories();
  }, []);

  // Handle input changes
  const handleChange = async (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));

    // Fetch subcategories if category changes
    if (name === "categoryId") {
      setFormData((prev) => ({ ...prev, subCategoryId: "" })); // Reset subcategory
      if (value) {
        try {
          const data = await getSubcategoriesByCategory(value);
          setSubcategories(data);
        } catch (error) {
          console.error(error);
        }
      } else {
        setSubcategories([]);
      }
    }
  };

  // Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      name: formData.name,
      description: formData.description,
      price: Number(formData.price),
      stockQuantity: Number(formData.stockQuantity),
      categoryId: Number(formData.categoryId),
      subCategoryId: Number(formData.subCategoryId) // ✅ Matches backend
    };

    console.log(payload);

    try {
      await addProduct(payload);
      setMessage("💎 Product added successfully!");
      // Reset form
      setFormData({
        name: "",
        description: "",
        price: "",
        stockQuantity: "",
        categoryId: "",
        subCategoryId: ""
      });
      setSubcategories([]); // Clear subcategories
    } catch (error) {
      setMessage("❌ Error adding product");
    }
  };

  return (
    <div className="px-4 flex justify-center items-center">
      <div className="w-full max-w-2xl p-8">
        <h1 className="text-3xl font-semibold text-center text-[#b88f5b] mb-6">
          Add New Jewelry Product
        </h1>

        {message && (
          <p className="text-center font-medium mb-4 text-gray-700">{message}</p>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Row 1 */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold text-gray-700 mb-1">Product Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Diamond Necklace"
                required
                className="w-full px-4 py-3 border border-[#d2b48c] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#b88f5b]"
              />
            </div>
            <div>
              <label className="block font-semibold text-gray-700 mb-1">Price ($)</label>
              <input
                type="text"
                name="price"
                value={formData.price}
                onChange={handleChange}
                placeholder="499.99"
                required
                className="w-full px-4 py-3 border border-[#d2b48c] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#b88f5b]"
              />
            </div>
          </div>

          {/* Row 2 */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold text-gray-700 mb-1">Stock Quantity</label>
              <input
                type="number"
                name="stockQuantity"
                value={formData.stockQuantity}
                onChange={handleChange}
                placeholder="50"
                required
                className="w-full px-4 py-3 border border-[#d2b48c] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#b88f5b]"
              />
            </div>

            <div>
              <label className="block font-semibold text-gray-700 mb-1">Category</label>
              <select
                name="categoryId"
                value={formData.categoryId}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-[#d2b48c] rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-[#b88f5b]"
              >
                <option value="">-- Select Category --</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>{cat.name}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Subcategory */}
          <div>
            <label className="block font-semibold text-gray-700 mb-1">Subcategory</label>
            <select
              name="subCategoryId"
              value={formData.subCategoryId}
              onChange={handleChange}
              disabled={!subcategories.length}
              required
              className="w-full px-4 py-3 border border-[#d2b48c] rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-[#b88f5b]"
            >
              <option value="">-- Select Subcategory --</option>
              {subcategories.map((sub) => (
                <option key={sub.id} value={sub.id}>{sub.name}</option>
              ))}
            </select>
          </div>

          {/* Description */}
          <div>
            <label className="block font-semibold text-gray-700 mb-1">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Enter a beautiful description..."
              required
              className="w-full px-4 py-3 border border-[#d2b48c] rounded-lg h-24 resize-none focus:outline-none focus:ring-2 focus:ring-[#b88f5b]"
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full mt-6 py-3 bg-[#b88f5b] text-white text-lg font-semibold rounded-lg hover:bg-[#a27648] transition"
          >
            Add Product
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;
