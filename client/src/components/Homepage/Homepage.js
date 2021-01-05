import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import movies from '../../apis/tmbd.js'
import './Homepage.css'

const Homepage = React.memo(({search, searchType}) => {
    const [popularMovies, setPopularMovies] = useState(null)
    console.log(popularMovies)

    useEffect(() => {
        console.log('in useEffect')
        console.log(searchType)
        // movies.get(`discover/movie?language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1`)

        if (searchType.type === 'movie') {
            console.log('in movies')
            movies.get(`discover/movie?vote_average.gte=${Number(search.rating)}&with_genres=${search.genres.join(',')}&primary_release_date.gte=${search.year.start}-01-01&primary_release_date.lte=${search.year.end}-12-31&with_original_language=${search.country}&page=1`)
            .then(res => setPopularMovies(res.data.results))
        }else if (searchType.type === 'tv') {
            console.log('in tv')
            movies.get(`discover/tv?vote_average.gte=${Number(search.rating)}&with_genres=${search.genres.join(',')}&first_air_date.gte=${search.year.start}-01-01&first_air_date.lte=${search.year.end}-12-31&with_original_language=${search.country}&page=1`)
            .then(res => setPopularMovies(res.data.results))
        }
        // movies.get(`discover/movie?with_original_language=tr&page=1`)
    }, [search, searchType])

    const returnPopularMovies = () => {
        return (
            <div className="popular-movies-container">
                {popularMovies.map(movie => {
                    return (
                        <div className="movie-container" key={movie.id}>
                            <div className="movie-image-container">
                                <img src={`https://image.tmdb.org/t/p/w200/${movie.poster_path}`} alt="cover"></img>
                            </div>
                            <h3>{movie.title}</h3>
                        </div>
                    )
                })}
            </div>
        )
    }

    return (
        <div className="homepage-container">
            {popularMovies && returnPopularMovies()}
        </div>
    );
});

const mapStateToProps = (state) => {
    return {
        searchType: state.activeSearch,
        search: state.search,
    }
}

export default connect(
    mapStateToProps,
)(Homepage);