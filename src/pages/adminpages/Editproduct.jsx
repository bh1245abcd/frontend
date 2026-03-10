import React, { useEffect, useState } from "react";
import { updateProduct, getProducts } from "../../api/auth";

const Editproduct = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [updatingId, setUpdatingId] = useState(null);
  const [originalProduct, setOriginalProduct] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const items = await getProducts();
        setProducts(items || []);
      } catch (err) {
        setError("Failed to fetch products.");
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const handleChange = (id, field, value) => {
    setProducts((prev) =>
      prev.map((p) =>
        p.id === id ? { ...p, [field]: value } : p
      )
    );
  };

  const handleEdit = (product) => {
    setEditingId(product.id);
    setOriginalProduct({ ...product });
  };

  const handleCancel = () => {
    setProducts((prev) =>
      prev.map((p) =>
        p.id === originalProduct.id ? originalProduct : p
      )
    );
    setEditingId(null);
    setOriginalProduct(null);
  };

  const handleSave = async (id) => {
    const product = products.find((p) => p.id === id);
    setUpdatingId(id);

    try {
      await updateProduct(id, {
        name: product.name,
        description: product.description,
        price: product.price,
        stockQuantity: product.stockQuantity,
        categoryId: product.category?.id, // ✅ correct payload
      });

      alert("Product updated successfully!");
      setEditingId(null);
      setOriginalProduct(null);
    } catch (err) {
      alert("Failed to update product.");
    } finally {
      setUpdatingId(null);
    }
  };

  if (loading) return <p>Loading products...</p>;
  if (error) return <p className="text-red-600">{error}</p>;

  return (
    <div className="p-5">
      <h2 className="text-xl font-semibold mb-4">Edit Products</h2>

      <table className="w-full border border-gray-300 border-collapse">
        <thead>
          <tr className="bg-gray-100">
            {["ID", "Name", "Category", "Description", "Price", "Stock", "Actions"].map(
              (h) => (
                <th
                  key={h}
                  className="border border-gray-500 p-2 font-bold text-gray-800"
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
              <td className="border p-2">{product.id}</td>

              <td className="border p-2">
                <input
                  value={product.name}
                  disabled={editingId !== product.id}
                  onChange={(e) =>
                    handleChange(product.id, "name", e.target.value)
                  }
                  className="w-full border p-1 rounded"
                />
              </td>

              {/* ✅ CATEGORY DISPLAY */}
              <td className="border p-2">
                <input
                  value={product.category?.name || ""}
                  disabled
                  className="w-full border p-1 rounded bg-gray-100 text-gray-700"
                />
              </td>

              <td className="border p-2">
                <textarea
                  value={product.description}
                  disabled={editingId !== product.id}
                  onChange={(e) =>
                    handleChange(product.id, "description", e.target.value)
                  }
                  className="w-full border p-1 rounded"
                />
              </td>

              <td className="border p-2">
                <input
                  type="number"
                  value={product.price}
                  disabled={editingId !== product.id}
                  onChange={(e) =>
                    handleChange(product.id, "price", e.target.value)
                  }
                  className="w-full border p-1 rounded"
                />
              </td>

              <td className="border p-2">
                <input
                  type="number"
                  value={product.stockQuantity}
                  disabled={editingId !== product.id}
                  onChange={(e) =>
                    handleChange(product.id, "stockQuantity", e.target.value)
                  }
                  className="w-full border p-1 rounded"
                />
              </td>

              <td className="border p-2">
                {editingId === product.id ? (
                  <div className="flex justify-center gap-2">
                    <button
                      onClick={() => handleSave(product.id)}
                      disabled={updatingId === product.id}
                      className="px-3 py-1 bg-green-500 text-white rounded"
                    >
                      {updatingId === product.id ? "Saving..." : "Save"}
                    </button>
                    <button
                      onClick={handleCancel}
                      className="px-3 py-1 bg-gray-400 text-white rounded"
                    >
                      Cancel
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => handleEdit(product)}
                    className="px-3 py-1 bg-blue-500 text-white rounded"
                  >
                    Update
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Editproduct;
