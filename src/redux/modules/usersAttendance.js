import {
  fetchUsersAttendance,
  saveToUsersAttendance,
  incrementAttendance,
  deleteFromUsersAttendance,
  decrementAttendance
} from '../../helpers/firebaseAPI';

export const CONFIRM_GOING = 'CONFIRM_GOING';
export const IM_NOT_GOING = 'IM_NOT_GOING';

const FETCHING_ATTENDANCE = 'FETCHING_ATTENDANCE';
const FETCHING_ATTENDANCE_SUCCESS = 'FETCHING_ATTENDANCE_SUCCESS';
const FETCHING_ATTENDANCE_ERROR = 'FETCHING_ATTENDANCE_ERROR';

function confirmGoing (eventId) {
  return {
    type: CONFIRM_GOING,
    eventId,
  }
}

function imNotGoing (eventId) {
  return {
    type: IM_NOT_GOING,
    eventId,
  }
}

function fetchingAttendance () {
  return {
    type: FETCHING_ATTENDANCE
  };
}

function fetchingAttendanceSuccess (attendance) {
  return {
    type: FETCHING_ATTENDANCE_SUCCESS,
    attendance
  };
}

function fetchingAttendanceError (error) {
  return {
    type: FETCHING_ATTENDANCE_ERROR,
    error: 'Fetching attendance error'
  };
}

// Invoked in EventPage Component:
// Add user to the event's attendance list
export function handleConfirmAttendance(eventId, e) {
  e.stopPropagation()
  return function (dispatch, getState) {
    dispatch(confirmGoing(eventId))
    const uid = getState().users.authedUser.uid;

    Promise.all([
      saveToUsersAttendance(uid, eventId),
      incrementAttendance(eventId),
    ])
    .catch((error) => {
      console.warn(error)
      dispatch(imNotGoing(eventId))
    })
  }
};

// Invoked in EventPage Component:
// Remove user to the event's attendance list
export function handleCancelAttendance(eventId, e) {
  e.stopPropagation()
  return function (dispatch, getState) {
    dispatch(imNotGoing(eventId))
    const uid = getState().users.authedUser.uid;

    Promise.all([
      deleteFromUsersAttendance(uid, eventId),
      decrementAttendance(eventId),
    ])
    .catch((error) => {
      console.warn(error)
      dispatch(confirmGoing(eventId))
    })
  }
};

// Invoked in Main Container on initial load:
// Get user's attendance of all events
export function fetchUsersEventAttendance() {
  return function (dispatch, getState) {
    const uid = getState().users.authedUser.uid;

    dispatch(fetchingAttendance())
    fetchUsersAttendance(uid)
      .then((attendance) => {
        return dispatch(fetchingAttendanceSuccess(attendance))
      })
      .catch((error) => {
        return dispatch(fetchingAttendanceError(error))
      });
  }
};

const initialState = {
  isFetching: false,
  error: ''
}; 

export default function attendance (state = initialState, action) {
  switch (action.type) {

    case FETCHING_ATTENDANCE :
      return {
        ...state,
        isFetching: true
      };

    case FETCHING_ATTENDANCE_SUCCESS :
      return {
        ...state,
        ...action.attendance,
        isFetching: false,
        error: ''
      };

    case FETCHING_ATTENDANCE_ERROR :
      return {
        ...state,
        isFetching: false,
        error: action.error
      };

    case CONFIRM_GOING :
      return {
        ...state,
        [action.eventId]: true,
      };

    case IM_NOT_GOING :
      return Object.keys(state)
        .filter((eventId) => action.eventId !== eventId)
        .reduce((prev, current) => {
          prev[current] = state[current]
          return prev
        }, {});

    default :
      return state;
  }
}