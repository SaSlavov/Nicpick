import React, { useEffect, useRef, useState } from 'react';
import { connect } from 'react-redux';
import './Search.css'
import { filterGenres } from '../../actions'
import { ACTION, ADVENTURE, ANIMATION, COMEDY, CRIME, DRAMA, FAMILY, FANTASY, GENRES, HORROR, ROMANCE, SCIENCE_FICTION } from '../../apis/common/genres.js'


const Search = ({active, search, filterGenres}) => {
    const [rating, setRating] = useState(0);
    const [yearsRange, setYearsRange] = useState({ start: "1950", end: "2020", left: "11" })
    const ratingProgress = useRef();
    const yearProgress = useRef();
    const countriesRef = useRef();

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
                <p className="search-type">Movies</p>
                <div className="genres-container">
                    <p className="filter-title">Genres</p>

                    {GENRES.map( genre => {
                        return (
                            <p className={`genres-type ${search.genres.some(el => el === genre.code) ? 'active' : ''}`}
                                onClick={() => filterGenres(genre.code)}
                            >{genre.name}</p>
                        )
                    })}
                </div>
                <div className="rating-container">
                    <p className="filter-title">Rating</p>
                    <p className="rating-value">{rating}</p>
                    <p className="imdb">imdb</p>
                    <div className="slider-container">
                        <input className="rating-slider" type="range" min="0" max="10" step="0.5" value={rating} onChange={(e) => slideRating(e)}></input>
                    </div>
                    <div className="rating-track-filler" ref={ratingProgress} ></div>
                </div>
                <div className="year-container">
                    <p className="filter-title">Release Year</p>
                    <div className="year-track-filler" ref={yearProgress} ></div>
                    <input type="range" className="year-start" min="1950" max="2020" value={yearsRange.start} onChange={(e) => slideYear(e.target.value, 'start')}></input>
                    <input type="range" className="year-end" min="1950" max="2020" value={yearsRange.end} onChange={(e) => slideYear(e.target.value, 'end')}></input>
                    <span className="chosen-years">{yearsRange.start}/{yearsRange.end}</span>
                </div>

                <div className="countries-container">
                    <p className="filter-title">Countries</p>
                    <div className="countries-select-container">
                        <p onClick={() => countriesRef.current && countriesRef.current.classList.toggle('active')}>Filter By Country</p>
                        <div ref={countriesRef} className="countries-options">
                            <option value="usa" >USA</option>
                            <option value="uk">UK</option>
                            <option value="spain">Spain</option>
                            <option value="turkey">Turkey</option>
                            <option value="south-korea">South Korea</option>
                            <option value="japan">Japan</option>
                            <option value="russia">Russia</option>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        search: state.search
    }
}

export default connect(
    mapStateToProps,
    { filterGenres }
)(Search);