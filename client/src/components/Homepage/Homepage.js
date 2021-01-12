import React, { useEffect, useRef, useState } from 'react';
import { connect } from 'react-redux';
import query from '../../apis/tmbd.js'
import Dropdown from '../Search/SearchComponents/Dropdown/Dropdown.js';
import { sortBy, setResult, openInfo, setPage } from '../../actions/'
import './Homepage.css'
import { GENRES } from '../../apis/common/genres.js';

const Homepage = React.memo(({ search, searchType, sortBy, setResult, result, openInfo, showInfo, page, setPage }) => {
    const showInfoRef = useRef()

    useEffect(() => {
        setResult([search, searchType.type, page])

    }, [search, searchType.type, page])

    const returnGenres = (genreIds) => {
        return GENRES.reduce((acc, el) => {
            if (genreIds.indexOf(Number(el.code)) !== -1) {
                acc.push(el.name)
            }
            return acc
        }, []).join(', ')
    }

    const returnPagination = (page) => {
        let pages = [];
        let start = page > 2 ? page - 2 : page === 1 ? page : page - 1;
        let end = page < 3 ? 5 : page + 2;

        for (let i = start; i <= end; i++) {
            pages.push(i)

        }

        return pages.map((el, index) => {
            if (el === page) {
                return <p key={index} className="current-page">{el}</p>
            } else {
                return <p key={index} className="pages-p" onClick={() => setPage(el)}>{el}</p>
            }
        })

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
                                    <p className="cover-year">{ movie.release_date && movie.release_date.length > 0 ? movie.release_date.split('-')[0] : movie.first_air_date && movie.first_air_date.length > 0 ? movie.first_air_date.split('-')[0] : ''}</p>
                                </div>
                            </div>
                            <div ref={showInfoRef} className={`more-info-container ${showInfo && showInfo.id === movie.id ? 'active' : ''}`} style={{ backgroundImage: `url(https://image.tmdb.org/t/p/w780/${movie.backdrop_path})`, backgroundSize: "cover", backgroundRepeat: 'no-repeat', }}>
                                <div className="shadow-effect">
                                    {showInfo && showInfo.id === movie.id &&
                                        <div className="general-info-container">
                                            <p className="general-info-title">{showInfo.title ? showInfo.title : showInfo.name}</p>
                                            <div className="year-genre-container">
                                                <p className="general-info-year">{ movie.release_date && movie.release_date.length > 0 ? movie.release_date.split('-')[0] : movie.first_air_date && movie.first_air_date.length > 0 ? movie.first_air_date.split('-')[0] : ''}</p>
                                                <p className="general-info-genre">{returnGenres(showInfo.genre_ids)}</p>
                                            </div>
                                            <p className="general-info-overview">{showInfo.overview}</p>
                                            <p className="general-info-rating">IMDB {showInfo.vote_average}</p>
                                            <p className="general-info-add-favorites">add to favorites</p>
                                        </div>
                                    }
                                </div>

                            </div>
                        </div>
                    )
                })}
                <div className="pagination-container">
                    <p className="prev-button" onClick={() => setPage(page - 1)}>prev</p>
                    <div className="pages-container">
                        {returnPagination(page)}
                    </div>
                    <p className="next-button" onClick={() => setPage(page + 1)}>next</p>
                </div>
            </div>
        )
    }

    return (
        <div className="homepage-container">

            <div className="sortBy-container">
                <Dropdown name="sorting" items={[{ data: "popularity.desc", name: "Popularity Desc." }, { data: "popularity.asc", name: "Popularity Asc." }, { data: "vote_average.desc", name: "Rating Desc." }, { data: "vote_average.asc", name: "Rating Asc." }]} action={sortBy} />
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
        page: state.result.page,
        showInfo: state.showInfo
    }
}

export default connect(
    mapStateToProps,
    { sortBy, setResult, openInfo, setPage }
)(Homepage);