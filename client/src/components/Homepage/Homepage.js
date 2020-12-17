import React, { useEffect, useState } from 'react';
import movies from '../../apis/tmbd.js'
import './Homepage.css'

const Homepage = () => {

    const [popularMovies, setPopularMovies] = useState(null)
    console.log(popularMovies)

    useEffect(() => {
        movies.get(`discover/movie?language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1`)
            .then(res => setPopularMovies(res.data.results))
    }, [])

    const returnPopularMovies = () => {
        return (
            <div className="popular-movies-container">
                {popularMovies.map(movie => {
                    return (
                        <div className="movie-container">
                            <div className="movie-image-container">
                                <img src={`https://image.tmdb.org/t/p/w200/${movie.poster_path}`}></img>
                            </div>
                            <h3>{movie.title}</h3>
                        </div>
                    )
                })}
            </div>
        )
    }

    return (
        <div>
            {popularMovies && returnPopularMovies()}
        </div>
    );
};

export default Homepage;