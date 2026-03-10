import React, { useEffect, useState } from "react";
import axiosInstance from "../../api/axiosInstance";
import { deleteProduct,getProducts } from "../../api/auth";

const Deleteproduct = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deletingId, setDeletingId] = useState(null);

  // Fetch products
 
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const items = await getProducts();
        setProducts(items);
      } catch (err) {
        setError("Failed to fetch products.");
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;

    setDeletingId(id);
    try {
      await deleteProduct(id); // ✅ action call
      alert("Product deleted successfully!");
      setProducts((prev) => prev.filter((p) => p.id !== id));
    } catch (err) {
      console.error(err);
      alert("Failed to delete product.");
    } finally {
      setDeletingId(null);
    }
  };


  if (loading) return <p>Loading products...</p>;
  if (error) return <p className="text-red-600">{error}</p>;

  return (
    <div className="p-5">
      <h2 className="text-xl font-semibold mb-4">Delete Products</h2>

      <table className="w-full border border-gray-300 border-collapse mt-5">
        <thead>
          <tr className="bg-gray-100">
            {["ID", "Name","category" ,"Description", "Price ($)", "Stock", "Actions"].map(
              (h) => (
                <th
                  key={h}
                  className="border border-gray-300 p-3 font-bold text-center"
                >
                  {h}
                </th>
              )
            )}
          </tr>
        </thead>

        <tbody>
          {products.map((product) => (
            <tr key={product.id} className="text-center">
              <td className="border border-gray-300 p-3">{product.id}</td>
              <td className="border border-gray-300 p-3">{product.name}</td>
               <td className="border border-gray-300 p-3">
                {product.category?.name || "-"}
              </td>
              <td className="border border-gray-300 p-3">
                {product.description}
              </td>
              <td className="border border-gray-300 p-3">
                {product.price}
              </td>
              <td className="border border-gray-300 p-3">
                {product.stockQuantity}
              </td>
              <td className="border border-gray-300 p-3">
                <button
                  onClick={() => handleDelete(product.id)}
                  disabled={deletingId === product.id}
                  className={`px-3 py-1 rounded text-white ${
                    deletingId === product.id
                      ? "bg-red-300 cursor-not-allowed"
                      : "bg-red-500 hover:bg-red-600"
                  }`}
                >
                  {deletingId === product.id ? "Deleting..." : "Delete"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Deleteproduct;
