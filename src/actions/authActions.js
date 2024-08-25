import axios from "axios";
import { SubmissionError } from "redux-form";
import history from "../utils/historyUtils";
import { actions as notifActions } from "redux-notifications";

import { AuthTypes } from "../constants/actionTypes";
import { AuthUrls } from "../constants/urls";
import store from "../store";
import { getUserToken } from "../utils/authUtils";
import Cookies from "js-cookie";

const { notifSend } = notifActions;
axios.defaults.withCredentials = true;

export function authLogin(token) {
    return {
        type: AuthTypes.LOGIN,
        payload: token
    };
}

export function loginUser(formValues, dispatch) {
        const loginUrl = AuthUrls.LOGIN;

        const config = {
            xsrfCookieName: "csrftoken",
            xsrfHeaderName: "X-CSRFTOKEN",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                "X-CSRFTOKEN": Cookies.get("csrftoken")
              },
        }
        
        return axios.post(loginUrl, formValues, config).then((response) => {
            if(formValues.username == "admin"){
                localStorage.setItem("is_admin", true);
            }
            const token = response.data.access;
            const refresh = response.data.refresh;
            dispatch(authLogin(token));
            localStorage.setItem("remember", formValues.remember);
            localStorage.setItem("username", formValues.username);
            localStorage.setItem("token", token);
            localStorage.setItem("refresh", refresh);
            // redirect to the route "/"
            history.push("/");
            window.location.reload();

        }).catch(error => {

            if("message" in error && "code" in error){
                dispatch(notifSend({
                    message: error.message + " with code : " + error.code,
                    kind: "info",
                    dismissAfter: 5000
                }));
            }
            const processedError = processServerError(error);
            throw new SubmissionError(processedError);
        });
}

export function logoutUser() {
    localStorage.removeItem("token");
    localStorage.removeItem("refresh");
    localStorage.removeItem("is_admin");
    localStorage.clear();
    history.push("/")
    return {
        type: AuthTypes.LOGOUT
    };
}

export function signupUser(formValues, dispatch) { //no-unused-vars
    const signupUrl = AuthUrls.SIGNUP;

    const config = {
        xsrfCookieName: "csrftoken",
        xsrfHeaderName: "X-CSRFTOKEN",
        withCredentials: true,
        headers: {
            Accept: "application/json",
            "X-CSRFTOKEN": Cookies.get("csrftoken")
          },
    }    

    return axios.post(signupUrl, formValues, config)
        .then(() => {
            // If request is good...
            // you can login if email verification is turned off.
            // const token = response.data.key;
            // dispatch(authLogin(token));
            // localStorage.setItem("token", token);

            // email need to be verified, so don"t login and send user to signup_done page.
            // redirect to signup done page.
            history.push("/signup_done");
            window.location.reload();
        })
        .catch((error) => {

            // If request is bad...
            // Show an error to the user
            // console.log("-------------------------");
            // console.log(JSON.stringify(error))

            if("message" in error && "code" in error){
                dispatch(notifSend({
                    message: "There was an error, user exists : " + error.message   ,
                    kind: "info",
                    dismissAfter: 5000
                }));
            }
            // const processedError = processServerError(error);
            // throw new SubmissionError(processedError);
        });
}

function setUserProfile(payload) {
    return {
        type: AuthTypes.USER_PROFILE,
        payload: payload
    };
}

export function getUserProfile() {

    return function(dispatch) {
        const token = getUserToken(store.getState());
        if (token) {
            axios.get(AuthUrls.USER_PROFILE + "?search=" + localStorage.getItem("username"), {
                headers: {
                    authorization: "Bearer: " + token
                }
            }).then(response => {
                dispatch(setUserProfile(response.data[0]))
            }).catch((error) => {
                // If request is bad...
                // Show an error to the user
                console.log(error);
                // TODO: send notification and redirect
            });
        }
    };
}

export function changePassword(formValues, dispatch) {
    const changePasswordUrl = AuthUrls.CHANGE_PASSWORD;
    const token = getUserToken(store.getState());

    if (token) {
        return axios.post(changePasswordUrl, formValues, {
            headers: {
                authorization: "Token " + token
            }
        })
            .then(() => {
                dispatch(notifSend({
                    message: "Password has been changed successfully",
                    kind: "info",
                    dismissAfter: 5000
                }));
                // redirect to the route "/profile"
                history.push("/profile");
            })
            .catch((error) => {
                // If request is bad...
                // Show an error to the user
                const processedError = processServerError(error.response.data);
                throw new SubmissionError(processedError);
            });
    }
}

export function resetPassword(formValues) {

    const resetPasswordUrl = AuthUrls.RESET_PASSWORD;
    const config = {
        xsrfCookieName: "csrftoken",
        xsrfHeaderName: "X-CSRFTOKEN",
        withCredentials: true,
        headers: {
            Accept: "application/json",
            "X-CSRFTOKEN": Cookies.get("csrftoken")
          },
    }   
    return axios.post(resetPasswordUrl, formValues, config)
        .then(response => {
            // redirect to reset done page
            console.log(response)
            history.push("/");
            window.location.reload();
        }).catch((error) => {
            // If request is bad...
            // Show an error to the user
            console.log("-------------------------");
            console.log(JSON.stringify(error))
            if ("response" in error){
                const processedError = processServerError(error.response.data);
                throw new SubmissionError(processedError);
            }

    });
}


export function confirmPasswordChange(formValues, dispatch, props) {
    const { uid, token } = props.match.params;
    const resetPasswordConfirmUrl = AuthUrls.RESET_PASSWORD_CONFIRM;
    const data = Object.assign(formValues, { uid, token });
    const config = {
        xsrfCookieName: "csrftoken",
        xsrfHeaderName: "X-CSRFTOKEN",
        withCredentials: true,
        headers: {
            Accept: "application/json",
            "X-CSRFTOKEN": Cookies.get("csrftoken")
          },
    }   
    return axios.post(resetPasswordConfirmUrl, data, config)
        .then(response => {
            dispatch(notifSend({
                message: "Password has been reset successfully, please log in",
                kind: "info",
                dismissAfter: 5000
            }));
            console.log(response)
            history.push("/login");
        }).catch((error) => {
            // If request is bad...
            // Show an error to the user
            const processedError = processServerError(error.response.data);
            throw new SubmissionError(processedError);
        });
}

export function activateUserAccount(formValues, dispatch, props) {
    const { key } = props.match.params;
    const activateUserUrl = AuthUrls.USER_ACTIVATION;
    const data = Object.assign(formValues, { key });
    const config = {
        xsrfCookieName: "csrftoken",
        xsrfHeaderName: "X-CSRFTOKEN",
        withCredentials: true,
        headers: {
            Accept: "application/json",
            "X-CSRFTOKEN": Cookies.get("csrftoken")
          },
    }   
    return axios.post(activateUserUrl, data, config)
        .then(response => {
            dispatch(notifSend({
                message: "Your account has been activated successfully, please log in",
                kind: "info",
                dismissAfter: 5000
            }));
            console.log(response)
            history.push("/login");
        }).catch((error) => {
            // If request is bad...
            // Show an error to the user
            const processedError = processServerError(error.response.data);
            throw new SubmissionError(processedError);
        });
}

export function updateUserProfile(formValues, dispatch) {
    const token = getUserToken(store.getState());

    return axios.patch(AuthUrls.USER_PROFILE + localStorage.getItem("user_id") + "/", formValues, {
        headers: {
            authorization: "Bearer: " + token
        }
    })
        .then(response => {
            dispatch(notifSend({
                message: "Your profile has been updated successfully",
                kind: "info",
                dismissAfter: 5000
            }));
            history.push("/profile");
            window.location.reload();
        }).catch((error) => {
            // If request is bad...
            // Show an error to the user

            const processedError = processServerError(error.response.data);
            throw new SubmissionError(processedError);
        });
}
// util functions
function processServerError(error) {
    return  Object.keys(error).reduce(function(newDict, key) {
        if (key === "non_field_errors") {
            newDict["_error"].push(error[key]);
        } else if (key === "token") {
            // token sent with request is invalid
            newDict["_error"].push("The link is not valid any more.");
        } else {
            newDict[key] = error[key];
        }

        return newDict
    }, {"_error": []});
}