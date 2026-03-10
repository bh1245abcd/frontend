import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import axiosInstance from "../../api/axiosInstance";
import { getUserFromToken } from "../../api/auth";
const Navbar = () => {
  const [user, setUser] = useState(null);

  const navigate = useNavigate();
  const location = useLocation();

  // 🔄 Sync user on route change (same as user navbar)
  useEffect(() => {
    const token = sessionStorage.getItem("token");

    if (!token) {
      setUser(null);
    } else {
      setUser(getUserFromToken());
    }
  }, [location.pathname]);

  const isLoggedIn = !!user;
  const username = user?.username || "Admin";

  // 🔐 LOGOUT (same logic as user)
  const handleLogout = async () => {
    try {
      await axiosInstance.post("/login/v1/logout");

      sessionStorage.removeItem("token");
      sessionStorage.removeItem("role");

      setUser(null);
      toast.success("Logout Successful");

      navigate("/login", { replace: true });
    } catch {
      toast.error("Logout failed");
    }
  };

  // ---------- STYLES ----------
  const navbarStyle = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "15px 30px",
    backgroundColor: "#f9f5f0",
    boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
  };

  const logoStyle = {
    fontSize: "1.8rem",
    fontWeight: "bold",
    color: "#d4af37",
  };

  const rightStyle = {
    display: "flex",
    alignItems: "center",
    gap: "12px",
  };

  const avatarStyle = {
    width: "35px",
    height: "35px",
    borderRadius: "50%",
    backgroundColor: "#d4af37",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#fff",
    fontWeight: "bold",
  };

  const logoutBtn = {
    padding: "6px 12px",
    backgroundColor: "#b45309",
    color: "#fff",
    borderRadius: "6px",
    border: "none",
    cursor: "pointer",
  };

  return (
    <div style={navbarStyle}>
      <div style={logoStyle}>GoldenCraft Admin</div>

      {isLoggedIn ? (
        <div style={rightStyle}>
          <div style={avatarStyle}>
            {username.charAt(0).toUpperCase()}
          </div>

          <span style={{ fontWeight: "600", color: "#b45309" }}>
            Hi, {username}
          </span>

          <button style={logoutBtn} onClick={handleLogout}>
            Logout
          </button>
        </div>
      ) : (
        <button onClick={() => navigate("/admin/login")}>
          Login
        </button>
      )}
    </div>
  );
};

export default Navbar;
