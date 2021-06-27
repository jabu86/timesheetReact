//Get Timecards
import axios from "axios";
import { setAlert } from "./alert";
import {
  CREATE_TIMECARD_SUCCESS,
  GET_TIMECARD,
  GET_TIMECARDS,
  GET_TIMECARD_REQUEST,
  TIMECARD_ERROR,
  GET_TIMECARDS_REQUEST,
  TIMECARDS_ERROR,
  CREATE_TIMECARD_HOURS,
  UPDATE_TIMECARD,
  CREATE_TIMECARD_TUESDAY_HOURS,
  CREATE_TIMECARD_WENDSDAY_HOURS,
  CREATE_TIMECARD_THURSDAY_HOURS,
  CREATE_TIMECARD_FRIDAY_HOURS,
  CREATE_TIMECARD_SATARDAY_HOURS,
  CREATE_TIMECARD_SUNDAY_HOURS,
  DELETE_MONDAY_TIMECARD_HOURS,
  DELETE_TUESDAY_TIMECARD_HOURS,
  DELETE_WENDSDAY_TIMECARD_HOURS,
  DELETE_THURSDAY_TIMECARD_HOURS,
  DELETE_FRIDAY_TIMECARD_HOURS,
  DELETE_SATARDAY_TIMECARD_HOURS,
  DELETE_SUNDAY_TIMECARD_HOURS,
  DELETE_TIMECARD,
  SEARCH_TIMECARD,
  ORDER_TIMECARD,
  APPROVE_TIMECARD,
} from "./types";

//Get timecards
export const getTimecards = () => async (dispatch) => {
  dispatch({ type: GET_TIMECARDS_REQUEST });
  try {
    const res = await axios.get("/api/timecards");
    dispatch({
      type: GET_TIMECARDS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: TIMECARDS_ERROR,
      payload:
        err.response && err.response.data.msg
          ? err.response.data.msg
          : err.response.data,
    });
  }
};

//Get user timecards
export const getUserTimecards = (user_id) => async (dispatch) => {
  dispatch({ type: GET_TIMECARDS_REQUEST });
  try {
    const res = await axios.get(`/api/timecards/user/${user_id}`);
    dispatch({
      type: GET_TIMECARDS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: TIMECARDS_ERROR,
      payload:
        err.response && err.response.data.msg
          ? err.response.data.msg
          : err.response.data,
    });
  }
};

//Get SINGLE timecard
export const getTimecard = (id) => async (dispatch) => {
  dispatch({ type: GET_TIMECARD_REQUEST, payload: id });
  try {
    const { data } = await axios.get(`/api/timecards/${id}`);
    dispatch({
      type: GET_TIMECARD,
      payload: data,
    });
  } catch (err) {
    dispatch(setAlert(err.response.data.msg, "error", 5000));
    dispatch({
      type: TIMECARD_ERROR,
      payload:
        err.response && err.response.data.msg
          ? err.response.data.msg
          : err.response.data,
    });
  }
};
//Search Timecard
export const searchTimecard = (text) => async (dispatch, getState) => {
  const timecards = getState().timecardList.timecards;
  let filterValues = timecards.filter((timecard) => {
    return (
      timecard.company.toLowerCase().includes(text.toLowerCase()) ||
      timecard.project.toLowerCase().includes(text.toLowerCase()) ||
      timecard.description.toLowerCase().includes(text.toLowerCase()) ||
      timecard.name.toLowerCase().includes(text.toLowerCase()) ||
      timecard.user.name.toLowerCase().includes(text.toLowerCase())
    );
  });
  dispatch({ type: SEARCH_TIMECARD, payload: filterValues });
};

export const orderTimecard = (sort) => async (dispatch, getState) => {
  const timecards = getState().timecardList.timecards;
  if (sort !== "") {
    timecards.sort((a, b) =>
      sort === "latest"
        ? a.createdAt < b.createdAt
          ? 1
          : -1
        : a.createdAt > b.createdAt
        ? 1
        : -1
    );
  } else {
    timecards.sort((a, b) => (a._id < b._id ? 1 : -1));
  }
  return dispatch({
    type: ORDER_TIMECARD,
    payload: { sort: sort, timecards: timecards },
  });
};

//Create new timecard
export const addTimecard = (formData) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const res = await axios.post("/api/timecards", formData, config);
    dispatch({
      type: CREATE_TIMECARD_SUCCESS,
      payload: res.data,
    });
    dispatch(setAlert("Timecard Added", "success"));
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((err) => {
        dispatch(setAlert(err.msg, "error", 5000));
      });
    }
  }
};

//Approve timecard
export const approveTimecard = (status, id, total) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const body = JSON.stringify({ status, total });
    const res = await axios.put(`/api/timecards/approve/${id}`, body, config);
    dispatch({
      type: APPROVE_TIMECARD,
      payload: res.data,
    });
    dispatch(setAlert("Timecard Approved", "success"));
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((err) => {
        dispatch(setAlert(err.msg, "error", 5000));
      });
    }
  }
};

//Create new timecard
export const updateTimecard = (id, formData) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const res = await axios.put(`/api/timecards/${id}`, formData, config);
    dispatch({
      type: UPDATE_TIMECARD,
      payload: res.data,
    });
    dispatch(setAlert("Timecard Edited", "success"));
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((err) => {
        dispatch(setAlert(err.msg, "error", 5000));
      });
    }
    if (err.response.data.msg) {
      dispatch(setAlert(err.response.data.msg, "error", 5000));
    }
  }
};

//Delete sunday task timecard
export const deleteTimecard = (id) => async (dispatch) => {
  try {
    await axios.delete(`/api/timecards/${id}`);
    dispatch({
      type: DELETE_TIMECARD,
      payload: id,
    });
    dispatch(setAlert(`Timcard removed`, "success", 5000));
  } catch (err) {
    if (err.response.data.msg) {
      dispatch(setAlert(err.response.data.msg, "error", 5000));
    }
    dispatch({
      type: TIMECARDS_ERROR,
      payload: {
        msg: err.response.statusText,
        status: err.response.status,
      },
    });
  }
};

//Weekly timecards eg monday, tuesday
//Create new monday timecard
export const addTimecardMonday = (id, formData) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const res = await axios.post(`/api/monday/${id}`, formData, config);
    dispatch({
      type: CREATE_TIMECARD_HOURS,
      payload: res.data,
    });
    dispatch(setAlert("Success", "success"));
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((err) => {
        dispatch(setAlert(err.msg, "error", 5000));
      });
    }
    if (err.response.data.msg) {
      dispatch(setAlert(err.response.data.msg, "error", 5000));
    }
   
  }
};

//Create new tuesday timecard
export const addTimecardTuesday = (id, formData) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const res = await axios.post(`/api/tuesday/${id}`, formData, config);
    dispatch({
      type: CREATE_TIMECARD_TUESDAY_HOURS,
      payload: res.data,
    });
    dispatch(setAlert("Success", "success"));
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((err) => {
        dispatch(setAlert(err.msg, "error", 5000));
      });
    }
    if (err.response.data.msg) {
      dispatch(setAlert(err.response.data.msg, "error", 5000));
    }
  }
};

//Create new wendsday timecard
export const addTimecardWendssday = (id, formData) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const res = await axios.post(`/api/wendsday/${id}`, formData, config);
    dispatch({
      type: CREATE_TIMECARD_WENDSDAY_HOURS,
      payload: res.data,
    });
    dispatch(setAlert("Success", "success"));
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((err) => {
        dispatch(setAlert(err.msg, "error", 5000));
      });
    }
    if (err.response.data.msg) {
      dispatch(setAlert(err.response.data.msg, "error", 5000));
    }
  }
};

//Create new thursday timecard
export const addTimecardThursday = (id, formData) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const res = await axios.post(`/api/thursday/${id}`, formData, config);
    dispatch({
      type: CREATE_TIMECARD_THURSDAY_HOURS,
      payload: res.data,
    });
    dispatch(setAlert("Success", "success"));
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((err) => {
        dispatch(setAlert(err.msg, "error", 5000));
      });
    }
    if (err.response.data.msg) {
      dispatch(setAlert(err.response.data.msg, "error", 5000));
    }
    dispatch({
      type: TIMECARDS_ERROR,
      payload: {
        msg: err.response.statusText,
        status: err.response.status,
      },
    });
  }
};

//Create new thursday timecard
export const addTimecardFriday = (id, formData) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const res = await axios.post(`/api/friday/${id}`, formData, config);
    dispatch({
      type: CREATE_TIMECARD_FRIDAY_HOURS,
      payload: res.data,
    });
    dispatch(setAlert("Success", "success"));
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((err) => {
        dispatch(setAlert(err.msg, "error", 5000));
      });
    }
    if (err.response.data.msg) {
      dispatch(setAlert(err.response.data.msg, "error", 5000));
    }
    dispatch({
      type: TIMECARDS_ERROR,
      payload: {
        msg: err.response.statusText,
        status: err.response.status,
      },
    });
  }
};
//Create new satarday timecard
export const addTimecardSatarday = (id, formData) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const res = await axios.post(`/api/satarday/${id}`, formData, config);
    dispatch({
      type: CREATE_TIMECARD_SATARDAY_HOURS,
      payload: res.data,
    });
    dispatch(setAlert("Success", "success"));
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((err) => {
        dispatch(setAlert(err.msg, "error", 5000));
      });
    }
    if (err.response.data.msg) {
      dispatch(setAlert(err.response.data.msg, "error", 5000));
    }
    dispatch({
      type: TIMECARDS_ERROR,
      payload: {
        msg: err.response.statusText,
        status: err.response.status,
      },
    });
  }
};

//Create new sunday timecard
export const addTimecardSunday = (id, formData) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const res = await axios.post(`/api/sunday/${id}`, formData, config);
    dispatch({
      type: CREATE_TIMECARD_SUNDAY_HOURS,
      payload: res.data,
    });
    dispatch(setAlert("Success", "success"));
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((err) => {
        dispatch(setAlert(err.msg, "error", 5000));
      });
    }
    if (err.response.data.msg) {
      dispatch(setAlert(err.response.data.msg, "error", 5000));
    }
    dispatch({
      type: TIMECARDS_ERROR,
      payload: {
        msg: err.response.statusText,
        status: err.response.status,
      },
    });
  }
};

//Delete monday task timecard
export const deleteMondayTimecard = (timecard_id, id) => async (dispatch) => {
  try {
    await axios.delete(`/api/monday/${timecard_id}/${id}`);
    dispatch({
      type: DELETE_MONDAY_TIMECARD_HOURS,
      payload: id,
    });
    dispatch(setAlert("Monday Removed", "success", 5000));
  } catch (err) {
    if (err.response.data.msg) {
      dispatch(setAlert(err.response.data.msg, "error", 5000));
    }
    dispatch({
      type: TIMECARDS_ERROR,
      payload: {
        msg: err.response.statusText,
        status: err.response.status,
      },
    });
  }
};

//Delete monday task timecard
export const deleteTuesdayTimecard = (timecard_id, id) => async (dispatch) => {
  try {
    await axios.delete(`/api/tuesday/${timecard_id}/${id}`);
    dispatch({
      type: DELETE_TUESDAY_TIMECARD_HOURS,
      payload: id,
    });
    dispatch(setAlert("Tuesday Removed", "success", 5000));
  } catch (err) {
    if (err.response.data.msg) {
      dispatch(setAlert(err.response.data.msg, "error", 5000));
    }
    if (err.response.data.msg) {
      dispatch(setAlert(err.response.data.msg, "error", 5000));
    }
    dispatch({
      type: TIMECARDS_ERROR,
      payload: {
        msg: err.response.statusText,
        status: err.response.status,
      },
    });
  }
};

//Delete monday task timecard
export const deleteWendsdayTimecard = (timecard_id, id) => async (dispatch) => {
  try {
    await axios.delete(`/api/wendsday/${timecard_id}/${id}`);
    dispatch({
      type: DELETE_WENDSDAY_TIMECARD_HOURS,
      payload: id,
    });
    dispatch(setAlert("Wendsday Removed", "success", 5000));
  } catch (err) {
    if (err.response.data.msg) {
      dispatch(setAlert(err.response.data.msg, "error", 5000));
    }
    if (err.response.data.msg) {
      dispatch(setAlert(err.response.data.msg, "error", 5000));
    }
    dispatch({
      type: TIMECARDS_ERROR,
      payload: {
        msg: err.response.statusText,
        status: err.response.status,
      },
    });
  }
};

//Delete thursday task timecard
export const deleteThursdayTimecard = (timecard_id, id) => async (dispatch) => {
  try {
    await axios.delete(`/api/thursday/${timecard_id}/${id}`);
    dispatch({
      type: DELETE_THURSDAY_TIMECARD_HOURS,
      payload: id,
    });
    dispatch(setAlert("Thursday Removed", "success", 5000));
  } catch (err) {
    if (err.response.data.msg) {
      dispatch(setAlert(err.response.data.msg, "error", 5000));
    }
    if (err.response.data.msg) {
      dispatch(setAlert(err.response.data.msg, "error", 5000));
    }
    dispatch({
      type: TIMECARDS_ERROR,
      payload: {
        msg: err.response.statusText,
        status: err.response.status,
      },
    });
  }
};

//Delete friday task timecard
export const deleteFridayTimecard = (timecard_id, id) => async (dispatch) => {
  try {
    await axios.delete(`/api/friday/${timecard_id}/${id}`);
    dispatch({
      type: DELETE_FRIDAY_TIMECARD_HOURS,
      payload: id,
    });
    dispatch(setAlert("Friday Removed", "success", 5000));
  } catch (err) {
    if (err.response.data.msg) {
      dispatch(setAlert(err.response.data.msg, "error", 5000));
    }
    if (err.response.data.msg) {
      dispatch(setAlert(err.response.data.msg, "error", 5000));
    }
    dispatch({
      type: TIMECARDS_ERROR,
      payload: {
        msg: err.response.statusText,
        status: err.response.status,
      },
    });
  }
};

//Delete satarday task timecard
export const deleteSatardayTimecard = (timecard_id, id) => async (dispatch) => {
  try {
    await axios.delete(`/api/satarday/${timecard_id}/${id}`);
    dispatch({
      type: DELETE_SATARDAY_TIMECARD_HOURS,
      payload: id,
    });
    dispatch(setAlert("Satarday Removed", "success", 5000));
  } catch (err) {
    if (err.response.data.msg) {
      dispatch(setAlert(err.response.data.msg, "error", 5000));
    }
    if (err.response.data.msg) {
      dispatch(setAlert(err.response.data.msg, "error", 5000));
    }
    dispatch({
      type: TIMECARDS_ERROR,
      payload: {
        msg: err.response.statusText,
        status: err.response.status,
      },
    });
  }
};

//Delete sunday task timecard
export const deleteSundayTimecard = (timecard_id, id) => async (dispatch) => {
  try {
    await axios.delete(`/api/sunday/${timecard_id}/${id}`);
    dispatch({
      type: DELETE_SUNDAY_TIMECARD_HOURS,
      payload: id,
    });
    dispatch(setAlert("Sunday Removed", "success", 5000));
  } catch (err) {
    if (err.response.data.msg) {
      dispatch(setAlert(err.response.data.msg, "error", 5000));
    }
    if (err.response.data.msg) {
      dispatch(setAlert(err.response.data.msg, "error", 5000));
    }
    dispatch({
      type: TIMECARDS_ERROR,
      payload: {
        msg: err.response.statusText,
        status: err.response.status,
      },
    });
  }
};

//Count Monday Hours
