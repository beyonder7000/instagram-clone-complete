import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

export const register = (username, email, password) => async (dispatch) => {
  dispatch({ type: 'REGISTER_START' });
  try {
    const response = await axios.post(`${API_URL}/auth/register`, {
      username,
      email,
      password,
    });
    localStorage.setItem('token', response.data.token);
    dispatch({
      type: 'REGISTER_SUCCESS',
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: 'REGISTER_FAILURE',
      payload: error.response?.data?.message || 'Registration failed',
    });
  }
};

export const login = (email, password) => async (dispatch) => {
  dispatch({ type: 'LOGIN_START' });
  try {
    const response = await axios.post(`${API_URL}/auth/login`, {
      email,
      password,
    });
    localStorage.setItem('token', response.data.token);
    dispatch({
      type: 'LOGIN_SUCCESS',
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: 'LOGIN_FAILURE',
      payload: error.response?.data?.message || 'Login failed',
    });
  }
};

export const logout = () => (dispatch) => {
  localStorage.removeItem('token');
  dispatch({ type: 'LOGOUT' });
};

export const getCurrentUser = () => async (dispatch) => {
  const token = localStorage.getItem('token');
  if (!token) return;
  
  dispatch({ type: 'GET_USER_START' });
  try {
    const response = await axios.get(`${API_URL}/auth/me`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    dispatch({
      type: 'GET_USER_SUCCESS',
      payload: response.data,
    });
  } catch (error) {
    dispatch({ type: 'GET_USER_FAILURE' });
  }
};