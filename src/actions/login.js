import api from "../common/apiConfig";

export const LOGIN_BEGIN = "LOGIN_BEGIN";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_ERROR = "LOGIN_FAILURE";
export const LOGIN_OUT = "LOGIN_OUT";

export function loginService(userObj) {
  return dispatch => {
    dispatch(loginBegin());
    // Perform the API request
    return (
      fetch(`${api.domain}${api.login}`, {
        method: "post",
        body: JSON.stringify(userObj),
        headers: {
          "Content-Type": "application/json"
        }
      })
        .then(response => response.json())
        .then(responseJSON => {
          dispatch(loginSuccess(responseJSON));
        })
        // Then dispatch the resulting json/data to the reducer
        .catch(json => dispatch(loginError(json)))
    );
  };
}

export function logout() {
  return dispatch => {
    dispatch(userLogout());
    window.localStorage.removeItem("currentUser");
  };
}

export const userLogout = () => ({
  type: LOGIN_OUT
});

export const loginBegin = () => ({
  type: LOGIN_BEGIN
});

export const loginSuccess = userObject => ({
  type: LOGIN_SUCCESS,
  payload: userObject
});

export const loginError = error => ({
  type: LOGIN_ERROR,
  payload: error
});
