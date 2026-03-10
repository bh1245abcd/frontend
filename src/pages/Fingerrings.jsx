import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProductsByCategory } from "../api/auth";
import ProductGrid from "../reusable/productgrid";

import firstp from "../assets/menpone.webp";
import secondp from "../assets/menptwo.webp";
import thirdp from "../assets/menpthree.webp";
import fourthp from "../assets/menpfour.webp";
import fifthp from "../assets/menpfive.webp";
import sixthp from "../assets/menpsix.webp";

const Fingerrings = () => {
  const { categoryId } = useParams(); // 🔥 dynamic category
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const images = [
    firstp,
    secondp,
    thirdp,
    fourthp,
    fifthp,
    sixthp,
  ];

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getProductsByCategory(categoryId);

        const mappedProducts = (data || []).map((item, index) => ({
          id: item.id,
          name: item.productName,
          price: `₹${item.price}`,
          image: images[index % images.length],
        }));

        setProducts(mappedProducts);
      } catch (error) {
        console.error("API Error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [categoryId]);

  if (loading) return <div className="mt-20 text-center">Loading...</div>;

  return (
    <ProductGrid
      title="Kids's Collection"
      products={products}   // ✅ API DATA PASSED HERE
    />
  );
};

export default Fingerrings;
