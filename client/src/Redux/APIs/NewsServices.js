import Axios from './Axios';

export const getAllNewsService = async (
  tag,
  time,
  language,
  rate,
  year,
  search,
  pageNumber,
) => {
  const { data } = await Axios.get(
    `/news?tag=${tag}&time=${time}&language=${language}&rate=${rate}&year=${year}&search=${search}&pageNumber=${pageNumber}`,
  );
  return data;
};

export const getNewsByIdService = async (id) => {
  const { data } = await Axios.get(`/news/${id}`);
  return data;
};

export const reviewNewsService = async (token, id, review) => {
  const { data } = await Axios.post(`/news/${id}/reviews`, review, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};

export const deleteNewsService = async (token, id) => {
  const { data } = await Axios.delete(`/news/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};

export const deleteAllNewsService = async (token) => {
  const { data } = await Axios.delete(`/news`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};

export const createNewsService = async (token, news) => {
  const { data } = await Axios.post(`/news`, news, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};

export const updateNewsService = async (token, id, news) => {
  const { data } = await Axios.put(`/news/${id}`, news, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};
