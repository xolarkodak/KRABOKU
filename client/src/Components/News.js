import React from "react";
import { Link } from "react-router-dom";
import { FaHeart } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { IfMovieLiked, LikeMovie } from "../Context/Functionalities";

function News({ movie }) {
  const { isLoading } = useSelector((state) => state.userLikeMovie);
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.userLogin);

  const isLiked = IfMovieLiked(movie);
  return (
    <>
      <div className="hover:scale-95 transitions relative rounded-xl overflow-hidden">
        <Link to={`/news/${movie?._id}`} className="w-full">
          <img
            src={movie?.image ? movie?.image : "/images/user.jpg"}
            alt={movie?.name}
            className="h-full h-90 object-cover"
          />
        </Link>
        <div className="absolute flex-btn gap-2 bottom-0 right-0 left-0 bg-main bg-opacity-60 text-white px-4 py-3">
          <h3 className="font-semibold truncate">{movie?.name}</h3>
          
        </div>
      </div>
    </>
  );
}

export default News;
