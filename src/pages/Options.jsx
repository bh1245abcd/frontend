// import { Gift, Star, MoreHorizontal } from "lucide-react";
// import { Link, useNavigate } from "react-router-dom";
// import { GiHeartNecklace, GiDropEarrings } from "react-icons/gi";
// import { IoDiamondOutline } from "react-icons/io5";

// const Options = () => {
//   return (
//     <div className="bg-white py-3 mb-1 border-b border-gray-300 ">
//       <ul className="flex items-center gap-14 text-gray-700 font-medium tracking-wide overflow-x-auto whitespace-nowrap px-4 scrollbar-hide poppins-light hide-scrollbar md:justify-center md:flex-wrap md:overflow-visible md:whitespace-normal">
//         <Link to="/gifts">
//           <li
//             className="relative flex items-center gap-2 cursor-pointer transition hover:text-amber-700
//   after:content-[''] after:absolute after:-bottom-1 after:left-1/2 after:-translate-x-1/2
//   after:w-0 after:h-[2px] after:bg-amber-700 after:transition-all after:duration-300
//   hover:after:w-full hover:font-semibold"
//           >
//             <Gift className="w-5 h-5 " />
//             Gifts
//           </li>
//         </Link>
//         <Link to="/earings">
//           <li
//             className="relative flex items-center gap-2 cursor-pointer transition hover:text-amber-700
//   after:content-[''] after:absolute after:-bottom-1 after:left-1/2 after:-translate-x-1/2
//   after:w-0 after:h-[2px] after:bg-amber-700 after:transition-all after:duration-300
//   hover:after:w-full hover:font-semibold"
//           >
//             <GiDropEarrings className="w-5 h-5 " />
//             Earrings
//           </li>
//         </Link>

//         <Link to="/necklase">
//           <li
//             className="relative flex items-center gap-2 cursor-pointer transition hover:text-amber-700
//   after:content-[''] after:absolute after:-bottom-1 after:left-1/2 after:-translate-x-1/2
//   after:w-0 after:h-[2px] after:bg-amber-700 after:transition-all after:duration-300
//   hover:after:w-full hover:font-semibold"
//           >
//             <GiHeartNecklace className="w-5 h-5 " />
//             Necklaces
//           </li>
//         </Link>

//         <Link to="/golds">
//           <li
//             className="relative flex items-center gap-2 cursor-pointer transition hover:text-amber-700
//   after:content-[''] after:absolute after:-bottom-1 after:left-1/2 after:-translate-x-1/2
//   after:w-0 after:h-[2px] after:bg-amber-700 after:transition-all after:duration-300
//   hover:after:w-full hover:font-semibold"
//           >
//             <Star className="w-5 h-5 " />
//             Gold
//           </li>
//         </Link>

//         <Link to="/diamonds">
//           <li
//             className="relative flex items-center gap-2 cursor-pointer transition hover:text-amber-700
//   after:content-[''] after:absolute after:-bottom-1 after:left-1/2 after:-translate-x-1/2
//   after:w-0 after:h-[2px] after:bg-amber-700 after:transition-all after:duration-300
//   hover:after:w-full hover:font-semibold"
//           >
//             <IoDiamondOutline className="w-5 h-5 " />
//             Diamond
//           </li>
//         </Link>

//         <li
//           className="relative flex items-center gap-2 cursor-pointer transition hover:text-amber-700
//   after:content-[''] after:absolute after:-bottom-1 after:left-1/2 after:-translate-x-1/2
//   after:w-0 after:h-[2px] after:bg-amber-700 after:transition-all after:duration-300
//   hover:after:w-full hover:font-semibold"
//         >
//           <MoreHorizontal className="w-5 h-5 " />
//           More
//         </li>
//       </ul>
//     </div>
//   );
// };

// export default Options;

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { MoreHorizontal, X } from "lucide-react";
import { getPublicCategories, getPublicsubCategories } from "../api/auth";
import { categoryIcons } from "../icons/icons";

const Options = () => {
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState({});
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState(null);

  // Fetch categories
  useEffect(() => {
    getPublicCategories().then(setCategories).catch(console.error);
  }, []);

  // Fetch subcategories
  const fetchSubCategories = async (categoryId) => {
    if (subcategories[categoryId]) return;

    try {
      const data = await getPublicsubCategories(categoryId);
      setSubcategories((prev) => ({
        ...prev,
        [categoryId]: data,
      }));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="bg-white py-3 mb-1 border-b border-gray-300">
      {/* MOBILE HEADER */}
      <div className="md:hidden flex justify-center px-4">
        <button
          onClick={() => setSidebarOpen(true)}
          className="flex items-center gap-2 text-gray-700 font-medium"
        >
          Categories
        </button>
      </div>

      {/* DESKTOP MENU (UNCHANGED DESIGN) */}
      <ul className="hidden md:flex items-center gap-14 text-gray-700 font-medium tracking-wide px-4 poppins-light md:justify-center md:flex-wrap">
        {categories.map((cat) => {
          const key = cat.name.toLowerCase();
          const Icon = categoryIcons[key] || MoreHorizontal;

          return (
            <li
              key={cat.id}
              className="relative group"
              onMouseEnter={() => fetchSubCategories(cat.id)}
            >
              <Link
              
  to={`/category/${cat.id}`}
                className="
                  relative flex items-center gap-2 cursor-pointer transition
                  hover:text-amber-700
                  after:content-[''] after:absolute after:-bottom-1 after:left-1/2 after:-translate-x-1/2
                  after:w-0 after:h-[2px] after:bg-amber-700 after:transition-all after:duration-300
                  hover:after:w-full hover:font-semibold
                "
              >
                <Icon className="w-5 h-5" />
                {cat.name}
              </Link>

              {/* SUBCATEGORY DROPDOWN */}
              {subcategories[cat.id]?.length > 0 && (
                <ul className="absolute top-full left-0 hidden group-hover:block bg-white shadow-lg rounded-md w-[400px] z-50 mt-1">
                  {subcategories[cat.id].map((sub) => (
                    <li key={sub.id}>
                      <Link
                        to={`/${key}/${cat.id}/${sub.id}`}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-amber-100 transition"
                      >
                        {sub.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          );
        })}
      </ul>

      {/* MOBILE SIDEBAR */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          {/* Overlay */}
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setSidebarOpen(false)}
          />

          {/* Sidebar */}
          <div className="absolute left-0 top-0 h-full w-72 bg-white shadow-xl p-4 overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Categories</h3>
              <button onClick={() => setSidebarOpen(false)}>
                <X className="w-5 h-5" />
              </button>
            </div>

            {categories.map((cat) => {
              const key = cat.name.toLowerCase();
              const Icon = categoryIcons[key] || MoreHorizontal;

              return (
                <div key={cat.id} className="mb-3">
                  <button
                    onClick={() => {
                      fetchSubCategories(cat.id);
                      setActiveCategory(
                        activeCategory === cat.id ? null : cat.id,
                      );
                    }}
                    className="w-full flex items-center justify-between py-2 text-gray-700 font-medium"
                  >
                    <span className="flex items-center gap-2">
                      <Icon className="w-5 h-5" />
                      {cat.name}
                    </span>
                    <span>{activeCategory === cat.id ? "−" : "+"}</span>
                  </button>

                  {activeCategory === cat.id &&
                    subcategories[cat.id]?.map((sub) => (
                      <Link
                        key={sub.id}
                        to={`/${key}/${cat.id}/${sub.id}`}
                        onClick={() => setSidebarOpen(false)}
                        className="block pl-8 py-2 text-sm text-gray-600 hover:text-amber-700"
                      >
                        {sub.name}
                      </Link>
                    ))}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default Options;
