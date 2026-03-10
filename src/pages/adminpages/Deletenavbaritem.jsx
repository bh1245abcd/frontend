import React, { useEffect, useState } from "react";
import axiosInstance from "../../api/axiosInstance";

const DeleteNavbarItem = () => {
  const [navbarItems, setNavbarItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deletingId, setDeletingId] = useState(null);

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

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this navbar item?")) return;

    setDeletingId(id);
    try {
      await axiosInstance.delete(`/api/admin/categories/${id}`);
      setNavbarItems((prev) => prev.filter((item) => item.id !== id));
      alert("Navbar item deleted successfully!");
    } catch (err) {
      console.error(err);
      alert("Failed to delete navbar item.");
    } finally {
      setDeletingId(null);
    }
  };

  if (loading) return <p>Loading navbar items...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div style={{ padding: "20px" }}>
      <h2>Delete Navbar Items</h2>
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
          {navbarItems.length > 0 ? (
            navbarItems.map((item) => (
              <tr key={item.id} style={{ textAlign: "center" }}>
                <td style={tdStyle}>{item.id}</td>
                <td style={tdStyle}>{item.name}</td>
                <td style={tdStyle}>{item.description}</td>
                <td style={tdStyle}>
                  {item.active ? (
                    <span style={{ color: "green", fontWeight: "600" }}>Active</span>
                  ) : (
                    <span style={{ color: "gray" }}>Inactive</span>
                  )}
                </td>
                <td style={tdStyle}>
                  <button
                    onClick={() => handleDelete(item.id)}
                    disabled={deletingId === item.id}
                    style={btnDelete}
                  >
                    {deletingId === item.id ? "Deleting..." : "Delete"}
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" style={{ textAlign: "center", padding: "10px" }}>
                No navbar items available
              </td>
            </tr>
          )}
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

const btnDelete = {
  backgroundColor: "#f44336",
  color: "white",
  border: "none",
  padding: "6px 12px",
  borderRadius: "4px",
  cursor: "pointer",
};

export default DeleteNavbarItem;
