import { FILTER_GENRES, FILTER_RATING, SEARCH_MOVIES, SEARCH_SERIES, FILTER_YEAR, FILTER_COUNTRY } from "./types"

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

export const filterByRating = (data) => {
    return {
        type: FILTER_RATING,
        payload: data
    }
}

export const filterByYear = (data) => {
    return {
        type: FILTER_YEAR,
        payload: data
    }
}

export const filterByCountry = (data) => {
    return {
        type: FILTER_COUNTRY,
        payload: data
    }
}