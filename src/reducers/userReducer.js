import { USER_BEGIN, USER_SUCCESS, USER_ERROR } from "../actions/user";

const initialState = {
  result: null,
  loading: false,
  error: null
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case USER_BEGIN:
      // Mark the state as "loading" so we can show a spinner or something
      // Also, reset any errors. We're starting fresh.
      return {
        ...state,
        loading: true,
        error: null
      };

    case USER_SUCCESS:
      // All done: set loading "false".
      // Also, replace the result with the ones from the server
      return {
        ...state,
        loading: false,
        result: action.payload
      };

    case USER_ERROR:
      // The request failed, but it did stop, so set loading to "false".
      // Save the error, and we can display it somewhere
      // Since it failed, we don't have result to display anymore, so set it empty.
      // This is up to you and your app though: maybe you want to keep the result
      // around! Do whatever seems right.
      return {
        ...state,
        loading: false,
        error: action.payload,
        result: []
      };

    default:
      // ALWAYS have a default case in a reducer
      return state;
  }
};

export default userReducer;
