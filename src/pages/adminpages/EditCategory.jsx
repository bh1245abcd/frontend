import React, { useEffect, useState } from "react";
import axiosInstance from "../../api/axiosInstance";
import { updateCategory,getCategories } from "../../api/auth";

const EditCategory = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [editingId, setEditingId] = useState(null);
  const [updatingId, setUpdatingId] = useState(null);
  const [originalCategory, setOriginalCategory] = useState(null);

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


  const handleChange = (id, field, value) => {
    setCategories((prev) =>
      prev.map((cat) =>
        cat.id === id ? { ...cat, [field]: value } : cat
      )
    );
  };

  const handleEdit = (category) => {
    setEditingId(category.id);
    setOriginalCategory({ ...category });
  };

  const handleCancel = () => {
    setCategories((prev) =>
      prev.map((cat) =>
        cat.id === originalCategory.id ? originalCategory : cat
      )
    );
    setEditingId(null);
    setOriginalCategory(null);
  };

   const handleSave = async (id) => {
    const category = categories.find((c) => c.id === id);
    setUpdatingId(id);

    try {
      await updateCategory(id, {
        name: category.name,
        description: category.description,
        active: category.active,
      });

      alert("Category updated successfully!");
      setEditingId(null);
      setOriginalCategory(null);
    } catch {
      alert("Failed to update category.");
    } finally {
      setUpdatingId(null);
    }
  };

  if (loading) return <p>Loading categories...</p>;
  if (error) return <p className="text-red-600">{error}</p>;

  return (
    <div className="p-5">
      <h2 className="text-xl font-semibold mb-4">Edit Categories</h2>

      <table className="w-full border border-gray-300 border-collapse">
        <thead>
          <tr className="bg-gray-100">
            {["ID", "Name", "Description", "Active", "Actions"].map((h) => (
              <th
                key={h}
                className="border border-gray-500 p-2 font-bold text-gray-800"
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {categories.map((category) => (
            <tr key={category.id} className="text-center">
              <td className="border p-3">{category.id}</td>

              <td className="border p-3">
                <input
                  value={category.name}
                  disabled={editingId !== category.id}
                  onChange={(e) =>
                    handleChange(category.id, "name", e.target.value)
                  }
                  className="w-full p-2 border rounded"
                />
              </td>

              <td className="border p-3">
                <textarea
                  value={category.description}
                  disabled={editingId !== category.id}
                  onChange={(e) =>
                    handleChange(
                      category.id,
                      "description",
                      e.target.value
                    )
                  }
                  className="w-full p-2 border rounded"
                />
              </td>

              <td className="border p-3">
                <select
                  value={category.active}
                  disabled={editingId !== category.id}
                  onChange={(e) =>
                    handleChange(
                      category.id,
                      "active",
                      e.target.value === "true"
                    )
                  }
                  className="w-full p-2 border rounded"
                >
                  <option value="true">Active</option>
                  <option value="false">Inactive</option>
                </select>
              </td>

              <td className="border p-3">
                {editingId === category.id ? (
                  <div className="flex justify-center gap-2">
                    <button
                      onClick={() => handleSave(category.id)}
                      disabled={updatingId === category.id}
                      className="px-3 py-1 bg-green-500 text-white rounded"
                    >
                      {updatingId === category.id
                        ? "Saving..."
                        : "Save"}
                    </button>
                    <button
                      onClick={handleCancel}
                      className="px-3 py-1 bg-gray-400 text-white rounded"
                    >
                      Cancel
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => handleEdit(category)}
                    className="px-3 py-1 bg-blue-500 text-white rounded"
                  >
                    Update
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EditCategory;
