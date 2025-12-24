import React, { useEffect, useState } from "react";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination, Navigation, Autoplay } from "swiper/modules";
import { Link } from "react-router-dom";
import API from "../api";

interface Rating {
  rate: number;
  count: number;
}

interface Product {
  id: number;
  title: string;
  price: number;
  image: string;
  description: string;
  category: string;
  rating: Rating;
}

const ProductBanner: React.FC = () => {
  const [banners, setBanners] = useState<Product[]>([]);

  const fetchProducts = async () => {
    const res = await API.get("/products");
    const data = res.data;

    // Pick 5 random products for banners
    const random5 = data.sort(() => 0.5 - Math.random()).slice(0, 5);

    setBanners(random5);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="w-full px-4">
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        pagination={{ clickable: true }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="rounded-xl shadow-xs mt-5"
      >
        {banners.map((prod) => (
          <SwiperSlide key={prod.id}>
            <Link to="/detail" state={{ prod }}>
              <div className="h-[300px] bg-white flex rounded-xl overflow-hidden">

                {/* PRODUCT IMAGE */}
                <div className="w-1/2 flex items-center justify-center bg-gray-50">
                  <img
                    src={prod.image}
                    alt={prod.title}
                    className="w-[300px] h-[300px] object-contain"
                  />
                </div>

                {/* PRODUCT INFO */}
                <div className="w-1/2 p-10 flex flex-col justify-center">
                  <h1 className="text-3xl font-bold mb-4">{prod.title}</h1>
                  <p className="text-gray-600 mb-4 line-clamp-3">
                    {prod.description}
                  </p>
                  <p className="text-4xl font-bold text-green-700">
                    Rs.{prod.price}
                  </p>

                  <button className="mt-6 px-6 py-3 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 w-40">
                    Shop Now →
                  </button>
                </div>

              </div>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default ProductBanner;
