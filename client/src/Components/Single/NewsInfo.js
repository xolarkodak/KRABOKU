import React from 'react';
import { FaShareAlt } from 'react-icons/fa';
import FlexNewsItems from '../FlexNewsItems';
import Rating from '../Stars';

function NewsInfo({ news_, setModalOpen }) {
  return (
    <div className="w-full xl:h-screen relative text-white">
      <img
        src={news_?.image ? news_?.image : '/images/user.jpg'}
        alt={news_?.name}
        className="w-full hidden xl:inline-block h-full object-cover"
      />
      <div className="xl:bg-main bg-dry flex-colo xl:bg-opacity-90 xl:absolute top-0 left-0 right-0 bottom-0">
        <div className="container px-3 mx-auto 2xl:px-32 xl:grid grid-cols-3 flex-colo py-10 lg:py-20 gap-8">
          <div className="xl:col-span-1 w-full xl:order-none order-last h-header bg-dry border border-gray-800 rounded-[30px] overflow-hidden">
            <img
              src={news_?.titleImage ? news_?.titleImage : '/images/user.jpg'}
              alt={news_?.name}
              className="w-full h-full object-cover rounded-[30px]"
            />
          </div>
          <div className="col-span-2 md:grid grid-cols-5 gap-4 items-center">
            <div className="col-span-3 flex flex-col gap-10">
              <h1 className="xl:text-4xl capitalize font-sans text-2xl font-bold">{news_?.name}</h1>
              <div className="flex items-center gap-4 font-medium text-dryGray">
                <FlexNewsItems news_={news_ && news_} />
              </div>
              <p className="text-text text-2sm leading-7">{news_?.desc}</p>
              <div className="grid sm:grid-cols-5 grid-cols-3 gap-4 p-6 bg-main border border-gray-800 rounded-lg">
                <div className="col-span-1 flex-colo border-r border-border">
                  <button
                    onClick={() => setModalOpen(true)}
                    className="w-10 h-10 flex-colo rounded-lg bg-white bg-opacity-20">
                    <FaShareAlt />
                  </button>
                </div>
                <div className="col-span-2 flex-colo font-medium text-[19px]">
                  <p>
                    Мова : <span className="ml-2 truncate">{news_?.language}</span>
                  </p>
                </div>
              </div>
              <div className="flex mb-6 text-lg gap-2 text-star">
                <Rating value={news_?.rate} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default NewsInfo;
