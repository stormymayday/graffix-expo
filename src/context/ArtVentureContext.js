import createDataContext from "./createDataContext.js";
import graffixAPI from "../api/graffixAPI.js";

const artVentureReducer = (state, action) => {
    switch (action.type) {
        case "fetch_treasures_success":
            return { ...state, treasures: action.payload, errorMessage: "" };
        case "fetch_treasures_error":
            return { ...state, errorMessage: action.payload };
        default:
            return state;
    }
};

const fetchTreasures = (dispatch) => {
    return async () => {
        try {
            const response = await graffixAPI.get("/api/v1/treasure/nearby", {
                params: {
                    longitude: -123.02397950816254,
                    latitude: 49.233268305837285,
                    maxDistance: 1000,
                },
            });
            console.log(response.data);
            dispatch({
                type: "fetch_treasures_success",
                payload: response.data,
            });
        } catch (error) {
            dispatch({
                type: "fetch_treasures_error",
                payload: error.message,
            });
        }
    };
};

export const { Provider, Context } = createDataContext(
    artVentureReducer,
    { fetchTreasures },
    { treasures: [], errorMessage: "" }
);
