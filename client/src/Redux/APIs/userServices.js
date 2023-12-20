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
  const { data } = await Axios.put("/users", user, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (data) {
    localStorage.setItem("userInfo", JSON.stringify(data));
  }
  return data;
};

const deleteProfileService = async (token) => {
  const { data } = await Axios.delete("/users", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (data) {
    localStorage.removeItem("userInfo");
  }
  return data;
};

export {
  registerService,
  logoutService,
  loginService,
  updateProfileService,
  deleteProfileService,
};
