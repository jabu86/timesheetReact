import {
  DELETE_NOTIFICATION,
  GET_NOTIFICATIONS,
  NOTIFICATION_ERROR,
} from "./types";
import axios from "axios";
import {setAlert }from "./alert";
//Get user notifications
export const getNotification = (user_id) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/timecards/notification/${user_id}`);
    dispatch({
      type: GET_NOTIFICATIONS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: NOTIFICATION_ERROR,
      payload: {
        msg: err.response.statusText,
        status: err.response.status,
      },
    });
  }
};

//Get user notifications
export const markAsRead = (id) => async (dispatch) => {
  try {
    const res = await axios.delete(`/api/timecards/notification/${id}`);
    dispatch({
      type: DELETE_NOTIFICATION,
      payload: id,
    });
    setAlert(res.data.msg, "success", 5000);
  } catch (err) {
    dispatch({
      type: NOTIFICATION_ERROR,
      payload: {
        msg: err.response.statusText,
        status: err.response.status,
      },
    });
  }
};
