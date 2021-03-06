import { Map } from 'immutable';
import { hashHistory } from 'react-router';
import auth, { saveUser, signout } from '../../helpers/authentication';

// Constants
export const AUTH_USER = 'AUTH_USER';
export const UNAUTH_USER = 'UNAUTH_USER';
export const FETCHING_USER = 'FETCHING_USER';
export const FETCHING_USER_SUCCESS = 'FETCHING_USER_SUCCESS';
export const FETCHING_USER_FAILURE = 'FETCHING_USER_FAILURE';
export const STOP_FETCHING_USER = 'STOP_FETCHING_USER';

// Actions
export function authUser (user) {
  return {
    type: AUTH_USER,
    user
  };
}

export function unauthUser () {
  return {
    type: UNAUTH_USER
  };
}

export function fetchingUser () {
  return {
    type: FETCHING_USER
  };
}

export function fetchingUserFailure (error) {
  console.log('ERROR FETCHING USER: ', error);
  return {
    type: FETCHING_USER_FAILURE,
    error: 'Error on fetching user'
  };
}

export function fetchingUserSuccess (user) {
  return {
    type: FETCHING_USER_SUCCESS,
    user
  };
}

export function stopFetchingUser () {
  return {
    type: STOP_FETCHING_USER
  };
}

// User authentication handler
export function fetchAndHandleAuthedUser () {
  return function (dispatch) {
    dispatch(fetchingUser());
    // Authenticate via Facebook + Firebase
    return auth().then(({ user, credential }) => {
      let userInfo = {
        uid: user.providerData[0].uid,
        name: user.providerData[0].displayName,
        photoURL: user.providerData[0].photoURL
      };
      return dispatch(fetchingUserSuccess(userInfo));
    })
    // Save user info in Firebase
    .then(({ user }) => saveUser(user))
    // Set authenticated user
    .then((user) => {
      hashHistory.push('/');
      return dispatch(authUser(user))
    })
    .catch((error) => dispatch(fetchingUserFailure(error)));
  };
}

// User signout handler
export function signoutAndUnauth () {
  return function (dispatch) {
    signout();
    dispatch(unauthUser());
  };
}

// Users Reducers
const initialState = Map({
  isFetching: false,
  error: '',
  isAuthenticated: false,
  authedUser: {}
});

export default function usersReducer (state = initialState, action) {
  switch (action.type) {

    case AUTH_USER :
      return state.merge({
        isAuthenticated: true,
        authedUser: action.user
      });

    case UNAUTH_USER :
      return state.merge({
        isAuthenticated: false,
        authedUser: {}
      });

    case FETCHING_USER:
      return state.merge({
        isFetching: true
      });

    case FETCHING_USER_FAILURE:
      return state.merge({
        isFetching: false,
        error: action.error
      });

    case FETCHING_USER_SUCCESS:
      return action.user === null
        ? state.merge({
          isFetching: false,
          error: ''
        })
        : state.merge({
          isFetching: false,
          error: '',
          authedUser: action.user
        });

    case STOP_FETCHING_USER:
      return state.merge({
        isFetching: false
      });

    default:
      return state;
  }
}
