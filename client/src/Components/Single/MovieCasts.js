import React from "react";
import { FaUserFriends } from "react-icons/fa";
import { Autoplay } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import Titles from "../Titles";

function MovieCasts({ movie }) {
  return (
    movie?.casts?.length > 0 && (
      <div className="my-12">
        <Titles title="Актори" Icon={FaUserFriends} />
        <div className="mt-10">
          <Swiper
            autoplay={{
              delay: 1000,
              disableOnInteraction: false,
            }}
            speed={1000}
            modules={[Autoplay]}
            spaceBetween={10}
            breakpoints={{
              0: {
                slidesPerView: 1,
              },
              400: {
                slidesPerView: 2,
              },
              768: {
                slidesPerView: 3,
              },
              1024: {
                slidesPerView: 4,
              },
              1280: {
                slidesPerView: 5,
                spaceBetween: 30,
              },
            }}
          >
            {movie?.casts?.map((cast) => (
              <SwiperSlide key={cast?._id}>
                <div className="h-full p-3 italic text-3xs text-text rounded-[40px] flex-colo bg-dry border border-gray-800">
                  <img
                    src={cast?.image ? cast?.image : "/images/user.jpg"}
                    alt={cast?.name}
                    className="w-128 object-cover rounded-[30px] mb-4"
                  />
                  <p>{cast?.name}</p>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    )
  );
}

export default MovieCasts;
