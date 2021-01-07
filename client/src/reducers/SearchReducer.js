import { FILTER_COUNTRY, FILTER_GENRES, FILTER_RATING, FILTER_YEAR, SORT_BY } from "../actions/types";

const initialState = {
    genres: [],
    rating: 0,
    year: { start: '1950', end: '2021' },
    country: "en",
    sortBy: "popularity.desc"
}

export default (state = initialState, action) => {
    switch (action.type) {
        case FILTER_GENRES:
            let genres = state.genres.some(genre => genre === action.payload) ? state.genres.filter(genre => genre !== action.payload) : [...state.genres, action.payload];
            return { ...state, "genres": genres };
        case FILTER_RATING:
            return { ...state, "rating": action.payload };
        case FILTER_YEAR:
            let [prop, value] = action.payload
            console.log(prop, value)
            return { ...state, "year": { ...state.year, [prop]: value } };
        case FILTER_COUNTRY:
            return { ...state, "country": action.payload };
        case SORT_BY:
            return { ...state, "sortBy": action.payload };
        default:
            return state;
    }
}