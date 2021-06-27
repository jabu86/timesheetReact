import axios from "axios";
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  CLEAR_PROFILE,
  IMAGE_UPLOAD_SUSSESS,
  IMAGE_UPLOAD_ERROR,
  GET_USERS,
  USERS_ERROR,
  UPDATE_USER_ROLE,
} from "./types";
import { setAlert } from "./alert";
import setAuthToken from "../utils/setAuthToken";
//Load User

export const loadUser = () => async (dispatch) => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }
  try {
    const res = await axios.get("/api/auth");
    dispatch({
      type: USER_LOADED,
      payload: res.data,
    });
  } catch (err) {
    dispatch({ type: AUTH_ERROR });
  }
};

//Get User
export const getUsers = () => async (dispatch) => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }
  try {
    const res = await axios.get("/api/users");
    dispatch({
      type: GET_USERS,
      payload: res.data,
    });
  } catch (err) {
    console.log(err);
    dispatch({
      type: USERS_ERROR,
      payload: {
        msg: err.response.statusText,
        status: err.response.status,
      },
    });
  }
};

//Get User
export const updateUserRole = (formData, id) => async (dispatch) => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }
  const config = {
    headers: {
      "Content-Type": "Application/json",
    },
  };
  try {
    const res = await axios.put(
      `/api/users/${id}`,
      JSON.stringify(formData),
      config
    );
    dispatch({
      type: UPDATE_USER_ROLE,
      payload: res.data,
    });
    dispatch(setAlert("Role Assigned Successfull.", "success", 5000));
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((err) => {
        dispatch(setAlert(err.msg, "error", 5000));
      });
    }
    dispatch({
      type: USERS_ERROR,
      payload: {
        msg: err.response.statusText,
        status: err.response.status,
      },
    });
  }
};

//Register user
export const register = ({ name, email, password }) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "Application/json",
    },
  };
  try {
    const body = JSON.stringify({ name, email, password });
    const res = await axios.post("/api/users/", body, config);
    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data,
    });
    dispatch(loadUser());
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "error", 2000)));
    }
    dispatch({
      type: REGISTER_FAIL,
    });
  }
};

//Login user
export const login = ({ email, password }) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "Application/json",
    },
  };
  try {
    const body = JSON.stringify({ email, password });
    const res = await axios.post("/api/users/login", body, config);
    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data,
    });
    dispatch(loadUser());
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "error", 2000)));
    }
    dispatch({
      type: LOGIN_FAIL,
    });
  }
};

//Logout / Clear
export const logout = () => (dispatch) => {
  dispatch({ type: CLEAR_PROFILE });
  dispatch({ type: LOGOUT });
};

//Image Upload
export const imageUpload = (file, _id) => async (dispatch) => {
  const formData = new FormData();
  formData.append("file", file);
  try {
    const res = await axios.post(" /api/profile/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    const { fileName, filePath } = res.data;
    dispatch(setAlert(res.data.msg, "success", 2000));
    dispatch({
      type: IMAGE_UPLOAD_SUSSESS,
      payload:  res.data.user,
    });
  } catch (err) {
    const errors = err.response.data;
    if (errors) {
      dispatch(setAlert(errors.msg, "error", 2000));
    }
    dispatch({
      type: IMAGE_UPLOAD_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
