import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { Filter } from "lucide-react";
import { X } from "lucide-react";
import {
  getProductsByCategory,
  getPublicsubCategories,
  getProductsBySubCategory,
  getPublicCategories,
} from "../api/auth";
import earptwo from "../assets/earptwo.webp";

const ProductGrid = () => {
  const { categoryId, subId } = useParams();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [categoryName, setCategoryName] = useState("");
  const [subName, setSubName] = useState("");
  const [sortoption, setsortoption] = useState("default");
  const [filters, setfilters] = useState(false)
  const [pricefilter, setpricefiter] = useState(false)

  /* 🔹 Normalize products (IMPORTANT) */
  const normalizeProducts = (data) => {
    // ❗ If nothing returned
    if (!data) return [];

    // Category API → { products: [] }
    if (Array.isArray(data.products)) {
      return data.products.map((item) => ({
        ...item,
        productName: item.name,
      }));
    }

    // Subcategory API → []
    if (Array.isArray(data)) {
      return data.map((item) => ({
        ...item,
        productName: item.productName || item.name,
      }));
    }

    return [];
  };

  /* 🔹 Fetch products */
  useEffect(() => {
    setLoading(true);

    const fetchProducts = async () => {
      try {
        let response;

        if (subId) {
          response = await getProductsBySubCategory(categoryId, subId);
          setProducts(normalizeProducts(response));
        } else {
          response = await getProductsByCategory(categoryId);
          setProducts(normalizeProducts(response));
        }
      } catch (err) {
        console.error(err);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [categoryId, subId]);

  /* 🔹 Fetch category name */
  useEffect(() => {
    getPublicCategories().then((cats) => {
      const found = cats.find((c) => c.id === Number(categoryId));
      if (found) setCategoryName(found.name);
    });
  }, [categoryId]);

  /* 🔹 Fetch subcategory name */
  useEffect(() => {
    if (!subId) return;

    getPublicsubCategories(categoryId).then((subs) => {
      const found = subs.find((s) => s.id === Number(subId));
      if (found) setSubName(found.name);
    });
  }, [categoryId, subId]);

  /* 🔹 Page title */
  const title = subId ? subName : categoryName;

  /* 🔹 Sorting */
  const displayedProducts = (() => {
    if (sortoption === "default") return products;

    const sorted = [...products];

    if (sortoption === "lowtohigh") {
      sorted.sort((a, b) => Number(a.price) - Number(b.price));
    }

    if (sortoption === "hightolow") {
      sorted.sort((a, b) => Number(b.price) - Number(a.price));
    }

    if (sortoption === "newest") {
      sorted.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );
    }

    return sorted;
  })();

  return (
    <div className="bg-white min-h-screen py-10 px-6 md:px-16 mt-38 md:mt-20">
      <h1 className="text-2xl font-bold mb-6">{title}</h1>

      {/* Top Bar */}
      <div className="flex flex-wrap justify-between items-center border-b pb-4 mb-10">
        {/* <div className="flex items-center gap-3 text-gray-700 font-medium border rounded-lg px-2 py-1" onClick={() => setfilters(true)}>
          <Filter className="w-5 h-5 text-amber-700" />
          <span>Filters</span>
        </div> */}

        <div className="text-gray-600">
          Showing <span className="font-semibold">{products.length}</span> Products
        </div>

        <select
          value={sortoption}
          onChange={(e) => setsortoption(e.target.value)}
          className="border rounded-lg px-2 py-1 text-sm"
        >
          <option value="default">Sort by: Featured</option>
          <option value="lowtohigh">Price: Low to High</option>
          <option value="hightolow">Price: High to Low</option>
          <option value="newest">Newest</option>
        </select>
      </div>

      {/* Product Grid */}
      {loading ? (
        <p className="text-center text-gray-500">Loading products...</p>
      ) : products.length === 0 ? (
        <p className="text-center text-gray-500 mt-20">
          No products available.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
          {displayedProducts.map((item) => (
            <div
              key={item.id}
              className="group shadow-md hover:shadow-xl rounded-2xl overflow-hidden bg-gray-50"
            >
              <Link to={`/product/${item.id}`} state={{ product: item }}>
                <img
                  src={earptwo}
                  alt={item.productName}
                  className="w-full h-80 object-cover group-hover:scale-105 transition"
                />
              </Link>

              <div className="p-4 text-center">
                <h3 className="font-semibold text-lg">
                  {item.productName}
                </h3>
                <p className="text-amber-700 font-medium">
                  ₹{item.price}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}

      {filters && (<>
        <div className="fixed top-0 left-0 h-full w-72 bg-white z-50 shadow-xl p-6">

          <div className="flex items-center justify-between">
            <p className="flex-1 text-center font-bold">Filter by</p>
            <X
              className="w-6 h-6 cursor-pointer text-gray-600 hover:text-black"
              onClick={() => setfilters(false)}
            />
          </div>

          <div className="mb-6">
            <h3
              className="font-medium mb-2 cursor-pointer flex justify-between items-center mt-4"
              onClick={() => setpricefiter(!pricefilter)}
            >
              Price
              <span>{pricefilter ? "−" : "+"}</span>
            </h3>

            {pricefilter && (
              <div className="flex flex-col gap-2 text-sm mt-2">
                <label><input type="checkbox" /> Under ₹10000</label>
                <label><input type="checkbox" /> ₹20000 - ₹30000</label>
                <label><input type="checkbox" /> Above ₹35000</label>
              </div>
            )}
          </div>

          <div className="mb-6">
            <h3 className="font-medium mb-2">jwellery type</h3>
            <div className="flex flex-col gap-2 text-sm">
              <label><input type="checkbox" />Gold jwellery</label>
              <label><input type="checkbox" />Diamond jwellery</label>
            </div>
          </div>

          <div className="mb-6">
            <h3 className="font-medium mb-2">Product type</h3>
            <div className="flex flex-col gap-2 text-sm">
              <label><input type="checkbox" />Bracelet</label>
              <label><input type="checkbox" />Earings</label>
            </div>
          </div>

          <button>Apply filter</button>
          <button>Show Result</button>
        </div>
      </>)}
    </div>
  );
};

export default ProductGrid;
