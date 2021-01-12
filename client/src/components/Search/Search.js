import React, { useEffect, useRef, useState } from 'react';
import { connect } from 'react-redux';
import './Search.css'
import { filterGenres, filterByRating, filterByYear, filterByCountry } from '../../actions'
import { GENRES } from '../../apis/common/genres.js'
import Dropdown from './SearchComponents/Dropdown/Dropdown';


const Search = ({ active, search, searchType, filterGenres, filterByRating, filterByYear, filterByCountry }) => {
    const [rating, setRating] = useState(0);
    const [yearsRange, setYearsRange] = useState({ start: "1950", end: "2021", left: "11" })
    const [showGenreExclude, setShowGenreExclude] = useState(false)
    const ratingProgress = useRef();
    const yearProgress = useRef();
    // const countriesRef = useRef();

    const countries = [
        { data: "en", name: "USA" },
        { data: "es", name: "Spain" },
        { data: "tr", name: "Turkey" },
        { data: "ko", name: "South Korea" },
        { data: "ja", name: "Japan" },
        { data: "ru", name: "Russia" }
    ]

    const slideRating = (e) => {
        let value = e.target.value
        ratingProgress.current.style = `border-right: ${value * 20}px solid #959cfb`
        setRating(e.target.value)
    }

    const slideYear = (value, prop) => {
        if (prop === 'start') {
            if (value > yearsRange.end) {
                return;
            }
            setYearsRange({ ...yearsRange, [prop]: value, "left": (value - 1950) + 15 })
        } else {
            if (value < yearsRange.start) {
                return;
            }
            setYearsRange({ ...yearsRange, [prop]: value })
        }

        let scale = ((((prop === "end" ? value : yearsRange.end) - (prop === "start" ? value : yearsRange.start)) / 70) * 185)
        yearProgress.current.style = `left: ${yearsRange.left}%; width: ${scale}px;`;
    }

    useEffect(() => {
        slideYear(yearsRange.start, 'start')
    }, [])
    return (
        <div className="search-relative-container">
            <div className={`search-container ${active && "active"}`} >
                <p className="search-type">{searchType.type}</p>
                <div className="genres-container">
                    <p className="filter-title">Genres</p>

                    {GENRES.map((genre, index) => {
                        return (
                            <div className="genre-container" key={index} onMouseEnter={() => setShowGenreExclude({index: index})} onMouseLeave={() => setShowGenreExclude(false)}>
                                <p  className={`genres-type ${search.genres.include.some(el => el === genre.code) ? 'include' : search.genres.exclude.some(el => el === genre.code) ? 'exclude' : ''}`}
                                    onClick={() => !(search.genres.exclude.some(el => el === genre.code)) && filterGenres([genre.code, 'include'])}
                                >{genre.name}</p>
                                {showGenreExclude && showGenreExclude.index === index && !search.genres.include.some(el => el === genre.code) &&  <p className="exclude-genre-button"  onClick={() => !(search.genres.include.some(el => el === genre.code)) && filterGenres([genre.code, 'exclude'])}>X</p>}
                            </div>
                        )
                    })}
                </div>
                <div className="rating-container">
                    <p className="filter-title">Rating</p>
                    <p className="rating-value">{rating}</p>
                    <p className="imdb">imdb</p>
                    <div className="slider-container">
                        <input className="rating-slider" type="range" min="0" max="10" step="0.5" value={rating} onChange={(e) => slideRating(e)} onMouseUp={(e) => filterByRating(e.target.value)}></input>
                    </div>
                    <div className="rating-track-filler" ref={ratingProgress} ></div>
                </div>
                <div className="year-container">
                    <p className="filter-title">Release Year</p>
                    <div className="year-track-filler" ref={yearProgress} ></div>
                    <input type="range" className="year-start" min="1950" max="2021" value={yearsRange.start} onChange={(e) => slideYear(e.target.value, 'start')} onMouseUp={(e) => filterByYear(['start', e.target.value])}></input>
                    <input type="range" className="year-end" min="1950" max="2021" value={yearsRange.end} onChange={(e) => slideYear(e.target.value, 'end')} onMouseUp={(e) => filterByYear(['end', e.target.value])}></input>
                    <span className="chosen-years">{yearsRange.start}/{yearsRange.end}</span>
                </div>
                <div className="countries-container">
                    <p className="filter-title">Countries</p>
                    <Dropdown name="countries" items={countries} action={filterByCountry} />
                </div>
            </div>
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        searchType: state.activeSearch,
        search: state.search
    }
}

export default connect(
    mapStateToProps,
    { filterGenres, filterByRating, filterByYear, filterByCountry }
)(Search);