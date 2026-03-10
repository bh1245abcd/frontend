import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { loginUser } from "../../api/auth"

const Login = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const payload = formData;
      const res = await loginUser(payload);

      const { token, role } = res.data;

      if (!token || !role) {
        throw new Error("Invalid response from server");
      }

      toast.success("Login Successful!");

      if (role.trim().toUpperCase() === "ADMIN") {
        navigate("/admin");
      } else {
        navigate("/");
      }
    } catch (err) {
      const msg =
        err.message ||
        err.response?.message ||
        "Invalid username or password.";

      toast.error(msg);
      setError(msg);
    } finally {
      setLoading(false);
    }
  };


  return (
    <>
      <div className="mb-10 mt-40 md:mt-30">
        <p className="text-center mt-2 text-[28px] font-bold fraunce-font">LOGIN FORM</p>
        <p className="text-center text-gray-400 mb-5 fraunce-font-ligh">Enter your credentials to login</p>

        <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-4 mb-4">
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            placeholder="Enter your username"
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

          {error && <p className="text-center text-red-500 mb-2">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 ${loading ? "bg-gray-400" : "bg-[#330000]"
              } text-white font-semibold rounded-xl`}
          >
            {loading ? "Logging in..." : "Login"}
          </button>

          <p className="text-center mt-2">
            Don’t have an account?{" "}
            <Link to="/register">
              <span className="text-blue-400 hover:underline">Register here...</span>
            </Link>
          </p>
        </form>
      </div>
    </>
  );
};

export default Login;
