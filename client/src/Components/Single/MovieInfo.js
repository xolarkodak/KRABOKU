import React from "react";
import { FaPlay, FaShareAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import FlexMovieItems from "../FlexMovieItems";
import { FiLogIn } from "react-icons/fi";
import Rating from "../Stars";

function MovieInfo({ movie, setModalOpen, DownloadVideo, progress }) {
  return (
    <div className="w-full xl:h-screen relative text-white">
      <img
        src={movie?.image ? movie?.image : "/images/user.jpg"}
        alt={movie?.name}
        className="w-full hidden xl:inline-block h-full object-cover"
      />
      <div className="xl:bg-main bg-dry flex-colo xl:bg-opacity-90 xl:absolute top-0 left-0 right-0 bottom-0">
        <div className="container px-3 mx-auto 2xl:px-32 xl:grid grid-cols-3 flex-colo py-10 lg:py-20 gap-8">
          <div className="xl:col-span-1 w-full xl:order-none order-last h-header bg-dry border border-gray-800 rounded-[30px] overflow-hidden">
            <img
              src={movie?.titleImage ? movie?.titleImage : "/images/user.jpg"}
              alt={movie?.name}
              className="w-full h-full object-cover rounded-[30px]"
            />
          </div>
          <div className="col-span-2 md:grid grid-cols-5 gap-4 items-center">
            <div className="col-span-3 flex flex-col gap-10">
              <h1 className="xl:text-4xl capitalize font-sans text-2xl font-bold">
                {movie?.name}
              </h1>
              <div className="flex items-center gap-4 font-medium text-dryGray">
                <div className="flex-colo bg-subMain text-2xs px-2 py-1">
                  HD 4K
                </div>
                <FlexMovieItems movie={movie && movie} />
              </div>
              <p className="text-text text-2sm leading-7">{movie?.desc}</p>
              <div className="grid sm:grid-cols-5 grid-cols-3 gap-4 p-6 bg-main border border-gray-800 rounded-lg">
                <div className="col-span-1 flex-colo border-r border-border">
                  <button
                    onClick={() => setModalOpen(true)}
                    className="w-10 h-10 flex-colo rounded-lg bg-white bg-opacity-20"
                  >
                    <FaShareAlt />
                  </button>
                </div>
                <div className="col-span-2 flex-colo font-medium text-[19px]">
                  <p>
                    Мова :{" "}
                    <span className="ml-2 truncate">{movie?.language}</span>
                  </p>
                </div>
                <div className="sm:col-span-2 col-span-3 flex justify-end font-medium text-xl">
                  <Link
                    to={`/watch/${movie?._id}`}
                    className="bg-dry py-4 hover:bg-subMain transitions border-2 border-subMain rounded-full flex-rows gap-4 w-full sm:py-3"
                  >
                    <FaPlay className="w-4 h-4" /> Дивитися
                  </Link>
                </div>
              </div>
              <div className="flex mb-6 text-lg gap-2 text-star">
                <Rating value={movie?.rate} />
              </div>
            </div>
            <div className="col-span-2 md:mt-0 mt-2 flex justify-end">
              <button
                disabled={progress}
                onClick={() => DownloadVideo(movie?.video, movie?.name)}
                className="md:w-1/4 w-full relative flex-colo bg-subMain hover:bg-transparent border-2 border-subMain transitions md:h-64 h-20 rounded-[20px] font-medium"
              >
                <div className="flex-rows gap-6 text-xl uppercase tracking-widest absolute md:rotate-90 ">
                  Завантажити <FiLogIn className="w-8 h-8" />
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default MovieInfo;
