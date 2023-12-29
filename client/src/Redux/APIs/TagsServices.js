import Axios from './Axios';

const getTagsService = async () => {
  const { data } = await Axios.get('/tags');
  return data;
};

const createTagService = async (title, token) => {
  const { data } = await Axios.post('/tags', title, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};

const deleteTagService = async (id, token) => {
  const { data } = await Axios.delete(`/tags/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};

const updateTagService = async (id, title, token) => {
  const { data } = await Axios.put(`/tags/${id}`, title, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};

export { getTagsService, createTagService, deleteTagService, updateTagService };
