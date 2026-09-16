import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

export const getUser = (userId) => async (dispatch) => {
  dispatch({ type: 'GET_USER_START' });
  try {
    const response = await axios.get(`${API_URL}/users/${userId}`);
    dispatch({
      type: 'GET_USER_SUCCESS',
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: 'GET_USER_FAILURE',
      payload: error.response?.data?.message || 'Error fetching user',
    });
  }
};

export const followUser = (userId) => async (dispatch) => {
  const token = localStorage.getItem('token');
  try {
    await axios.post(
      `${API_URL}/users/${userId}/follow`,
      {},
      { headers: { Authorization: `Bearer ${token}` } }
    );
    dispatch({ type: 'FOLLOW_USER_SUCCESS' });
  } catch (error) {
    console.error('Error following user:', error);
  }
};

export const unfollowUser = (userId) => async (dispatch) => {
  const token = localStorage.getItem('token');
  try {
    await axios.post(
      `${API_URL}/users/${userId}/unfollow`,
      {},
      { headers: { Authorization: `Bearer ${token}` } }
    );
    dispatch({ type: 'UNFOLLOW_USER_SUCCESS' });
  } catch (error) {
    console.error('Error unfollowing user:', error);
  }
};