import { FILTER_GENRES } from "../actions/types";

const initialState = {
    genres: [],
}

export default ( state = initialState, action ) => {
    switch (action.type) {
        case FILTER_GENRES:
            let genres = state.genres.some( genre => genre === action.payload) ? state.genres.filter( genre => genre !== action.payload) : [...state.genres, action.payload];
            return {...state, "genres": genres};
        default:
            return state;
    }
}