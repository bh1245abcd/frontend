import React from "react";
import Sidebar from "../pages/adminpages/SIdebar";
import Navbar from "../pages/adminpages/Navbar";
import { Outlet } from "react-router-dom";

const AdminLayout = () => {
  // Inline styles
  const layoutStyle = {
    display: "flex",
    flexDirection: "column",
    height: "100vh",
  };

  const mainContainerStyle = {
    display: "flex",
    flex: 1,
    overflow: "hidden",
  };

  const contentStyle = {
    flex: 1,
    padding: "20px",
    backgroundColor: "#f3f4f6",
    // overflowY: "auto",
  };

  const sidebarStyle = {
    width: "250px",
    backgroundColor: "#1f2937",
    color: "white",
    display: "flex",
    flexDirection: "column",
  };

  return (
    <div style={layoutStyle}>
      {/* Navbar */}
      <Navbar />

      {/* Main container */}
      <div style={mainContainerStyle}>
        {/* Sidebar */}
        <Sidebar style={sidebarStyle} />

        {/* Main content */}
        <main style={contentStyle}>
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
