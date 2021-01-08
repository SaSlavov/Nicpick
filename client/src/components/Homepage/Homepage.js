import React, { useEffect, useRef, useState } from 'react';
import { connect } from 'react-redux';
import query from '../../apis/tmbd.js'
import Dropdown from '../Search/SearchComponents/Dropdown/Dropdown.js';
import { sortBy, setResult, openInfo } from '../../actions/'
import './Homepage.css'
import { GENRES } from '../../apis/common/genres.js';

const Homepage = React.memo(({ search, searchType, sortBy, setResult, result, openInfo, showInfo }) => {
    // const [result, setResult] = useState(null)
    // console.log(popularMovies)
    const showInfoRef = useRef()


    useEffect(() => {
        if (searchType.type === 'movie') {
            console.log('in movies')
            query.get(`discover/movie?vote_count.gte=${search.sortBy.split('.')[0] === 'vote_average' ? '50' : '0'}&vote_average.gte=${Number(search.rating)}&with_genres=${search.genres.join(',')}&primary_release_date.gte=${search.year.start}-01-01&primary_release_date.lte=${search.year.end}-12-31&with_original_language=${search.country}&page=1&sort_by=${search.sortBy}`)
                .then(res => setResult(res.data))
        } else if (searchType.type === 'tv') {
            console.log('in tv')
            query.get(`discover/tv?vote_count.gte=${search.sortBy.split('.')[0] === 'vote_average' ? '50' : '0'}&vote_average.gte=${Number(search.rating)}&with_genres=${search.genres.join(',')}&first_air_date.gte=${search.year.start}-01-01&first_air_date.lte=${search.year.end}-12-31&with_original_language=${search.country}&page=1&sort_by=${search.sortBy}`)
                .then(res => setResult(res.data))
        }
    }, [search, searchType])

    const returnGenres = (genreIds) => {
        return GENRES.reduce((acc, el) => {
            if (genreIds.indexOf(Number(el.code)) !== -1) {
                acc.push(el.name)
            }
            return acc
        }, []).join(', ')
    }


    const returnResult = () => {
        return (
            <div className={`popular-movies-container ${searchType.active ? 'slide-right' : ''}`}>
                {result.map(movie => {
                    return (
                        <div className={`movie-container ${showInfo && showInfo.id === movie.id ? 'stretched' : ''}`} key={movie.id} onClick={() => openInfo(showInfo && showInfo.id === movie.id ? null : movie)}>
                            <div className={`cover-info ${showInfo && showInfo.id === movie.id ? 'stretched' : ''}`}>
                                <div className="movie-image-container">
                                    <img src={`https://image.tmdb.org/t/p/w154/${movie.poster_path}`} alt="cover"></img>
                                </div>
                                <div>
                                    <p className="cover-title">{movie.title ? movie.title : movie.name}</p>
                                    <p className="cover-year">{movie.release_date ? movie.release_date.split('-')[0] : movie.first_air_date.split('-')[0]}</p>
                                </div>
                            </div>
                            {showInfo && showInfo.id === movie.id &&
                                <div ref={showInfoRef} className="more-info-container" style={{ backgroundImage: `url(https://image.tmdb.org/t/p/w780/${movie.backdrop_path})`, backgroundSize: "cover", backgroundRepeat: 'no-repeat' }}>
                                    <div className="shadow-effect">
                                        <div className="general-info-container">
                                            <p className="general-info-title">{showInfo.title ? showInfo.title : showInfo.name}</p>
                                            <div className="year-genre-container">
                                                <p className="general-info-year">{showInfo.release_date ? showInfo.release_date.split('-')[0] : showInfo.first_air_date.split('-')[0]}</p>
                                                <p className="general-info-genre">{returnGenres(showInfo.genre_ids)}</p>
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

            <div className="sortBy-container">
                <Dropdown name="sorting" items={[{ data: "popularity.desc", name: "Popularity Desc." }, { data: "popularity.asc", name: "Popularity Asc." }, { data: "vote_average.desc", name: "Rating Desc." }, { data: "vote_average.asc", name: "Rating Asc." }]} action={sortBy} />
            </div>
            {result && returnResult()}
            <div className="pagination-container">
                <p className="prev-button">prev</p>
                <p className="next-button">next</p>
            </div>
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