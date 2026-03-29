// import React, { useState, useEffect, useRef } from "react";
// import { Search, Mic, Menu, X, Heart, ShoppingBag, UserRound } from "lucide-react";
// import { Link, useNavigate, useLocation } from "react-router-dom";
// import axiosInstance from "../api/axiosInstance";
// import { toast } from "react-toastify";
// import { getUserFromToken } from "../api/auth";
// import { getCartItems } from "../api/auth";

// const Navbar = () => {
//   const [open, setOpen] = useState(false);
//   const [searchText, setSearchText] = useState("");
//   const [listening, setListening] = useState(false);
//   const [user, setUser] = useState(null);
//   const [cartCount, setCartCount] = useState(0); // ✅ NEW

//   const navigate = useNavigate();
//   const location = useLocation();
//   const recognitionRef = useRef(null);

//   const isLoggedIn = !!user;
//   const username = user?.username;

//   // ✅ USER LOAD
//   useEffect(() => {
//     const token = sessionStorage.getItem("token");

//     if (!token) {
//       setUser(null);
//     } else {
//       setUser(getUserFromToken());
//     }
//   }, [location.pathname]);

// useEffect(() => {
//   const fetchCart = async () => {
//     try {
//       const items = await getCartItems();

//       setCartCount(items.length); // ✅ count of products

//     } catch (err) {
//       console.log(err);
//     }
//   };

//   fetchCart();
// }, [location.pathname]);

//   // Active Link
//   const getLinkClasses = (path) =>
//     `hover:text-amber-700 transition font-medium ${location.pathname === path ? "text-amber-700 font-semibold" : "text-gray-700"
//     }`;

//   // 🎤 Speech Recognition
//   useEffect(() => {
//     const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
//     if (!SpeechRecognition) return;

//     const recognition = new SpeechRecognition();
//     recognition.lang = "en-US";

//     recognition.onresult = (event) => {
//       const text = event.results[0][0].transcript;
//       setSearchText(text);
//     };

//     recognition.onend = () => setListening(false);
//     recognitionRef.current = recognition;
//   }, []);

//   const startListening = () => {
//     if (!recognitionRef.current) return;
//     setListening(true);
//     recognitionRef.current.start();
//   };

//   const stopListening = () => {
//     if (recognitionRef.current) recognitionRef.current.stop();
//     setListening(false);
//   };

//   // 🔓 Logout
//   const handleLogout = async () => {
//     try {
//       await axiosInstance.post("/login/v1/logout");

//       sessionStorage.removeItem("token");
//       sessionStorage.removeItem("role");
//       setUser(null);

//       toast.success("Logout Successful");
//       navigate("/", { replace: true });
//     } catch {
//       toast.error("Logout failed");
//     }
//   };

//   return (
//     <>
//       <div className="container mx-auto flex items-center justify-between px-4 py-4 bg-white">

//         {/* LEFT */}
//         <div className="flex items-center gap-4">
//           <Menu className="w-7 h-7 text-amber-700 md:hidden" onClick={() => setOpen(true)} />
//           <span onClick={() => navigate("/")} className="text-xl font-bold cursor-pointer">
//             Abhi Jewellers
//           </span>
//         </div>

//         {/* RIGHT MOBILE */}
//         <div className="md:hidden flex items-center gap-3">

//           {/* ❤️ */}
//           <Heart className="w-5 h-5 text-amber-700" />

//           {/* 🛒 CART BADGE */}
//           <Link to="/cart" className="relative inline-block">

//             {cartCount > 0 && (
//               <span className="absolute -top-1.5 -right-1.5 bg-red-600 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full font-bold">
//                 {cartCount}
//               </span>
//             )}
//           </Link>

//           {isLoggedIn && (
//             <div className="bg-amber-100 px-2 py-1 rounded text-sm flex items-center gap-1">
//               <UserRound className="w-4 h-4" />
//               {username}
//             </div>
//           )}
//         </div>

//         {/* SEARCH DESKTOP */}
//         <div className="hidden md:flex items-center border rounded-full px-4 py-2 w-1/2">
//           <Search className="w-5 h-5 mr-2" />
//           <input
//             value={searchText}
//             onChange={(e) => setSearchText(e.target.value)}
//             placeholder="Search jewellery..."
//             className="w-full outline-none"
//           />
//           <Mic
//             onClick={listening ? stopListening : startListening}
//             className={`cursor-pointer ${listening ? "text-red-500" : ""}`}
//           />
//         </div>

//         {/* DESKTOP MENU */}
//         <div className="hidden md:flex gap-6 items-center">

//           <Link to="/" className="text-amber-700 font-semibold">
//             Home
//           </Link>

//           <Link to="/about" className={getLinkClasses("/about")}>
//             About
//           </Link>

//           {/* 🛒 CART WITH COUNT */}
//           <Link to="/cart" className="relative inline-block">
//             cart
//             {cartCount > 0 && (
//               <span className="absolute -top-1.5 -right-4 bg-red-600 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full font-bold">
//                 {cartCount}
//               </span>
//             )}
//           </Link>

//           <Link to="/contact" className={getLinkClasses("/contact")}>
//             Contact
//           </Link>

//           {isLoggedIn ? (
//             <>
//               <span>Hi, {username}</span>
//               <button onClick={handleLogout} className="bg-amber-700 text-white px-3 py-1 rounded">
//                 Logout
//               </button>
//             </>
//           ) : (
//             <Link to="/login">Login</Link>
//           )}
//         </div>
//       </div>
//     </>
//   );
// };

// export default Navbar;



import React, { useState, useEffect, useRef } from "react";
import { Search, Mic, Menu, X, Heart, ShoppingBag, UserRound } from "lucide-react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import axiosInstance from "../api/axiosInstance";
import { toast } from "react-toastify";
import { getUserFromToken } from "../api/auth"
import { getCartItems } from "../api/auth";


const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [listening, setListening] = useState(false);
  const [user, setUser] = useState(null);
  const [cartCount, setCartCount] = useState(0);

  const navigate = useNavigate();
  const location = useLocation();
  const recognitionRef = useRef(null);

  const isLoggedIn = !!user;
  const username = user?.username;
  console.log(username)

  // useEffect(() => {
  //   const userData = getUserFromToken();
  //   setUser(userData);
  // }, []);

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    console.log(token)

    if (!token) {
      setUser(null);
    } else {
      setUser(getUserFromToken());
    }
  }, [location.pathname]);

  // useEffect(() => {
  //   const token = sessionStorage.getItem("token");

  //   if (!token) {
  //     setUser(null);
  //   } else {
  //     setUser(getUserFromToken());
  //   }
  // }, [location.pathname]);



  // Active Link Classes
  const getLinkClasses = (path) =>
    `hover:text-amber-700 transition font-medium ${location.pathname === path ? "text-amber-700 font-semibold" : "text-gray-700"
    }`;

  // Speech Recognition
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

  // Logout
  // const handleLogout = async () => {
  //   try {
  //     await axiosInstance.post("/login/v1/logout");
  //     // localStorage.clear();
  //     sessionStorage.clear();
  //     setUser(null);
  //     toast.success("Logout Successful");
  //     navigate("/login");
  //   } catch {
  //     toast.error("Logout failed");
  //   }
  // };

  const handleLogout = async () => {
    try {
      await axiosInstance.post("/login/v1/logout");

      sessionStorage.removeItem("token");
      sessionStorage.removeItem("role")
      setUser(null);

      toast.success("Logout Successful");
      navigate("/", { replace: true });
    } catch {
      toast.error("Logout failed");
    }
  };

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const items = await getCartItems();

        // agar API array return kar rahi hai
        setCartCount(items.length);

        // agar API me {data: []} ho to:
        // setCartCount(items.data.length);

      } catch (err) {
        console.log(err);
      }
    };

    fetchCart();
  }, [location.pathname]);

  return (
    <>
      <div className="container mx-auto flex items-center justify-between px-4 sm:px-6 lg:px-8 py-4 bg-white border-yellow-100">
        <div className="flex items-center gap-4">
          <Menu className="w-7 h-7 text-amber-700 md:hidden" onClick={() => setOpen(true)} />

          <div className="flex items-center gap-3">
            <span onClick={() => navigate("/")} className="text-xl font-serif font-bold text-[#300708]">Abhi Jewellers</span>
          </div>
        </div>
        {/* RIGHT: MOBILE USERNAME */}
        <div className="md:hidden flex items-center gap-3">
          <Heart className="w-5 h-5 text-amber-700" />
          {/* <ShoppingBag className="w-5 h-5 text-amber-700" /> */}
          <Link to="/cart" className="relative">
            <ShoppingBag className="w-5 h-5 text-amber-700" />

            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full font-bold">
                {cartCount}
              </span>
            )}
          </Link>
          {isLoggedIn && username && (
            <div className="bg-amber-100 px-3 py-2 rounded-xl text-sm text-amber-700 font-semibold flex items-center gap-1">
              <UserRound className="w-4 h-4" />
              <span>{username}</span>
            </div>
          )}
        </div>
        {/* CENTER – Desktop Search Bar */}
        <div className="hidden md:flex items-center bg-white border border-gray-200 rounded-full px-4 py-2 w-1/2 max-w-lg shadow-inner">
          <Search className="w-5 h-5 text-gray-500 mr-2" />
          <input
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            placeholder="Search for jewellery, rings, necklaces..."
            className="grow bg-transparent outline-none text-gray-700 placeholder-gray-400"
          />

          <Mic
            size={20}
            onClick={listening ? stopListening : startListening}
            className={`w-5 h-5 cursor-pointer transition ${listening ? "text-red-500 animate-pulse" : "text-gray-500 hover:text-amber-700"
              }`}
          />
        </div>

        {/* RIGHT – Desktop Menu */}
        <div className="hidden md:flex gap-9 items-center">
          {/* HOME ALWAYS ACTIVE */}
          <Link to="/" className="text-amber-700 font-semibold hover:text-amber-700">
            Home
          </Link>

          {/* OTHER LINKS */}
          <Link to="/about" className={getLinkClasses("/about")}>
            About
          </Link>

          {/* <Link to="/cart" className={getLinkClasses("/cart")}>
            Cart
          </Link> */}
          <Link to="/cart" className={`relative ${getLinkClasses("/cart")}`}>
            Cart

            {cartCount > 0 && (
              <span className="absolute -top-2 -right-4 bg-red-600 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full font-bold">
                {cartCount}
              </span>
            )}
          </Link>
          <Link to="/contact" className={getLinkClasses("/contact")}>
            Contact
          </Link>

          {isLoggedIn ? (
            <div className="flex items-center gap-4">
              <span className="font-semibold text-amber-700">Hi, {username}!</span>
              <button onClick={handleLogout} className="text-white border px-2 py-1 rounded-lg bg-amber-700 font-medium  hover:bg-red-700">
                Logout
              </button>
            </div>
          ) : (
            <Link to="/login">Login</Link>
          )}

        </div>
      </div>

      {/* MOBILE SEARCH BAR */}
      <div className="md:hidden px-4 py-2 bg-white shadow-sm">
        <div className="flex items-center bg-white border border-gray-200 rounded-xl px-4 py-3 shadow-inner">
          <Search className="w-5 h-5 text-gray-500 mr-2" />
          <input
            type="text"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            placeholder="Search for Jewellery..."
            className="grow bg-transparent outline-none text-gray-700 placeholder-gray-400"
          />

          <Mic
            className={`w-5 h-5 cursor-pointer transition ${listening ? "text-red-500 animate-pulse" : "text-gray-500"
              }`}
            onClick={() => (listening ? stopListening() : startListening())}
          />
        </div>
      </div>

      {/* MOBILE SIDEBAR */}
      <div
        className={`fixed top-0 left-0 h-full bg-white shadow-xl w-64 z-50 transition-transform duration-300 ${open ? "translate-x-0" : "-translate-x-full"
          }`}
      >
        <div className="flex justify-between items-center px-4 py-4 border-b">
          <span className="text-xl font-serif font-bold text-amber-700">Menu</span>
          <X onClick={() => setOpen(false)} className="w-7 h-7 cursor-pointer" />
        </div>

        <ul className="flex flex-col space-y-4 mt-6 px-6 text-gray-700 font-medium">
          {/* MOBILE ACTIVE LINKS */}
          <Link to="/" onClick={() => setOpen(false)}>
            <li className={location.pathname === "/" ? "text-amber-700 font-semibold" : ""}>Home</li>
          </Link>

          <Link to="/about" onClick={() => setOpen(false)}>
            <li className={location.pathname === "/about" ? "text-amber-700 font-semibold" : ""}>About</li>
          </Link>

          <Link to="/cart" onClick={() => setOpen(false)}>
            <li className={location.pathname === "/cart" ? "text-amber-700 font-semibold" : ""}>Cart</li>
          </Link>

          <Link to="/contact" onClick={() => setOpen(false)}>
            <li className={location.pathname === "/contact" ? "text-amber-700 font-semibold" : ""}>Contact</li>
          </Link>

          {isLoggedIn ? (
            <li
              onClick={() => {
                setOpen(false);
                handleLogout();
              }}
              className="text-red-600 font-semibold"
            >
              Logout
            </li>
          ) : (
            <Link to="/login" onClick={() => setOpen(false)}>
              <li className={location.pathname === "/login" ? "text-amber-700 font-semibold" : ""}>
                Login
              </li>
            </Link>
          )}
        </ul>
      </div>
    </>
  );
};

export default Navbar;