const initialState = {
  user: null,
  token: localStorage.getItem('token'),
  loading: false,
  error: null,
  isAuthenticated: !!localStorage.getItem('token'),
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'REGISTER_START':
    case 'LOGIN_START':
    case 'GET_USER_START':
      return { ...state, loading: true, error: null };

    case 'REGISTER_SUCCESS':
    case 'LOGIN_SUCCESS':
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
        loading: false,
        isAuthenticated: true,
      };

    case 'GET_USER_SUCCESS':
      return {
        ...state,
        user: action.payload,
        loading: false,
        isAuthenticated: true,
      };

    case 'REGISTER_FAILURE':
    case 'LOGIN_FAILURE':
    case 'GET_USER_FAILURE':
      return { ...state, loading: false, error: action.payload, isAuthenticated: false };

    case 'LOGOUT':
      return { ...initialState, token: null, isAuthenticated: false };

    default:
      return state;
  }
};

export default authReducer;