import React from "react";
import { Autoplay } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { Movies } from "../../Data/MovieData";

function Banner() {
  const sameClass = "w-full flex-colo xl:h-96 bg-dry lg:h-64 h-48";
  return (
    <div className="relative w-full">
      <Swiper
        direction="vertical"
        slidesPerView={1}
        loop={true}
        speed={1000}
        modules={[Autoplay]}
        autoplay={{ delay: 4000, disableOnInteraction: false }}
        className={sameClass}
      >
        {Movies.slice(0, 6).map((movie, index) => (
          <SwiperSlide key={index} className="relative rounded overflow-hidden">
            <img
              src={`/images/movies/${movie.image}`}
              alt={movie.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute linear-bg xl:pl-52 sm:pl-32 pl-8 top-0 bottom-0 right-0 left-0 flex flex-col justify-center lg:gap-8 md:gap-5 gap-4">
            <h1 className="xl:text-4xl truncate capitalize font-sans sm:text-2xl text-xl font-bold">
              {movie?.name}
              </h1>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default Banner;
