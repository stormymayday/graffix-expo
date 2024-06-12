import createDataContext from "./createDataContext.js";
import graffixAPI from "../api/graffixAPI.js";

const authReducer = (state, action) => {
    switch (action.type) {
        // case "test_call":
        //     return { ...state, successMessage: action.payload };
        case "register_success":
            return {
                ...state,
                registerSuccessMessage: action.payload,
                registerErrorMessage: "",
            };
        case "register_error":
            return {
                ...state,
                registerErrorMessage: action.payload,
                registerSuccessMessage: "",
            };
        case "login_success":
            return {
                ...state,
                loginSuccessMessage: action.payload,
                loginErrorMessage: "",
            };
        case "login_error":
            return {
                ...state,
                loginErrorMessage: action.payload,
                loginSuccessMessage: "",
            };
        case "logout_success":
            return {
                ...state,
                logoutSuccessMessage: action.payload,
                logoutErrorMessage: "",
            };
        case "logout_error":
            return {
                ...state,
                logoutErrorMessage: action.payload,
                logoutSuccessMessage: "",
            };
        case "clear_message":
            return {
                ...state,
                registerSuccessMessage: "",
                registerErrorMessage: "",
                loginSuccessMessage: "",
                loginErrorMessage: "",
                logoutSuccessMessage: "",
            };
        default:
            return state;
    }
};

const register = (dispatch) => {
    return async ({ username, email, password }) => {
        try {
            const response = await graffixAPI.post("/api/v1/auth/register", {
                username,
                email,
                password,
            });

            console.log(response.data);

            dispatch({
                type: "register_success",
                payload: response.data.msg,
            });
        } catch (error) {
            dispatch({
                type: "register_error",
                payload: error.response.data.msg,
            });
        }
    };
};

const login = (dispatch) => {
    return async ({ email, password }) => {
        try {
            const response = await graffixAPI.post("/api/v1/auth/login", {
                email,
                password,
            });

            // STORE TOKEN

            console.log(response.data);

            dispatch({
                type: "login_success",
                payload: response.data.msg,
            });

            // Clear all messages
            dispatch({ type: "clear_message" });
        } catch (error) {
            dispatch({
                type: "login_error",
                payload: error.response.data.msg,
            });
        }
    };
};

const logout = (dispatch) => {
    return async () => {
        try {
            const response = await graffixAPI.get("/api/v1/auth/logout");

            // TOKEN

            console.log(response.data);

            dispatch({
                type: "logout_success",
                payload: response.data.msg,
            });
        } catch (error) {
            dispatch({
                type: "logout_error",
                payload: error.response.data.msg,
            });
        }
    };
};

const clearMessage = (dispatch) => () => {
    dispatch({ type: "clear_message" });
};

const authTest = (dispatch) => {
    return async () => {
        try {
            const response = await graffixAPI.get("/api/v1/art");

            console.log(response.data);
            dispatch({
                type: "test_call",
                payload: response.data.msg,
            });
        } catch (error) {
            dispatch({ type: "add_error", payload: error.response.data.msg });
        }
    };
};

export const { Provider, Context } = createDataContext(
    authReducer,
    { register, login, logout, clearMessage, authTest },
    {
        isSignedIn: false,
        registerSuccessMessage: "",
        registerErrorMessage: "",
        loginSuccessMessage: "",
        loginErrorMessage: "",
        logoutSuccessMessage: "",
        logoutErrorMessage: "",
    }
);
