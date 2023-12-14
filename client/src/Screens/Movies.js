import React, { useEffect, useMemo, useState } from "react";
import Filters from "../Components/Filters";
import Layout from "../Layout/Layout";
import Movie from "../Components/Movie"
import { Movies } from "../Data/MovieData";
import { CgSpinner } from "react-icons/cg";

function MoviesPage() {
  const maxPage = 10
  const [page, setPage] = React.useState(maxPage)
  const HandleLoadingMore = () => {
    setPage(page + maxPage)
  }

  return (
    <Layout>
      <div className="min-height-screen container mx-auto px-2 my-6">
        <Filters />
        <p className="text-lg font-medium my-6">
          Загалом{" "}
          <span className="font-bold text-subMain">
            {Movies?.length}
          </span>{" "}
        </p>
        <div className="grid sm:mt-10 mt-6 xl:grid-cols-4 2xl:grid-cols-5 lg:grid-cols-3 sm:grid-cols-2 gap-6">
              {Movies.slice(0, page)?.map((movie, index) => (
                <Movie key={index} movie={movie} />
              ))}
            </div>
            <div className="w-full flex-rows gap-6 md:my-20 my-10">
              <button
                onClick={HandleLoadingMore}
                //disabled={page === 1}
                className="text-white py-2 px-4 rounded font-semibold border-2 border-subMain hover:bg-subMain"
              > Завантажити ще <CgSpinner className="animate-spin"></CgSpinner>
               
              </button>
             
            </div>
      </div>
    </Layout>
  );
}

export default MoviesPage;
