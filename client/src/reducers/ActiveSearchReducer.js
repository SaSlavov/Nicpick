import { SEARCH_MOVIES, SEARCH_SERIES } from "../actions/types";

const initialState = {
    type: 'movie',
    active: false
}

export default ( state = initialState, action ) => {
    switch (action.type) {
        case SEARCH_MOVIES:
            return action.payload;
        case SEARCH_SERIES:
            return action.payload;
        default:
            return state;
    }
}