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

export { registerService, logoutService, loginService };
