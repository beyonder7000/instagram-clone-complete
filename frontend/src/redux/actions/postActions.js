import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

export const getPosts = () => async (dispatch) => {
  dispatch({ type: 'GET_POSTS_START' });
  try {
    const response = await axios.get(`${API_URL}/posts`);
    dispatch({
      type: 'GET_POSTS_SUCCESS',
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: 'GET_POSTS_FAILURE',
      payload: error.response?.data?.message || 'Error fetching posts',
    });
  }
};

export const createPost = (caption, image) => async (dispatch) => {
  const token = localStorage.getItem('token');
  dispatch({ type: 'CREATE_POST_START' });
  try {
    const response = await axios.post(
      `${API_URL}/posts`,
      { caption, image },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    dispatch({
      type: 'CREATE_POST_SUCCESS',
      payload: response.data.post,
    });
  } catch (error) {
    dispatch({
      type: 'CREATE_POST_FAILURE',
      payload: error.response?.data?.message || 'Error creating post',
    });
  }
};

export const deletePost = (postId) => async (dispatch) => {
  const token = localStorage.getItem('token');
  try {
    await axios.delete(`${API_URL}/posts/${postId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    dispatch({
      type: 'DELETE_POST_SUCCESS',
      payload: postId,
    });
  } catch (error) {
    console.error('Error deleting post:', error);
  }
};

export const likePost = (postId) => async (dispatch) => {
  const token = localStorage.getItem('token');
  try {
    await axios.post(
      `${API_URL}/likes/${postId}/like`,
      {},
      { headers: { Authorization: `Bearer ${token}` } }
    );
  } catch (error) {
    console.error('Error liking post:', error);
  }
};

export const unlikePost = (postId) => async (dispatch) => {
  const token = localStorage.getItem('token');
  try {
    await axios.post(
      `${API_URL}/likes/${postId}/unlike`,
      {},
      { headers: { Authorization: `Bearer ${token}` } }
    );
  } catch (error) {
    console.error('Error unliking post:', error);
  }
};