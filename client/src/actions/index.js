import { FILTER_GENRES, FILTER_RATING, SEARCH_MOVIES, SEARCH_SERIES, FILTER_YEAR, FILTER_COUNTRY, SORT_BY, SET_RESULT, OPEN_INFO, SET_PAGE, SET_QUERY_STRING } from "./types"
import query from '../apis/tmbd.js'

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

export const sortBy = (data) => {
    return {
        type: SORT_BY,
        payload: data
    }
}

export const setResult = (data) => async (dispatch) => {
    let [search, type, page = 1] = data;
    let result = {};
    if (type === 'query' && search.queryString.length > 0) {
        result = await query.get(`search/multi?query=${search.queryString}&page=${page}`)
        
    } else if (type === 'movie') {
        result = await query.get(`discover/${type}?vote_count.gte=${search.sortBy.split('.')[0] === 'vote_average' ? '50' : '0'}&vote_average.gte=${Number(search.rating)}&with_genres=${search.genres.include.join(',')}&without_genres=${search.genres.exclude.join(',')}&primary_release_date.gte=${search.year.start}-01-01&primary_release_date.lte=${search.year.end}-12-31&with_original_language=${search.country}&page=${page}&sort_by=${search.sortBy}`)
    } else if (type === 'tv') {
        result = await query.get(`discover/tv?vote_count.gte=${search.sortBy.split('.')[0] === 'vote_average' ? '50' : '0'}&vote_average.gte=${Number(search.rating)}&with_genres=${search.genres.include.join(',')}&without_genres=${search.genres.exclude.join(',')}&first_air_date.gte=${search.year.start}-01-01&first_air_date.lte=${search.year.end}-12-31&with_original_language=${search.country}&page=${page}&sort_by=${search.sortBy}`)
    } else {
        return {}
    }

    dispatch( {
        type: SET_RESULT,
        payload: result.data
    })
}

export const openInfo = (data) => {
    return {
        type: OPEN_INFO,
        payload: data
    }
}


export const setQueryString = (data) => {
    return {
        type: SET_QUERY_STRING,
        payload: data
    }
}

export const setPage = (data) => {
    return {
        type: SET_PAGE,
        payload: data
    }
}