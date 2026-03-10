import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { registerUser } from "../../api/auth"; // ✅ auth.js

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const nav = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { name, email, password, confirmPassword } = formData;

    // ✅ frontend validation
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    const payload = {
      username: name,
      email,
      password,
      role: "user",
    };

    try {
      const res = await registerUser(payload);

      /*
        RESPONSE:
        {
          status: "success",
          message: "User registered successfully",
          data: { userId: 9 }
        }
      */

      toast.success("Registration successful!");
      nav("/login");

    } catch (err) {
      const errorData = err?.meta || err?.response?.data;

      // 🔴 Backend error handling (same logic preserved)
      if (errorData?.errorCode === 1705) {
        toast.error("Username already exists. Try another one.");
      }
      else if (errorData?.errorName === "EMAIL_ALREADY_EXISTS") {
        toast.error("Email already registered.");
      }
      else if (err?.response?.status === 400) {
        toast.error(errorData?.message || "Invalid request data");
      }
      else if (err?.response?.status === 500) {
        toast.error("Server error. Please try again later.");
      }
      else if (err?.message === "Network Error") {
        toast.error("Network error. Check your internet connection.");
      }
      else {
        toast.error("Registration failed. Please try again.");
      }

      console.error("Registration failed:", errorData || err.message);
    }
  };

  return (
    <>
      {/* 🔽 UI unchanged */}
      <div className="mb-10 mt-40 md:mt-30">
        <p className="text-center mt-2 text-[28px] font-bold fraunce-font">
          REGISTRATION FORM
        </p>
        <p className="text-center text-gray-400 mb-5 fraunce-font-ligh">
          Fill in the details to register
        </p>

        <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-4 mb-4">
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Your full name"
            className="w-full px-4 py-3 border border-gray-300 mb-4"
            required
          />

          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="you@example.com"
            className="w-full px-4 py-3 border border-gray-300 mb-4"
            required
          />

          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter your password"
            className="w-full px-4 py-3 border border-gray-300 mb-4"
            required
          />

          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            placeholder="Confirm your password"
            className="w-full px-4 py-3 border border-gray-300 mb-4"
            required
          />

          <button
            type="submit"
            className="w-full py-3 bg-[#330000] text-white font-semibold rounded-xl shadow-md hover:scale-105 transition"
          >
            Register
          </button>

          <p className="text-center mt-2">
            Already have an account?{" "}
            <Link to="/login">
              <span className="text-blue-400 hover:underline">
                Login here...
              </span>
            </Link>
          </p>
        </form>
      </div>
    </>
  );
};

export default Register;
