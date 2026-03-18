import Swal from "sweetalert2";

import men from "../assets/men.webp";
import women from "../assets/women.jpg";
import kids from "../assets/kids.webp";

const Categories = () => {

  const categories = [
    { name: "Men", image: men },
    { name: "Women", image: women },
    { name: "Kids", image: kids },
  ];

  const handleComingSoon = () => {
    Swal.fire({
      icon: "info",
      text: "This category will be available soon!",
      confirmButtonColor: "#b45309",
    });
  };

  return (
    <section className="py-16 bg-gray-50">
      <h2 className="text-4xl font-bold text-center text-[#330000] fraunce-font">
        Curated For You
      </h2>

      <p className="text-gray-500 text-2xl text-center mb-8 fraunce-font-light">
        Shop by Category
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 px-6 md:px-11">
        {categories.map((cat, index) => (
          <div
            key={index}
            onClick={handleComingSoon}   // 🔥 yaha lagao
            className="relative group rounded-3xl overflow-hidden shadow-2xl cursor-pointer hover:scale-105 transition-transform duration-500"
          >
            <img
              src={cat.image}
              alt={cat.name}
              className="w-full h-72 object-cover group-hover:scale-110 transition-transform duration-500"
            />

            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-500"></div>

            <h3 className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white text-2xl font-semibold tracking-wide">
              {cat.name}
            </h3>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Categories;