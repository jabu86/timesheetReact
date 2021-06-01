import {
  GET_TIMECARDS,
  TIMECARDS_ERROR,
  CREATE_TIMECARD,
  CREATE_TIMECARD_HOURS,
  CREATE_TIMECARD_TUESDAY_HOURS,
  CREATE_TIMECARD_WENDSDAY_HOURS,
  CREATE_TIMECARD_THURSDAY_HOURS,
  CREATE_TIMECARD_FRIDAY_HOURS,
  CREATE_TIMECARD_SATARDAY_HOURS,
  CREATE_TIMECARD_SUNDAY_HOURS,
  GET_TIMECARD,
  GET_TIMECARD_HOURS,
  DELETE_MONDAY_TIMECARD_HOURS,
  DELETE_TUESDAY_TIMECARD_HOURS,
  DELETE_WENDSDAY_TIMECARD_HOURS,
  DELETE_THURSDAY_TIMECARD_HOURS,
  DELETE_FRIDAY_TIMECARD_HOURS,
  DELETE_SATARDAY_TIMECARD_HOURS,
  DELETE_SUNDAY_TIMECARD_HOURS,
  DELETE_TIMECARD,
  UPDATE_TIMECARD,
  SEARCH_TIMECARD,
  ORDER_TIMECARD,
  APPROVE_TIMECARD,
} from "../actions/types";
const initialState = {
  text: "",
  timecards: [],
  filteredTimecards: [],
  timecard: null,
  loading: true,
  error: {},
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case GET_TIMECARDS:
      return {
        ...state,
        timecards: payload,
        filteredTimecards: payload,
        loading: false,
      };
    case GET_TIMECARD:
      return {
        ...state,
        timecard: payload,
        loading: false,
      };
    case CREATE_TIMECARD:
      return {
        ...state,
        timecards: [payload, ...state.timecards],
        filteredTimecards: [payload, ...state.filteredTimecards],
        loading: false,
      };
    case SEARCH_TIMECARD:
      return {
        ...state,
        filteredTimecards: payload.filterValues,
        text: payload.text,
        loading: false,
      };
    case ORDER_TIMECARD:
      return {
        ...state,
        filteredTimecards: payload.timecards,
        sort: payload.sort,
        loading: false,
      };
    case GET_TIMECARD_HOURS:
      return {
        ...state,
        timecard: payload,
        loading: false,
      };
    case UPDATE_TIMECARD:
    case APPROVE_TIMECARD:
      let index = state.filteredTimecards.findIndex(
        (timecard) => timecard._id === payload._id
      );
      let timecards = [...state.filteredTimecards];
      timecards[index] = { ...(timecards[index] = payload) };
      return {
        ...state,
        filteredTimecards: timecards,
        loading: false,
      };
    case DELETE_TIMECARD:
      return {
        ...state,
        filteredTimecards: state.filteredTimecards.filter(
          (timecard) => timecard._id !== payload
        ),
        loading: false,
      };
    case CREATE_TIMECARD_HOURS:
      return {
        ...state,
        timecard: { ...state.timecard, monday: payload },
        loading: false,
      };
    case CREATE_TIMECARD_TUESDAY_HOURS:
      return {
        ...state,
        timecard: { ...state.timecard, tuesday: payload },
        loading: false,
      };
    case CREATE_TIMECARD_WENDSDAY_HOURS:
      return {
        ...state,
        timecard: { ...state.timecard, wendsday: payload },
        loading: false,
      };
    case CREATE_TIMECARD_THURSDAY_HOURS:
      return {
        ...state,
        timecard: { ...state.timecard, thursday: payload },
        loading: false,
      };
    case CREATE_TIMECARD_FRIDAY_HOURS:
      return {
        ...state,
        timecard: { ...state.timecard, friday: payload },
        loading: false,
      };
    case CREATE_TIMECARD_SATARDAY_HOURS:
      return {
        ...state,
        timecard: { ...state.timecard, satarday: payload },
        loading: false,
      };
    case CREATE_TIMECARD_SUNDAY_HOURS:
      return {
        ...state,
        timecard: { ...state.timecard, sunday: payload },
        loading: false,
      };
    case DELETE_MONDAY_TIMECARD_HOURS:
      return {
        ...state,
        loading: false,
        timecard: {
          ...state.timecard,
          monday: state.timecard.monday.filter(
            (timecard) => timecard._id !== payload
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
            (timecard) => timecard._id !== payload
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
            (timecard) => timecard._id !== payload
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
            (timecard) => timecard._id !== payload
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
            (timecard) => timecard._id !== payload
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
            (timecard) => timecard._id !== payload
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
            (timecard) => timecard._id !== payload
          ),
        },
      };

    case TIMECARDS_ERROR:
      return {
        ...state,
        loading: false,
        error: payload,
        // timecard: null,
      };
    default:
      return state;
  }
}
