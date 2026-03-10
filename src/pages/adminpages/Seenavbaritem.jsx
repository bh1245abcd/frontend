import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getCategories } from "../../api/auth";

const Seenavbaritems = () => {
  const [navbarItems, setNavbarItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchNavbarItems = async () => {
      try {
        const data = await getCategories(); // ✅ auth API
        setNavbarItems(data || []);
      } catch (err) {
        console.error("Error fetching navbar items:", err);
        setError("Failed to fetch navbar items");
      } finally {
        setLoading(false);
      }
    };

    fetchNavbarItems();
  }, []);

  if (loading) return <p>Loading navbar items...</p>;
  if (error) return <p className="text-red-600">{error}</p>;

  return (
    <div className="p-5">
      <h2 className="text-[#b88f5b] text-center text-xl font-semibold">
        Website Navbar Items
      </h2>

      <table className="w-full border border-gray-300 border-collapse mt-5">
        <thead>
          <tr className="bg-[#fff8f0]">
            <th className="border border-gray-300 p-2 font-bold text-[#4b3e2a]">
              ID
            </th>
            <th className="border border-gray-300 p-2 font-bold text-[#4b3e2a]">
              Name
            </th>
            <th className="border border-gray-300 p-2 font-bold text-[#4b3e2a]">
              Description
            </th>
            <th className="border border-gray-300 p-2 font-bold text-[#4b3e2a]">
              Active
            </th>
            <th className="border border-gray-300 p-2 font-bold text-[#4b3e2a]">
              Actions
            </th>
          </tr>
        </thead>

        <tbody>
          {navbarItems.length > 0 ? (
            navbarItems.map((item) => (
              <tr key={item.id} className="text-center">
                <td className="border border-gray-300 p-2 text-gray-800">
                  {item.id}
                </td>
                <td className="border border-gray-300 p-2 text-gray-800">
                  {item.name}
                </td>
                <td className="border border-gray-300 p-2 text-gray-800">
                  {item.description}
                </td>

                <td className="border border-gray-300 p-2">
                  {item.active ? (
                    <span className="text-green-600 font-semibold">
                      Active
                    </span>
                  ) : (
                    <span className="text-gray-500">Inactive</span>
                  )}
                </td>

                <td className="border border-gray-300 p-2">
                  <div className="flex justify-center gap-2">
                    <button
                      onClick={() => navigate(`/admin/editnavbaritem`)}
                      className="bg-green-500 text-white px-3 py-1 rounded cursor-pointer"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => navigate(`/admin/deletenavbaritem`)}
                      className="bg-red-500 text-white px-3 py-1 rounded cursor-pointer"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="text-center p-3">
                No navbar items available
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Seenavbaritems;
