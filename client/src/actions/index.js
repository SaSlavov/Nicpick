import { FILTER_GENRES, SEARCH_MOVIES, SEARCH_SERIES } from "./types"

export const searchMovies = (data) => {
    return {
        type: SEARCH_MOVIES,
        payload: data
    }
}
export const searchSeries = (data) => {
    return {
        type: SEARCH_SERIES,
        payload: data
    }
}

export const filterGenres = (data) => {
    return {
        type: FILTER_GENRES,
        payload: data
    }
}