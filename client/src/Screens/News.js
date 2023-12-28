import React, { useEffect, useMemo, useState } from 'react';
import Filters from '../Components/Filters';
import Layout from '../Layout/Layout';
import News from '../Components/News';
import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import { TbPlayerTrackNext, TbPlayerTrackPrev } from 'react-icons/tb';
import Loader from '../Components/Notfications/Loader';
import { RiMovie2Line } from 'react-icons/ri';
import { getAllNewsAction } from '../Redux/Actions/NewsActions';
import { LanguageData, RatesData, TimesData, YearData } from '../Data/FilterData';
import { useParams } from 'react-router-dom';

function NewsPage() {
  const { search } = useParams();
  const dispatch = useDispatch();
  const [category, setCategory] = useState({ title: 'Всі теги' });
  const [year, setYear] = useState(YearData[0]);
  const [times, setTimes] = useState(TimesData[0]);
  const [rates, setRates] = useState(RatesData[0]);
  const [language, setLanguage] = useState(LanguageData[0]);
  const sameClass =
    'text-white py-2 px-4 rounded font-semibold border-2 border-subMain hover:bg-subMain';

  const { isLoading, isError, news, pages, page } = useSelector((state) => state.getAllNews);

  const { tags } = useSelector((state) => state.tagsGetAll);

  const queries = useMemo(() => {
    const query = {
      category: category?.title === 'Всі категорії' ? '' : category?.title,
      time: times?.title.replace(/\D/g, ''),
      language: language?.title === 'Сортувати за мовою' ? '' : language?.title,
      rate: rates?.title.replace(/\D/g, ''),
      year: year?.title.replace(/\D/g, ''),
      search: search ? search : '',
    };
    return query;
  }, [category, times, language, rates, year, search]);

  useEffect(() => {
    if (isError) {
      toast.error(isError);
    }
    dispatch(getAllNewsAction(queries));
  }, [dispatch, isError, queries]);

  const nextPage = () => {
    dispatch(
      getAllNewsAction({
        ...queries,
        pageNumber: page + 1,
      }),
    );
  };
  const prevPage = () => {
    dispatch(
      getAllNewsAction({
        ...queries,
        pageNumber: page - 1,
      }),
    );
  };

  const datas = {
    tags: tags,
    category: category,
    setCategory: setCategory,
    language: language,
    setLanguage: setLanguage,
    rates: rates,
    setRates: setRates,
    times: times,
    setTimes: setTimes,
    year: year,
    setYear: setYear,
  };

  return (
    <Layout>
      <div className="min-height-screen container mx-auto px-2 my-6">
        <Filters data={datas} />
        <p className="text-lg font-medium my-6">
          Загалом <span className="font-bold text-subMain">{news ? news?.length : 0}</span> новин
          знайдено {search && `for "${search}"`}
        </p>
        {isLoading ? (
          <div className="w-full gap-6 flex-colo min-h-screen">
            <Loader />
          </div>
        ) : news?.length > 0 ? (
          <>
            <div className="grid sm:mt-10 mt-6 xl:grid-cols-4 2xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2 gap-6">
              {news.map((news_, index) => (
                <News key={index} news_={news_} />
              ))}
            </div>
            {/* Loading More */}
            <div className="w-full flex-rows gap-6 md:my-20 my-10">
              <button onClick={prevPage} disabled={page === 1} className={sameClass}>
                <TbPlayerTrackPrev className="text-xl" />
              </button>
              <button onClick={nextPage} disabled={page === pages} className={sameClass}>
                <TbPlayerTrackNext className="text-xl" />
              </button>
            </div>
          </>
        ) : (
          <div className="w-full gap-6 flex-colo min-h-screen">
            <div className="w-24 h-24 p-5 rounded-full mb-4 bg-dry text-subMain text-4xl flex-colo">
              <RiMovie2Line />
            </div>
            <p className="text-border text-sm">Здається, у нас немає жодної новини.</p>
          </div>
        )}
      </div>
    </Layout>
  );
}

export default NewsPage;
