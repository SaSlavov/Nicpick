import React, { useEffect, useState } from 'react';
import movies from '../../apis/tmbd.js'
import './Homepage.css'

const Homepage = () => {

    const [popularMovies, setPopularMovies] = useState(null)
    // console.log(popularMovies)

    useEffect(() => {
        movies.get(`discover/movie?language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1`)
        // movies.get(`discover/movie?language=tr&with_original_language=tr&page=1`)
            .then(res => setPopularMovies(res.data.results))
    }, [])

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
};

export default Homepage;