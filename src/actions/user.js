import api from "../common/apiConfig";
export const USER_BEGIN = "USER_BEGIN";
export const USER_SUCCESS = "USER_SUCCESS";
export const USER_ERROR = "USER_FAILURE";

export function UserService(userObj) {
  let headers = {
    "Content-Type": "application/json",
    token: window.localStorage.getItem("currentUser")
  };
  return dispatch => {
    dispatch(userBegin());
    // Perform the API request
    return (
      fetch(`${api.domain}${api.user}`, {
        method: "post",
        body: JSON.stringify(userObj),
        headers: headers
      })
        .then(response => response.json())
        .then(responseJSON => {
          dispatch(userSuccess(responseJSON));
        })
        // Then dispatch the resulting json/data to the reducer
        .catch(json => dispatch(userError(json)))
    );
  };
}

export const userBegin = () => ({
  type: USER_BEGIN
});

export const userSuccess = userObject => ({
  type: USER_SUCCESS,
  payload: userObject
});

export const userError = error => ({
  type: USER_ERROR,
  payload: error
});
