import { combineReducers } from "redux";
import alert from "./alert";
import auth from "./auth";
import profile from "./profile";
import timecard from "./timecard";
import notification from './notifications';

export default combineReducers({
  alert,
  auth,
  profile,
  timecard,
  notification,
});
