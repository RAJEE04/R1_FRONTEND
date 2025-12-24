import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const categories = [
  {
    title: "Electronics",
    description:
      "Explore the latest gadgets, devices and cutting-edge technology curated for modern living.",
    icon: "💻",
  },
  {
    title: "Women’s Clothes",
    description:
      "Fashionable, elegant and comfortable clothing designed to match every woman’s style.",
    icon: "👗",
  },
  {
    title: "Men’s Clothes",
    description:
      "Stylish and modern apparel crafted for today’s man, blending comfort and aesthetics.",
    icon: "👔",
  },
  {
    title: "Jewellery",
    description:
      "Timeless, premium and beautifully crafted jewellery pieces for all occasions.",
    icon: "💎",
  },
];


const About: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar setSearch={() => {}} setMenu={() => {}} />
      <h1 className="text-4xl font-bold text-center mb-8 mt-6">About Us</h1>

      <p className="text-center max-w-2xl mx-auto text-gray-600 mb-12">
        We are a trusted marketplace offering a wide range of products across
        multiple categories. Our mission is to deliver high-quality items with
        exceptional service for every customer.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {categories.map((cat, index) => (
          <div
            key={index}
            className="bg-white shadow-md rounded-xl p-6 hover:shadow-xl transition"
          >
            <div className="text-5xl mb-4">{cat.icon}</div>
            <h2 className="text-xl font-semibold mb-2">{cat.title}</h2>
            <p className="text-gray-600 text-sm">{cat.description}</p>
          </div>
        ))}
      </div>
       <Footer />
    </div>
  );
};

export default About;

