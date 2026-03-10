import React, { useEffect, useState } from "react";
import axiosInstance from "../../api/axiosInstance";
import { deleteCategory,getCategories } from "../../api/auth";

const DeleteCategory = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deletingId, setDeletingId] = useState(null);

useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await getCategories();
        setCategories(data || []);
      } catch {
        setError("Failed to fetch categories.");
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this category?"))
      return;

    setDeletingId(id);
    try {
      await deleteCategory(id);
      alert("Category deleted successfully!");

      setCategories((prev) => prev.filter((c) => c.id !== id));
    } catch {
      alert("Failed to delete category.");
    } finally {
      setDeletingId(null);
    }
  };


  if (loading) return <p>Loading categories...</p>;
  if (error) return <p className="text-red-600">{error}</p>;

  return (
    <div className="p-5">
      <h2 className="text-xl font-semibold">Delete Categories</h2>

      <table className="w-full border-collapse mt-5">
        <thead>
          <tr className="bg-gray-100">
            {["ID", "Name", "Description", "Active", "Actions"].map((h) => (
              <th
                key={h}
                className="border border-gray-300 p-2 font-bold"
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {categories.map((category) => (
            <tr key={category.id} className="text-center">
              <td className="border border-gray-300 p-2">
                {category.id}
              </td>
              <td className="border border-gray-300 p-2">
                {category.name}
              </td>
              <td className="border border-gray-300 p-2">
                {category.description}
              </td>
              <td className="border border-gray-300 p-2">
                {category.active ? "✅ Yes" : "❌ No"}
              </td>
              <td className="border border-gray-300 p-2">
                <button
                  onClick={() => handleDelete(category.id)}
                  disabled={deletingId === category.id}
                  className={`px-3 py-1 text-white rounded ${
                    deletingId === category.id
                      ? "bg-red-300 cursor-not-allowed"
                      : "bg-red-500 hover:bg-red-600"
                  }`}
                >
                  {deletingId === category.id ? "Deleting..." : "Delete"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DeleteCategory;
