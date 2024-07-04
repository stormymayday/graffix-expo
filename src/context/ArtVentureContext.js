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
    return async (currentLocation, maxDistance = 1000) => {
        if (!currentLocation) {
            dispatch({
                type: "fetch_treasures_error",
                payload: "Location not available",
            });
            return;
        }

        try {
            const response = await graffixAPI.get("/api/v1/treasure/nearby", {
                params: {
                    latitude: currentLocation.latitude,
                    longitude: currentLocation.longitude,
                    maxDistance,
                },
            });
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
