import React, { useEffect, useState } from "react";
import f from "../assets/f.png";
import { Link } from "react-router-dom";
import axios from "axios";
import API from "../api";

interface searchProp {
  search: string;
  menu: string;
}

interface Rating {
  rate: number;
  count: number;
}

interface ProductDetails {
  category: string;
  description: string;
  id: number;
  image: string;
  price: number;
  title: string;
  rating: Rating;
}

const Home: React.FC<searchProp> = (props) => {
  const [products, setProducts] = useState<ProductDetails[]>([]);
  const [hotDeals, setHotDeals] = useState<number[]>([]);

  const getProducts = async () => {
    try {
      const res =  await API.get("/products");
       // await axios.get("https://fakestoreapi.com/products");
      const data = res.data;

      setProducts(data);

      // Generate 12 random "hot deal" product IDs
      const ids = data.map((p: ProductDetails) => p.id);
      const randomHot = ids.sort(() => 0.5 - Math.random()).slice(0, 12);
      setHotDeals(randomHot);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  //  Filtering Logic
  const filterProducts = () => {
    let filtered = products;

    if (props.menu) {
      const categoryMap: any = {
        electronics: "electronics",
        men: "men's clothing",
        women: "women's clothing",
        jewellery: "jewelery",
      };

      filtered = filtered.filter(
        (p) => p.category === categoryMap[props.menu]
      );
    }

    // Search filtering
    return filtered.filter((product) =>
      product.title.toLowerCase().includes(props.search.toLowerCase())
    );
  };

  const finalProducts = filterProducts();

  return (
    <div className="bg-gray-200 grid grid-cols-5">
      {finalProducts.map((prod) => (
        <Link to={"/detail"} key={prod.id} state={{ prod }}>
          <div className="relative bg-white ml-3 mt-3 w-60 h-[370px] rounded overflow-hidden shadow-lg p-3 flex flex-col">

            {/* HOT DEAL BADGE */}
            {hotDeals.includes(prod.id) && (
              <span className="absolute top-2 left-2 bg-red-600 text-white font-semibold text-xs px-2 py-1 rounded">
                HOT DEAL
              </span>
            )}

            {/* PRODUCT IMAGE — SAME SIZE */}
            <img
              className="w-full h-40 object-contain"
              src={prod.image}
              alt={prod.title}
            />

            {/* TITLE */}
            <h3 className="mt-2 text-sm font-semibold line-clamp-2">
              {prod.title}
            </h3>

            {/* RATING */}
            <div className="flex items-center gap-2 mt-1">
              <span className="bg-green-600 text-white text-xs px-2 py-0.5 rounded-sm">
                {prod.rating.rate} ★
              </span>
              <span className="text-xs text-gray-500">
                ({prod.rating.count})
              </span>
            </div>

            {/* DESCRIPTION */}
            <div className="flex  gap-2 mt-4">
              <span className="font-sans text-sm px-2 py-0.5 rounded-sm line-clamp-2">
                {prod.description} 
              </span>
            </div>


            {/* PRICE */}
            <h1 className="font-semibold text-lg mt-auto">Rs.{prod.price}</h1>

            {/* FREE DELIVERY + LOGO */}
            <div className="flex justify-between">
              <p className="text-xs text-gray-500 mt-4">Free Delivery</p>
              <img src={f} alt="flipkart-logo" className="w-15 h-12" />
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default Home;