import {
  GET_TIMECARDS_REQUEST,
  GET_TIMECARDS,
  TIMECARDS_ERROR,
  GET_TIMECARD,
  GET_TIMECARD_REQUEST,
  TIMECARD_ERROR,
  APPROVE_TIMECARD,
  CREATE_TIMECARD_SUCCESS,
  CREATE_TIMECARD_ERROR,
  DELETE_TIMECARD,
  UPDATE_TIMECARD,
  CREATE_TIMECARD_HOURS,
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
  SEARCH_TIMECARD,
  ORDER_TIMECARD,
} from "../actions/types";

export const timecardReducer = (
  state = { loading: true, timecards: [], filteredTimecards: [] },
  action
) => {
  switch (action.type) {
    case GET_TIMECARDS_REQUEST:
      return { loading: false, timecards: [], filteredTimecards: [] };
    case GET_TIMECARDS:
      return {
        loading: false,
        timecards: action.payload,
        filteredTimecards: action.payload,
      };
    case GET_TIMECARD:
      return {
        loading: false,
        timecard: action.payload,
      };
    case SEARCH_TIMECARD:
      return {
        ...state,
        filteredTimecards: action.payload,
        loading: false,
      };
    case ORDER_TIMECARD:
      return {
        ...state,
        filteredTimecards: action.payload.timecards,
        sort: action.payload.sort,
        loading: false,
      };
    case CREATE_TIMECARD_SUCCESS:
      return {
        ...state,
        timecards: [action.payload, ...state.timecards],
        filteredTimecards: [action.payload, ...state.filteredTimecards],
        loading: false,
      };
    case UPDATE_TIMECARD:
    case APPROVE_TIMECARD:
      let index = state.timecards.findIndex(
        (timecard) => timecard._id === action.payload._id
      );
      let timecards = [...state.timecards];
      timecards[index] = { ...(timecards[index] = action.payload) };
      return {
        ...state,
        filteredTimecards: timecards,
        loading: false,
      };
    case DELETE_TIMECARD:
      return {
        ...state,
        filteredTimecards: state.filteredTimecards.filter(
          (timecard) => timecard._id !== action.payload
        ),
        loading: false,
      };
    case CREATE_TIMECARD_ERROR:
      return { loading: false, error: action.payload };
    case TIMECARDS_ERROR:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const timecardDetailsReducer = (
  state = { loading: true, timecard: {} },
  action
) => {
  switch (action.type) {
    case GET_TIMECARD_REQUEST:
      return { loading: false, ...state };
    case GET_TIMECARD:
      return {
        loading: false,
        timecard: action.payload,
      };
    case CREATE_TIMECARD_HOURS:
      return {
        ...state,
        timecard: { ...state.timecard, monday: action.payload },
        loading: false,
      };
    case CREATE_TIMECARD_TUESDAY_HOURS:
      return {
        ...state,
        timecard: { ...state.timecard, tuesday: action.payload },
        loading: false,
      };
    case CREATE_TIMECARD_WENDSDAY_HOURS:
      return {
        ...state,
        timecard: { ...state.timecard, wendsday: action.payload },
        loading: false,
      };
    case CREATE_TIMECARD_THURSDAY_HOURS:
      return {
        ...state,
        timecard: { ...state.timecard, thursday: action.payload },
        loading: false,
      };
    case CREATE_TIMECARD_FRIDAY_HOURS:
      return {
        ...state,
        timecard: { ...state.timecard, friday: action.payload },
        loading: false,
      };
    case CREATE_TIMECARD_SATARDAY_HOURS:
      return {
        ...state,
        timecard: { ...state.timecard, satarday: action.payload },
        loading: false,
      };
    case CREATE_TIMECARD_SUNDAY_HOURS:
      return {
        ...state,
        timecard: { ...state.timecard, sunday: action.payload },
        loading: false,
      };
    case DELETE_MONDAY_TIMECARD_HOURS:
      return {
        ...state,
        loading: false,
        timecard: {
          ...state.timecard,
          monday: state.timecard.monday.filter(
            (timecard) => timecard._id !== action.payload
          ),
        },
      };
    case DELETE_TUESDAY_TIMECARD_HOURS:
      return {
        ...state,
        loading: false,
        timecard: {
          ...state.timecard,
          tuesday: state.timecard.tuesday.filter(
            (timecard) => timecard._id !== action.payload
          ),
        },
      };
    case DELETE_WENDSDAY_TIMECARD_HOURS:
      return {
        ...state,
        loading: false,
        timecard: {
          ...state.timecard,
          wendsday: state.timecard.wendsday.filter(
            (timecard) => timecard._id !== action.payload
          ),
        },
      };
    case DELETE_THURSDAY_TIMECARD_HOURS:
      return {
        ...state,
        loading: false,
        timecard: {
          ...state.timecard,
          thursday: state.timecard.thursday.filter(
            (timecard) => timecard._id !== action.payload
          ),
        },
      };
    case DELETE_FRIDAY_TIMECARD_HOURS:
      return {
        ...state,
        loading: false,
        timecard: {
          ...state.timecard,
          friday: state.timecard.friday.filter(
            (timecard) => timecard._id !== action.payload
          ),
        },
      };
    case DELETE_SATARDAY_TIMECARD_HOURS:
      return {
        ...state,
        loading: false,
        timecard: {
          ...state.timecard,
          satarday: state.timecard.satarday.filter(
            (timecard) => timecard._id !== action.payload
          ),
        },
      };
    case DELETE_SUNDAY_TIMECARD_HOURS:
      return {
        ...state,
        loading: false,
        timecard: {
          ...state.timecard,
          sunday: state.timecard.sunday.filter(
            (timecard) => timecard._id !== action.payload
          ),
        },
      };
    case TIMECARD_ERROR:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
