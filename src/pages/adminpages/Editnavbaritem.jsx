import React, { useEffect, useState } from "react";
import axiosInstance from "../../api/axiosInstance";
import { useNavigate } from "react-router-dom";

const EditNavbarItem = () => {
  const [navbarItems, setNavbarItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [updatingId, setUpdatingId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchNavbarItems = async () => {
      try {
        const res = await axiosInstance.get("/api/admin/categories"); // Adjust endpoint
        setNavbarItems(res.data?.data?.content || []);
      } catch (err) {
        console.error("Error fetching navbar items:", err);
        setError("Failed to fetch navbar items.");
      } finally {
        setLoading(false);
      }
    };
    fetchNavbarItems();
  }, []);

  const handleChange = (id, field, value) => {
    setNavbarItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, [field]: value } : item))
    );
  };

  const handleUpdate = async (id) => {
    const item = navbarItems.find((i) => i.id === id);
    setUpdatingId(id);
    try {
      await axiosInstance.put(`/api/admin/categories/${id}`, {
        name: item.name,
        description: item.description,
        active: item.active,
      });
      alert("Navbar item updated successfully!");
    } catch (err) {
      console.error(err);
      alert("Failed to update navbar item.");
    } finally {
      setUpdatingId(null);
    }
  };

  if (loading) return <p>Loading navbar items...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div style={{ padding: "20px" }}>
      <h2>Edit Navbar Items</h2>
      <table style={{ width: "100%", borderCollapse: "collapse", marginTop: "20px" }}>
        <thead>
          <tr style={{ backgroundColor: "#f5f5f5" }}>
            <th style={thStyle}>ID</th>
            <th style={thStyle}>Name</th>
            <th style={thStyle}>Description</th>
            <th style={thStyle}>Active</th>
            <th style={thStyle}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {navbarItems.map((item) => (
            <tr key={item.id} style={{ textAlign: "center" }}>
              <td style={tdStyle}>{item.id}</td>
              <td style={tdStyle}>
                <input
                  type="text"
                  value={item.name}
                  onChange={(e) => handleChange(item.id, "name", e.target.value)}
                  style={inputStyle}
                />
              </td>
              <td style={tdStyle}>
                <textarea
                  value={item.description}
                  onChange={(e) => handleChange(item.id, "description", e.target.value)}
                  style={textareaStyle}
                />
              </td>
              <td style={tdStyle}>
                <select
                  value={item.active}
                  onChange={(e) => handleChange(item.id, "active", e.target.value === "true")}
                  style={inputStyle}
                >
                  <option value="true">Active</option>
                  <option value="false">Inactive</option>
                </select>
              </td>
              <td style={tdStyle}>
                <button
                  onClick={() => handleUpdate(item.id)}
                  disabled={updatingId === item.id}
                  style={btnStyle}
                >
                  {updatingId === item.id ? "Updating..." : "Update"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

// --- Styles ---
const thStyle = {
  border: "1px solid #ccc",
  padding: "10px",
  fontWeight: "bold",
};

const tdStyle = {
  border: "1px solid #ccc",
  padding: "10px",
  verticalAlign: "middle",
};

const inputStyle = {
  width: "100%",
  padding: "6px",
  borderRadius: "4px",
  border: "1px solid #ccc",
};

const textareaStyle = {
  width: "100%",
  padding: "6px",
  borderRadius: "4px",
  border: "1px solid #ccc",
  resize: "vertical",
};

const btnStyle = {
  padding: "6px 12px",
  backgroundColor: "#4CAF50",
  color: "white",
  border: "none",
  borderRadius: "4px",
  cursor: "pointer",
};

export default EditNavbarItem;
