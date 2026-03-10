import React from "react";
import {FaGem, FaTags, FaShippingFast, FaStar, FaCertificate,} from "react-icons/fa";

const ChooseUs = () => {
  const points = [
    {
      title: "Great Quality",
      icon: <FaGem size={40} />,
      description: "Premium materials & craftsmanship",
    },
    {
      title: "Affordable Prices",
      icon: <FaTags size={40} />,
      description: "Luxury within your budget",
    },
    {
      title: "Wide Availability",
      icon: <FaStar size={40} />,
      description: "Thousands of pieces in stock",
    },
    {
      title: "Exclusive Designs",
      icon: <FaCertificate size={40} />,
      description: "Unique pieces you won't find elsewhere",
    },
    {
      title: "Fast Delivery",
      icon: <FaShippingFast size={40} />,
      description: "Get your jewelry on time",
    },
  ];

  return (
    <section className="py-16 bg-gray-50">
      <h2 className="text-4xl font-bold text-center text-[#330708] fraunce-font">
        Why Choose Us
      </h2>
      <p className="text-gray-500 text-2xl text-center mb-8 fraunce-font-light">
        Your confidence is our signature
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-7 px-6 md:px-11">
        {points.map((point, index) => (
          <div
            key={index}
            className="flex flex-col items-center text-center bg-white rounded-3xl py-7 px-2 shadow-lg hover:shadow-2xl transition-shadow duration-500"
          >
            <div className="text-yellow-500 mb-4">{point.icon}</div>
            <h3 className="text-xl font-semibold mb-2">{point.title}</h3>
            <p className="text-gray-600 text-sm">{point.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ChooseUs;
