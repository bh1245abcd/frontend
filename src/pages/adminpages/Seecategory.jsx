import React, { useEffect, useState } from "react";
import { getCategories, updateCategory, deleteCategory } from "../../api/auth";

const Seecategory = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [editId, setEditId] = useState(null);
  const [editData, setEditData] = useState({
    name: "",
    description: "",
  });

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const data = await getCategories();
      setCategories(data || []);
    } catch (err) {
      setError("Failed to fetch categories");
    } finally {
      setLoading(false);
    }
  };

  // EDIT CLICK
  const handleEditClick = (category) => {
    setEditId(category.id);
    setEditData({
      name: category.name,
      description: category.description,
    });
  };

  // UPDATE CATEGORY
  const handleUpdate = async (id) => {
    try {
      await updateCategory(id, editData);

      setCategories((prev) =>
        prev.map((cat) =>
          cat.id === id ? { ...cat, ...editData } : cat
        )
      );

      setEditId(null);
    } catch (err) {
      alert("Update failed");
    }
  };

  // DELETE CATEGORY
  const handleDelete = async (id) => {
    console.log(id)
    if (!window.confirm("Are you sure you want to delete this category?"))
      return;

    try {
      await deleteCategory(id);
      setCategories((prev) => prev.filter((cat) => cat.id !== id));
    } catch (err) {
      alert("Delete failed");
    }
  };

  if (loading) return <p>Loading categories...</p>;
  if (error) return <p className="text-red-600">{error}</p>;

  return (
    <div className="p-5">
      <h2 className="text-xl font-semibold">Categories</h2>

      <table className="w-full border border-gray-300 mt-5">
        <thead className="bg-[#fff8f0]">
          <tr>
            <th className="border p-3">ID</th>
            <th className="border p-3">Name</th>
            <th className="border p-3">Description</th>
            <th className="border p-3">Actions</th>
          </tr>
        </thead>

        <tbody>
          {categories.length > 0 ? (
            categories.map((category) => (
              <tr key={category.id} className="text-center">
                <td className="border p-3">{category.id}</td>

                <td className="border p-3">
                  {editId === category.id ? (
                    <input
                      type="text"
                      value={editData.name}
                      onChange={(e) =>
                        setEditData({ ...editData, name: e.target.value })
                      }
                      className="border px-2 py-1"
                    />
                  ) : (
                    category.name
                  )}
                </td>

                <td className="border p-3">
                  {editId === category.id ? (
                    <input
                      type="text"
                      value={editData.description}
                      onChange={(e) =>
                        setEditData({
                          ...editData,
                          description: e.target.value,
                        })
                      }
                      className="border px-2 py-1"
                    />
                  ) : (
                    category.description
                  )}
                </td>

                <td className="border p-3">
                  {editId === category.id ? (
                    <div className="flex justify-center gap-2">
                      <button
                        className="bg-blue-500 text-white px-3 py-1 rounded"
                        onClick={() => handleUpdate(category.id)}
                      >
                        Save
                      </button>
                      <button
                        className="bg-gray-400 text-white px-3 py-1 rounded"
                        onClick={() => setEditId(null)}
                      >
                        Cancel
                      </button>
                    </div>
                  ) : (
                    <div className="flex justify-center gap-2">
                      <button
                        className="bg-green-500 text-white px-3 py-1 rounded"
                        onClick={() => handleEditClick(category)}
                      >
                        Edit
                      </button>
                      <button
                        className="bg-red-500 text-white px-3 py-1 rounded"
                        onClick={() => handleDelete(category.id)}
                      >
                        Delete
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="text-center p-4 text-gray-500">
                No categories available
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Seecategory;
