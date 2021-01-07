import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import query from '../../apis/tmbd.js'
import Dropdown from '../Search/SearchComponents/Dropdown/Dropdown.js';
import { sortBy, setResult } from '../../actions/'
import './Homepage.css'

const Homepage = React.memo(({ search, searchType, sortBy, setResult, result }) => {
    // const [result, setResult] = useState(null)
    // console.log(popularMovies)

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

    const returnResult = () => {
        return (
            <div className={`popular-movies-container ${searchType.active ? 'slide-right' : ''}`}>
                {result.map(movie => {
                    return (
                        <div className="movie-container" key={movie.id}>
                            <div className="movie-image-container">
                                <img src={`https://image.tmdb.org/t/p/w154/${movie.poster_path}`} alt="cover"></img>
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
            <div>
                <div className="sortBy-container">
                    <Dropdown name="sorting" items={[{ data: "popularity.desc", name: "Popularity Desc." }, { data: "popularity.asc", name: "Popularity Asc." }, { data: "vote_average.desc", name: "Rating Desc." }, { data: "vote_average.asc", name: "Rating Asc." }]} action={sortBy}/>
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
        result: state.result.results
    }
}

export default connect(
    mapStateToProps,
    { sortBy, setResult }
)(Homepage);