const initialState = {
  posts: [],
  loading: false,
  error: null,
};

const postReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_POSTS_START':
    case 'CREATE_POST_START':
      return { ...state, loading: true, error: null };

    case 'GET_POSTS_SUCCESS':
      return { ...state, posts: action.payload, loading: false };

    case 'CREATE_POST_SUCCESS':
      return { ...state, posts: [action.payload, ...state.posts], loading: false };

    case 'DELETE_POST_SUCCESS':
      return {
        ...state,
        posts: state.posts.filter((post) => post._id !== action.payload),
      };

    case 'GET_POSTS_FAILURE':
    case 'CREATE_POST_FAILURE':
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
};

export default postReducer;