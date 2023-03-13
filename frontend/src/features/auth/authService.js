import axios from "axios";

const API_URL = "http://localhost:8000/api/users/";

// REGISTER USER
const register = async (userData) => {
  const response = await axios.post(API_URL, userData);

  console.log(response.data);

  if (response.data)
    localStorage.setItem("user", JSON.stringify(response.data.user));

  return response.data.user;
};

// LOGIN USER
const login = async (userData) => {
  const response = await axios.post(API_URL + "login", userData);

  console.log(response.data);

  if (response.data)
    localStorage.setItem("user", JSON.stringify(response.data.user));

  return response.data.user;
};

const logout = () => {
  localStorage.removeItem("user");
};

const authService = {
  register,
  logout,
  login,
};

export default authService;
