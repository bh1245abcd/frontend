import React, { useState, useEffect, useRef } from "react";
import { Search, Mic, Menu, X, Heart, ShoppingBag, UserRound } from "lucide-react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import axiosInstance from "../api/axiosInstance";
import { toast } from "react-toastify";
import { getUserFromToken } from "../api/auth";
import { getCartItems } from "../api/auth";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [listening, setListening] = useState(false);
  const [user, setUser] = useState(null);
  const [cartCount, setCartCount] = useState(0); // ✅ NEW

  const navigate = useNavigate();
  const location = useLocation();
  const recognitionRef = useRef(null);

  const isLoggedIn = !!user;
  const username = user?.username;

  // ✅ USER LOAD
  useEffect(() => {
    const token = sessionStorage.getItem("token");

    if (!token) {
      setUser(null);
    } else {
      setUser(getUserFromToken());
    }
  }, [location.pathname]);

useEffect(() => {
  const fetchCart = async () => {
    try {
      const items = await getCartItems();

      setCartCount(items.length); // ✅ count of products

    } catch (err) {
      console.log(err);
    }
  };

  fetchCart();
}, [location.pathname]);

  // Active Link
  const getLinkClasses = (path) =>
    `hover:text-amber-700 transition font-medium ${location.pathname === path ? "text-amber-700 font-semibold" : "text-gray-700"
    }`;

  // 🎤 Speech Recognition
  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) return;

    const recognition = new SpeechRecognition();
    recognition.lang = "en-US";

    recognition.onresult = (event) => {
      const text = event.results[0][0].transcript;
      setSearchText(text);
    };

    recognition.onend = () => setListening(false);
    recognitionRef.current = recognition;
  }, []);

  const startListening = () => {
    if (!recognitionRef.current) return;
    setListening(true);
    recognitionRef.current.start();
  };

  const stopListening = () => {
    if (recognitionRef.current) recognitionRef.current.stop();
    setListening(false);
  };

  // 🔓 Logout
  const handleLogout = async () => {
    try {
      await axiosInstance.post("/login/v1/logout");

      sessionStorage.removeItem("token");
      sessionStorage.removeItem("role");
      setUser(null);

      toast.success("Logout Successful");
      navigate("/", { replace: true });
    } catch {
      toast.error("Logout failed");
    }
  };

  return (
    <>
      <div className="container mx-auto flex items-center justify-between px-4 py-4 bg-white">

        {/* LEFT */}
        <div className="flex items-center gap-4">
          <Menu className="w-7 h-7 text-amber-700 md:hidden" onClick={() => setOpen(true)} />
          <span onClick={() => navigate("/")} className="text-xl font-bold cursor-pointer">
            Abhi Jewellers
          </span>
        </div>

        {/* RIGHT MOBILE */}
        <div className="md:hidden flex items-center gap-3">

          {/* ❤️ */}
          <Heart className="w-5 h-5 text-amber-700" />

          {/* 🛒 CART BADGE */}
          <Link to="/cart" className="relative inline-block">

            {cartCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 bg-red-600 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full font-bold">
                {cartCount}
              </span>
            )}
          </Link>

          {isLoggedIn && (
            <div className="bg-amber-100 px-2 py-1 rounded text-sm flex items-center gap-1">
              <UserRound className="w-4 h-4" />
              {username}
            </div>
          )}
        </div>

        {/* SEARCH DESKTOP */}
        <div className="hidden md:flex items-center border rounded-full px-4 py-2 w-1/2">
          <Search className="w-5 h-5 mr-2" />
          <input
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            placeholder="Search jewellery..."
            className="w-full outline-none"
          />
          <Mic
            onClick={listening ? stopListening : startListening}
            className={`cursor-pointer ${listening ? "text-red-500" : ""}`}
          />
        </div>

        {/* DESKTOP MENU */}
        <div className="hidden md:flex gap-6 items-center">

          <Link to="/" className="text-amber-700 font-semibold">
            Home
          </Link>

          <Link to="/about" className={getLinkClasses("/about")}>
            About
          </Link>

          {/* 🛒 CART WITH COUNT */}
          <Link to="/cart" className="relative inline-block">
            cart
            {cartCount > 0 && (
              <span className="absolute -top-1.5 -right-4 bg-red-600 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full font-bold">
                {cartCount}
              </span>
            )}
          </Link>

          <Link to="/contact" className={getLinkClasses("/contact")}>
            Contact
          </Link>

          {isLoggedIn ? (
            <>
              <span>Hi, {username}</span>
              <button onClick={handleLogout} className="bg-amber-700 text-white px-3 py-1 rounded">
                Logout
              </button>
            </>
          ) : (
            <Link to="/login">Login</Link>
          )}
        </div>
      </div>
    </>
  );
};

export default Navbar;