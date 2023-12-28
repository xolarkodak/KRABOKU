import React from 'react';
import { Link } from 'react-router-dom';

function News({ news_ }) {
  return (
    <>
      <div className="hover:scale-95 transitions relative rounded-xl overflow-hidden">
        <Link to={`/news/${news_?._id}`} className="w-full">
          <img
            src={news_?.image ? news_?.image : '/images/user.jpg'}
            alt={news_?.name}
            className="h-full h-90 object-cover"
          />
        </Link>
        <div className="absolute flex-btn gap-2 bottom-0 right-0 left-0 bg-main bg-opacity-60 text-white px-4 py-3">
          <h3 className="font-semibold truncate">{news_?.name}</h3>
        </div>
      </div>
    </>
  );
}

export default News;
