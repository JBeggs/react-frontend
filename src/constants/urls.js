const ROOT_URL = process.env.REACT_APP_BACKEND_URL;

export const AuthUrls = {
    LOGIN: `${ROOT_URL}/token/`,
    SIGNUP: `${ROOT_URL}/rest-auth-registration/`,
    CHANGE_PASSWORD: `${ROOT_URL}/api-auth/password/change/`,
    RESET_PASSWORD: `${ROOT_URL}/rest-auth/password/reset/`,
    RESET_PASSWORD_CONFIRM: `${ROOT_URL}/api-auth/password/reset/confirm/`,
    USER_ACTIVATION: `${ROOT_URL}/api-auth/registration/verify-email/`,
    USER_PROFILE: `${ROOT_URL}/users/user/`,
    LOAD_CONTENT: `${ROOT_URL}/api/info/`,
    UPDATE_CONTENT: `${ROOT_URL}/api/update/page/`,
    UPDATE_ARTICLE: `${ROOT_URL}/api/update/article/`,
    UPDATE_GALLERY: `${ROOT_URL}/api/update/articlegallery/`,
    ADD_MESSAGE: `${ROOT_URL}/api/update/message/`,
};