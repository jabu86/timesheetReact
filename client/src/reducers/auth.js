import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  ACCOUNT_DELETED,
  IMAGE_UPLOAD_SUSSESS,
  IMAGE_UPLOAD_ERROR,
  GET_USERS,
  USERS_ERROR,
  UPDATE_USER_ROLE,
} from "../actions/types";

const initialState = {
  token: localStorage.getItem("token"),
  isAuthenticated: null,
  loading: true,
  users: [],
  user: {},
  error: {},
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case USER_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        user: payload,
        loading: false,
      };
    case GET_USERS:
      return {
        ...state,
        isAuthenticated: true,
        users: payload,
        loading: false,
      };
    case UPDATE_USER_ROLE:
      let index = state.users.findIndex((user) => user._id === payload._id);
      let users = [...state.users];
      users[index] = { ...(users[index] = payload) };
      return {
        ...state,
        users: users,
        isAuthenticated: true,
        loading: false,
      };
    case IMAGE_UPLOAD_SUSSESS:
      return {
        ...state,
        isAuthenticated: true,
        user: (state.user.image = payload.filePath),
        loading: false,
      };
    case REGISTER_SUCCESS:
    case LOGIN_SUCCESS:
      localStorage.setItem("token", payload.token);
      return {
        ...state,
        ...payload,
        isAuthenticated: true,
        loading: false,
      };
    case USERS_ERROR:
      return { ...state, error: payload, loading: false };
    case IMAGE_UPLOAD_ERROR:
      return {
        ...state,
        loading: false,
        error: payload,
      };
    case REGISTER_FAIL:
    case AUTH_ERROR:
    case LOGIN_FAIL:
    case LOGOUT:
    case ACCOUNT_DELETED:
      localStorage.removeItem("token");
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false,
      };
    default:
      return state;
  }
}
