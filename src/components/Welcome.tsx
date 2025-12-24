import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/autoplay";

import slide1 from "../assets/banner1.jpg";
import slide2 from "../assets/banner2.jpg";
import slide3 from "../assets/banner3.jpg";

export default function BannerCarousel() {
  return (
    <Swiper
      modules={[Navigation, Pagination, Autoplay]}
      navigation
      pagination={{ clickable: true }}
      autoplay={{ delay: 4500 }}
      loop
      className="w-full h-[340px]"
    >
      <SwiperSlide>
        <img src={slide1} className="w-full h-full object-cover" />
      </SwiperSlide>

      <SwiperSlide>
        <img src={slide2} className="w-full h-full object-cover" />
      </SwiperSlide>

      <SwiperSlide>
        <img src={slide3} className="w-full h-full object-cover" />
      </SwiperSlide>
    </Swiper>
  );
}
