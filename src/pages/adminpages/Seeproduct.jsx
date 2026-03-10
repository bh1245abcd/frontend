import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  getProducts,
  getProductsByCategory,
  getProductsBySubCategory,
  getPublicsubCategories,
  getCategories,
} from "../../api/auth";

const Seeproduct = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);

  const [selectedCategoryId, setSelectedCategoryId] = useState("ALL");
  const [selectedSubCategoryId, setSelectedSubCategoryId] = useState("ALL");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  /* Fetch Categories */
  const fetchCategories = async () => {
    try {
      const res = await getCategories();
      setCategories([{ id: "ALL", name: "All Categories" }, ...res]);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch categories");
    }
  };

  /* Fetch Subcategories on Category Change */
  useEffect(() => {
    const fetchSubCategories = async () => {
      if (selectedCategoryId === "ALL") {
        setSubcategories([]);
        setSelectedSubCategoryId("ALL");
        return;
      }

      try {
        const res = await getPublicsubCategories(selectedCategoryId);
        setSubcategories([{ id: "ALL", name: "All Subcategories" }, ...res]);
        setSelectedSubCategoryId("ALL");
      } catch (err) {
        console.error(err);
        setSubcategories([]);
      }
    };

    fetchSubCategories();
  }, [selectedCategoryId]);

  /* Fetch Products */
  // const fetchProducts = async (categoryId, subCategoryId) => {
  //   try {
  //     setLoading(true);
  //     let data = [];

  //     if (categoryId === "ALL") {
  //       data = await getProducts();
  //     } else if (subCategoryId !== "ALL") {
  //       data = await getProductsBySubCategory(categoryId, subCategoryId);
  //     } else {
  //       data = await getProductsByCategory(categoryId);
  //     }

  //     setProducts(data);
  //   } catch (err) {
  //     console.error(err);
  //     setError("Failed to fetch products");
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const fetchProducts = async (categoryId, subCategoryId) => {
  try {
    setLoading(true);
    let data = [];

    if (categoryId === "ALL") {
      data = await getProducts();
    } else if (subCategoryId !== "ALL") {
      data = await getProductsBySubCategory(categoryId, subCategoryId);
    } else {
      data = await getProductsByCategory(categoryId);
    }

    // 🔥 NORMALIZE HERE
    const normalized = data.map((p) => ({
      id: p.id,
      name: p.name || p.productName,
      description: p.description,
      price: p.price,
      stockQuantity: p.stockQuantity ?? "-",
      categoryName: p.categoryName || p.category?.name || "-",
      subCategoryName: p.subCategoryName || "-",
    }));

    setProducts(normalized);
  } catch (err) {
    console.error(err);
    setError("Failed to fetch products");
  } finally {
    setLoading(false);
  }
};

  /* Initial Load */
  useEffect(() => {
    fetchCategories();
    fetchProducts("ALL", "ALL");
  }, []);

  /* Refetch on Filter Change */
  useEffect(() => {
    fetchProducts(selectedCategoryId, selectedSubCategoryId);
  }, [selectedCategoryId, selectedSubCategoryId]);

  if (loading) return <p className="mt-5 text-center">Loading products...</p>;
  if (error) return <p className="mt-5 text-center text-red-600">{error}</p>;

  return (
    <div className="p-5">
      <h2 className="text-xl font-semibold mb-3">Jewelry Products</h2>

      {/* Category Dropdown */}
      <select
        value={selectedCategoryId}
        onChange={(e) => setSelectedCategoryId(e.target.value)}
        className="p-2 mb-4 border rounded mr-3"
      >
        {categories.map((cat) => (
          <option key={cat.id} value={cat.id}>
            {cat.name}
          </option>
        ))}
      </select>

      {/* Subcategory Dropdown */}
      {subcategories.length > 0 && (
        <select
          value={selectedSubCategoryId}
          onChange={(e) => setSelectedSubCategoryId(e.target.value)}
          className="p-2 mb-4 border rounded"
        >
          {subcategories.map((sub) => (
            <option key={sub.id} value={sub.id}>
              {sub.name}
            </option>
          ))}
        </select>
      )}

      {/* Products Table */}
      <table className="w-full border border-collapse mt-2">
        <thead className="bg-[#fff8f0]">
          <tr className="bg-gray-100">
            <th className="border p-2">ID</th>
            <th className="border p-2">Name</th>
            <th className="border p-2">Description</th>
            <th className="border p-2">Price</th>
            <th className="border p-2">Stock</th>
            <th className="border p-2">Category</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>

        {/* <tbody>
          {products.length > 0 ? (
            products.map((product) => (
              <tr key={product.id} className="text-center">
                <td className="border p-2">{product.id}</td>
                <td className="border p-2">{product.name}</td>
                <td className="border p-2">{product.description}</td>
                <td className="border p-2">{product.price}</td>
                <td className="border p-2">{product.stockQuantity}</td>
                <td className="border p-2">{product.category?.name}</td>
                <td className="border p-2">
                  <button
                    onClick={() => navigate(`/admin/editproduct/${product.id}`)}
                    className="bg-green-500 text-white px-3 py-1 rounded mr-1"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() =>
                      navigate(`/admin/deleteproduct/${product.id}`)
                    }
                    className="bg-red-500 text-white px-3 py-1 rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7" className="border p-3 text-center text-gray-600">
                {selectedCategoryId === "ALL"
                  ? "No products found"
                  : "No products for this category"}
              </td>
            </tr>
          )}
        </tbody> */}
        <tbody>
  {products.length > 0 ? (
    products.map((product) => (
      <tr key={product.id} className="text-center">
        <td className="border p-2">{product.id}</td>
        <td className="border p-2">{product.name}</td>
        <td className="border p-2">{product.description}</td>
        <td className="border p-2">{product.price}</td>
        <td className="border p-2">{product.stockQuantity}</td>
        <td className="border p-2">{product.categoryName}</td>
        <td className="border p-2">
          <button
            onClick={() => navigate(`/admin/editproduct/${product.id}`)}
            className="bg-green-500 text-white px-3 py-1 rounded mr-1"
          >
            Edit
          </button>
          <button
            onClick={() =>
              navigate(`/admin/deleteproduct/${product.id}`)
            }
            className="bg-red-500 text-white px-3 py-1 rounded"
          >
            Delete
          </button>
        </td>
      </tr>
    ))
  ) : (
    <tr>
      <td colSpan="7" className="border p-3 text-center text-gray-600">
        No products found
      </td>
    </tr>
  )}
</tbody>

      </table>
    </div>
  );
};

export default Seeproduct;

// import { useEffect, useState } from "react";
// import { getCategories, getProducts, getProductsByCategory } from "../../api/auth";

// const Seeproduct = () => {
//   const [categories, setCategories] = useState([]);
//   const [selectedCategoryId, setSelectedCategoryId] = useState("ALL");
//   const [products, setProducts] = useState([]);
//   const [loading, setLoading] = useState(true);

//   /* Fetch Categories */
//   useEffect(() => {
//     const fetchCategories = async () => {
//       try {
//         const res = await getCategories();
//         setCategories(res);
//       } catch (error) {
//         console.error("Failed to fetch categories", error);
//       }
//     };
//     fetchCategories();
//   }, []);

//   /* Fetch Products on Category Change */
//   useEffect(() => {
//     const fetchProductsData = async () => {
//       setLoading(true);
//       try {
//         let res = [];
//         if (selectedCategoryId === "ALL") {
//           res = await getProducts();
//         } else {
//           res = await getProductsByCategory(selectedCategoryId);
//         }
//         setProducts(res);
//       } catch (error) {
//         console.error("Failed to fetch products", error);
//         setProducts([]);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchProductsData();
//   }, [selectedCategoryId]);

//   return (
//     <div className="p-5">
//       <h2 className="text-xl font-semibold mb-3">Jewelry Products</h2>

//       {/* Category Dropdown */}
//       <select
//         className="p-2 mb-4 border rounded mr-3"
//         value={selectedCategoryId}
//         onChange={(e) => setSelectedCategoryId(e.target.value)}
//       >
//         <option value="ALL">All Categories</option>
//         {categories.map((cat) => (
//           <option key={cat.id} value={cat.id}>
//             {cat.name}
//           </option>
//         ))}
//       </select>

//       {/* Products Table */}
//       <table className="w-full border border-collapse mt-2">
//         <thead>
//           <tr className="bg-gray-100">
//             <th className="border p-2">ID</th>
//             <th className="border p-2">Name</th>
//             <th className="border p-2">Description</th>
//             <th className="border p-2">Price</th>
//             <th className="border p-2">Stock</th>
//             <th className="border p-2">Category</th>
//           </tr>
//         </thead>

//         <tbody>
//           {loading ? (
//             <tr>
//               <td colSpan="6" className="border p-3 text-center">
//                 Loading products...
//               </td>
//             </tr>
//           ) : products.length > 0 ? (
//             products.map((product) => (
//               <tr key={product.id} className="text-center">
//                 <td className="border p-2">{product.id}</td>
//                 <td className="border p-2">{product.name}</td>
//                 <td className="border p-2">{product.description}</td>
//                 <td className="border p-2">{product.price}</td>
//                 <td className="border p-2">{product.stockQuantity}</td>
//                 <td className="border p-2">{product.category?.name}</td>
//               </tr>
//             ))
//           ) : (
//             <tr>
//               <td colSpan="6" className="border p-3 text-center text-gray-600">
//                 No products found
//               </td>
//             </tr>
//           )}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default Seeproduct;
