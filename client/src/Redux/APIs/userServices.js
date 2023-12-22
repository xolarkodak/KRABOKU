import Axios from './Axios';

const registerService = async (user) => {
  const { data } = await Axios.post('/users', user);
  if (data) {
    localStorage.setItem('userInfo', JSON.stringify(data));
  }
  return data;
};

const logoutService = () => {
  localStorage.removeItem('userInfo');
  return null;
};

const loginService = async (user) => {
  const { data } = await Axios.post('/users/login', user);
  if (data) {
    localStorage.setItem('userInfo', JSON.stringify(data));
  }
  return data;
};

const updateProfileService = async (user, token) => {
  const { data } = await Axios.put('/users', user, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (data) {
    localStorage.setItem('userInfo', JSON.stringify(data));
  }
  return data;
};

const deleteProfileService = async (token) => {
  const { data } = await Axios.delete('/users', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (data) {
    localStorage.removeItem('userInfo');
  }
  return data;
};

const changePasswordService = async (passwords, token) => {
  const { data } = await Axios.put('/users/password', passwords, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};

const getFavoriteMovies = async (token) => {
  const { data } = await Axios.get('/users/favorites', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};

const deleteFavoriteMovies = async (token) => {
  const { data } = await Axios.delete('/users/favorites', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};

const getAllUsersService = async (token) => {
  const { data } = await Axios.get('/users', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};

const deleteUserService = async (id, token) => {
  const { data } = await Axios.delete(`/users/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};

const likeMovieService = async (movieId, token) => {
  const { data } = await Axios.post(`/users/favorites`, movieId, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};

export {
  registerService,
  logoutService,
  loginService,
  updateProfileService,
  deleteProfileService,
  changePasswordService,
  getFavoriteMovies,
  deleteFavoriteMovies,
  getAllUsersService,
  deleteUserService,
  likeMovieService,
};
