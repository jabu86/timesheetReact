import {
  GET_NOTIFICATIONS,
  NOTIFICATION_ERROR,
  DELETE_NOTIFICATION,
} from "../actions/types";
const initialState = {
  notifications: [],
  loading: true,
  error: {},
};

export default function name(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case GET_NOTIFICATIONS:
      return { ...state, notifications: payload, loading: false };
    case DELETE_NOTIFICATION:
      return {
        ...state,
        notifications: state.notifications.filter(
          (notification) => notification._id !== payload
        ),
        loading: false,
      };
    case NOTIFICATION_ERROR:
      return { ...state, loading: false, error: payload };
    default:
      return state;
  }
}
