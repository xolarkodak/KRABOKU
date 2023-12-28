import Axios from './Axios';

export const getAllNewsService = async (
  category1,
  time1,
  language1,
  rate1,
  year1,
  search1,
  pageNumber1,
) => {
  const { data } = await Axios.get(
    `/news?category=${category1}&time=${time1}&language=${language1}&rate=${rate1}&year=${year1}&search=${search1}&pageNumber=${pageNumber1}`,
  );
  return data;
};

export const getRandomMoviesService = async () => {
  const { data } = await Axios.get(`/news/random/all`);
  return data;
};

export const getMovieByIdService = async (id) => {
  const { data } = await Axios.get(`/news/${id}`);
  return data;
};

export const getTopRatedMovieService = async () => {
  const { data } = await Axios.get(`/news/rated/top`);
  return data;
};

export const reviewMovieService = async (token, id, review) => {
  const { data } = await Axios.post(`/news/${id}/reviews`, review, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};

export const deleteMovieService = async (token, id) => {
  const { data } = await Axios.delete(`/news/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};

export const deleteAllMoviesService = async (token) => {
  const { data } = await Axios.delete(`/news`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};

export const createMovieService = async (token, movie) => {
  const { data } = await Axios.post(`/news`, movie, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};

export const updateMovieService = async (token, id, movie) => {
  const { data } = await Axios.put(`/news/${id}`, movie, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};
