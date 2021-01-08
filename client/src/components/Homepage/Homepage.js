import React, { useEffect, useRef, useState } from 'react';
import { connect } from 'react-redux';
import query from '../../apis/tmbd.js'
import Dropdown from '../Search/SearchComponents/Dropdown/Dropdown.js';
import { sortBy, setResult, openInfo } from '../../actions/'
import './Homepage.css'

const Homepage = React.memo(({ search, searchType, sortBy, setResult, result, openInfo, showInfo }) => {
    // const [result, setResult] = useState(null)
    // console.log(popularMovies)
    const showInfoRef = useRef()


    useEffect(() => {
        if (searchType.type === 'movie') {
            console.log('in movies')
            query.get(`discover/movie?vote_count.gte=50&vote_average.gte=${Number(search.rating)}&with_genres=${search.genres.join(',')}&primary_release_date.gte=${search.year.start}-01-01&primary_release_date.lte=${search.year.end}-12-31&with_original_language=${search.country}&page=2&sort_by=${search.sortBy}`)
                .then(res => setResult(res.data))
        } else if (searchType.type === 'tv') {
            console.log('in tv')
            query.get(`discover/tv?vote_count.gte=50&vote_average.gte=${Number(search.rating)}&with_genres=${search.genres.join(',')}&first_air_date.gte=${search.year.start}-01-01&first_air_date.lte=${search.year.end}-12-31&with_original_language=${search.country}&page=1&sort_by=${search.sortBy}`)
                .then(res => setResult(res.data))
        }
    }, [search, searchType])

    const openInfoBox = (movie, showInfo, showInfoRef) => {
        openInfo(showInfo ? null : movie);

        showInfoRef.current.style.backgroundImage = `url(https://image.tmdb.org/t/p/w1280/${movie.backdrop_path})`

    }

    const returnResult = () => {
        return (
            <div className={`popular-movies-container ${searchType.active ? 'slide-right' : ''}`}>
                {result.map(movie => {
                    return (
                        <div className={`movie-container ${showInfo && showInfo.id === movie.id ? 'stretched' : ''}`} key={movie.id} onClick={() => openInfo(showInfo && showInfo.id === movie.id ? null : movie)}>
                            <div className="movie-image-container">
                                <img src={`https://image.tmdb.org/t/p/w154/${movie.poster_path}`} alt="cover"></img>
                            </div>
                            <div>
                                <p className="cover-title">{movie.title}</p>
                                <p className="cover-year">{movie.release_date.split('-')[0]}</p>
                            </div>
                            {showInfo && showInfo.id === movie.id &&
                                <div ref={showInfoRef} className="more-info-container" style={{ backgroundImage: `url(https://image.tmdb.org/t/p/w780/${movie.backdrop_path})`, backgroundSize: "cover", backgroundRepeat: 'no-repeat' }}>
                                    <div className="shadow-effect">
                                        <div className="general-info-container">
                                            <p className="general-info-title">{showInfo.title}</p>
                                            <div className="year-genre-container">
                                                <p className="general-info-year">{showInfo.release_date.split('-')[0]}</p>
                                                <p className="general-info-genre">{showInfo.genre_ids}</p>
                                            </div>
                                            <p className="general-info-overview">{showInfo.overview}</p>
                                            <p className="general-info-rating">IMDB {showInfo.vote_average}</p>
                                            <p className="general-info-add-favorites">add to favorites</p>
                                        </div>
                                    </div>

                                </div>
                            }
                        </div>
                    )
                })}
            </div>
        )
    }

    return (
        <div className="homepage-container">
            <div>
                <div className="sortBy-container">
                    <Dropdown name="sorting" items={[{ data: "popularity.desc", name: "Popularity Desc." }, { data: "popularity.asc", name: "Popularity Asc." }, { data: "vote_average.desc", name: "Rating Desc." }, { data: "vote_average.asc", name: "Rating Asc." }]} action={sortBy} />
                </div>
            </div>
            {result && returnResult()}
        </div>
    );
});

const mapStateToProps = (state) => {
    return {
        searchType: state.activeSearch,
        search: state.search,
        result: state.result.results,
        showInfo: state.showInfo
    }
}

export default connect(
    mapStateToProps,
    { sortBy, setResult, openInfo }
)(Homepage);