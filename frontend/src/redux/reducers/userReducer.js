const initialState = {
  user: null,
  loading: false,
  error: null,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_USER_START':
      return { ...state, loading: true, error: null };

    case 'GET_USER_SUCCESS':
      return { ...state, user: action.payload, loading: false };

    case 'GET_USER_FAILURE':
      return { ...state, loading: false, error: action.payload };

    case 'FOLLOW_USER_SUCCESS':
    case 'UNFOLLOW_USER_SUCCESS':
      return state;

    default:
      return state;
  }
};

export default userReducer;