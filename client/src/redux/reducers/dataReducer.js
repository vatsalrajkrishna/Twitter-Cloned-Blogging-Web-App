import {
  SET_POSTS,
  LIKE_POST,
  UNLIKE_POST,
  LOADING_DATA,
  POST_POST,
  DELETE_POST,
  SET_POST,
  SUBMIT_COMMENT
} from '../types';

const initialState = {
  posts: [],
  post: {},
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case LOADING_DATA:
      return {
        ...state,
        loading: true
      };
    case SET_POSTS:
      return {
        ...state,
        posts: action.payload,
        loading: false
      };
    case SET_POST:
      return{
        ...state,
        post: action.payload
      };
    case LIKE_POST:
    case UNLIKE_POST:
      let index = state.posts.findIndex(
        (post) => post.postId === action.payload.postId
      );
      state.posts[index] = action.payload;
      if(state.post.postId === action.payload.postId){
        state.post = { ...state.post, ...action.payload };
      }
      return {
        ...state
      };
    case DELETE_POST:
      let delindex= state.posts.findIndex(
        (post) => post.postId === action.payload
      );
      state.posts.splice(delindex, 1);
      return{
        ...state
      };
    case POST_POST:
      return {
        ...state,
        posts:[
          action.payload,
          ...state.posts
        ]
      };
      case SUBMIT_COMMENT:
        let commentedOnIndex = state.posts.findIndex(
          post => post.postId === action.payload.postId
        );
        return {
          ...state,
          post: {
            ...state.post,
            comments: [action.payload, ...state.post.comments],
            commentCount: state.post.commentCount + 1
          },
          posts: state.posts.map((post, postsArrIndex) =>
            postsArrIndex === commentedOnIndex
              ? { ...post, commentCount: post.commentCount + 1 }
              : post
          )
        };
    default:
      return state;
  }
}