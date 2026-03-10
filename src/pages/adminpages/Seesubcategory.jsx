import React, { useEffect, useState } from "react";
import {
  getCategories,
  getSubcategoriesByCategory,
  updateSubcategory,
  deleteSubcategory,
} from "../../api/auth";

const CategorySubcategory = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [subcategories, setSubcategories] = useState([]);
  const [loading, setLoading] = useState(false);

  const [editId, setEditId] = useState(null);
  const [editData, setEditData] = useState({
    name: "",
    description: "",
  });

  // 🔥 Load categories
  useEffect(() => {
    const fetchCategories = async () => {
      const data = await getCategories();
      setCategories(data);
      if (data.length > 0) setSelectedCategory(data[0].id);
    };
    fetchCategories();
  }, []);

  // 🔥 Load subcategories
  useEffect(() => {
    if (!selectedCategory) return;

    const fetchSubcategories = async () => {
      setLoading(true);
      try {
        const data = await getSubcategoriesByCategory(selectedCategory);
        setSubcategories(data);
      } finally {
        setLoading(false);
      }
    };

    fetchSubcategories();
  }, [selectedCategory]);

  // EDIT CLICK
  const handleEdit = (sub) => {
    setEditId(sub.id);
    setEditData({
      name: sub.name,
      description: sub.description,
    });
  };

  // UPDATE
  const handleUpdate = async (id) => {
    await updateSubcategory(id, editData);

    setSubcategories((prev) =>
      prev.map((s) => (s.id === id ? { ...s, ...editData } : s))
    );

    setEditId(null);
  };

  // DELETE
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this subcategory?")) return;

    await deleteSubcategory(id);
    setSubcategories((prev) => prev.filter((s) => s.id !== id));
  };

  return (
    <div className="p-6">

      {/* Category Dropdown */}
      <div className="mb-6 max-w-md">
        <label className="block mb-2 font-semibold">Select Category</label>
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-300"
        >
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </select>
      </div>

      {/* Subcategory Table */}
      <table className="w-full border border-black border-collapse">
        <thead className="bg-[#fff8f0]">
          <tr>
            <th className="border border-black px-4 py-4 text-center font-semibold">
              ID
            </th>
            <th className="border border-black px-4 py-4 text-center font-semibold">
              Name
            </th>
            <th className="border border-black px-4 py-4 text-center font-semibold">
              Description
            </th>
            <th className="border border-black px-4 py-4 text-center font-semibold">
              Actions
            </th>
          </tr>
        </thead>

        <tbody>
          {loading ? (
            <tr>
              <td colSpan="4" className="border border-black text-center py-6">
                Loading...
              </td>
            </tr>
          ) : subcategories.length === 0 ? (
            <tr>
              <td colSpan="4" className="border border-black text-center py-6">
                No subcategories found
              </td>
            </tr>
          ) : (
            subcategories.map((sub) => (
              <tr
                key={sub.id}
                className="text-center align-middle hover:bg-gray-50"
              >
                <td className="border border-black px-4 py-5">
                  {sub.id}
                </td>

                <td className="border border-black px-4 py-5">
                  {editId === sub.id ? (
                    <input
                      value={editData.name}
                      onChange={(e) =>
                        setEditData({ ...editData, name: e.target.value })
                      }
                      className="border px-3 py-2 rounded w-full text-center"
                    />
                  ) : (
                    sub.name
                  )}
                </td>

                <td className="border border-black px-4 py-5">
                  {editId === sub.id ? (
                    <input
                      value={editData.description}
                      onChange={(e) =>
                        setEditData({
                          ...editData,
                          description: e.target.value,
                        })
                      }
                      className="border px-3 py-2 rounded w-full text-center"
                    />
                  ) : (
                    sub.description
                  )}
                </td>

                <td className="border border-black px-4 py-5">
                  {editId === sub.id ? (
                    <div className="flex justify-center gap-3">
                      <button
                        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
                        onClick={() => handleUpdate(sub.id)}
                      >
                        Save
                      </button>
                      <button
                        className="bg-gray-400 hover:bg-gray-500 text-white px-4 py-2 rounded"
                        onClick={() => setEditId(null)}
                      >
                        Cancel
                      </button>
                    </div>
                  ) : (
                    <div className="flex justify-center gap-3">
                      <button
                        className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
                        onClick={() => handleEdit(sub)}
                      >
                        Edit
                      </button>
                      <button
                        className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
                        onClick={() => handleDelete(sub.id)}
                      >
                        Delete
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default CategorySubcategory;
